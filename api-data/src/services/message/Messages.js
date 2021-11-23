import sequelize, { col, fn, Op } from 'sequelize';
import DnitUnit from '../../models/dnitUnit/DnitUnit';
import EducationalInstitution from '../../models/EducationalInstitution/EducationalInstitution';
import Message from '../../models/message/Message';
import Reply from '../../models/message/Reply';
import Roles from '../../models/user/Roles';
import Type from '../../models/message/Type';
import Status from '../../models/message/Status';
import User from '../../models/user/User';
import UserAttachment from '../../models/user/Attachment';
import UserAttachmentType from '../../models/user/AttachmentType';
import Attachment from '../../models/message/Attachment';
import Mime from '../../models/general/Mime';

const findByPk = ({ id: userId }, id) => Message.findOne({
  attributes: [
    'id',
    'dateTimeLastResponse',
    'subject',
    'idParentMessage',
    ],
    include: [
    {
      as: 'messageAttachments',
      attributes: [
          'id',
          'name',
          'file',
          'idMensagem',
            ],
      include: [{
          as: 'mime',
          attributes: ['media', 'suffix'],
          model: Mime,
      }],
      model: Attachment,
      on: sequelize.literal('messageAttachments.IdMensagem = [Message].idMensagemAgrupada OR messageAttachments.IdMensagem = [Message].id'),
      required: false,
    },
    {
    as: 'reply',
    attributes: [
      'id',
      'dateTime',
      'text',
      ],
    include: [{
      as: 'replyFrom',
      attributes: [
        'id',
        'name',
        'email',
      ],
      include: [
        {
          as: 'attachment',
          attributes: [
            'id',
          ],
          include: [
            {
              as: 'attachmentType',
              attributes: [
                'id',
                'name',
              ],
              model: UserAttachmentType,
            },
          ],
          model: UserAttachment,
        },
      ],
      model: User,
    }],
    model: Reply,
    on: sequelize.literal(`[Message].[id] = [reply].[idMensagem]
      OR (
		[reply].[idMensagem] IN (
          SELECT [Message2].[id] FROM [dnit].[Mensagem] AS [Message2]
          WHERE COALESCE([Message].[idMensagemAgrupada], [Message].[id]) IN ([Message2].[id], [Message2].[idMensagemAgrupada]) 
        )
		AND [reply].[idUsuario] <> [Message].[idUsuarioOrigem]
	  )`,
    ),
    order: [
      ['dateTime', 'ASC'],
    ],
  },
  {
    as: 'type',
    attributes: [
      'id',
      'name',
    ],
    model: Type,
  },
  {
    as: 'from',
    attributes: [
      'id',
      'name',
      'email',
    ],
    include: [
      {
        as: 'attachment',
        attributes: [
          'id',
        ],
        include: [
          {
            as: 'attachmentType',
            attributes: [
              'id',
              'name',
            ],
            model: UserAttachmentType,
          },
        ],
        model: UserAttachment,
      },
    ],
    model: User,
  },
  {
    as: 'recipient',
    attributes: [
      'id',
      'name',
      'email',
    ],
    include: [
      {
        as: 'attachment',
        attributes: [
          'id',
        ],
        include: [
          {
            as: 'attachmentType',
            attributes: [
              'id',
              'name',
            ],
            model: UserAttachmentType,
          },
        ],
        model: UserAttachment,
      },
    ],
    model: User,
  }],
  where: {
    id,
    [Op.or]: [
      {
        idUserFrom: userId,
      },
      {
        idUserRecipient: userId,
      },
    ],
  },
});

const markAsRead = (idMessage, { id }) => {
  Reply.update(
    { read: true },
    {
      where: {
        idMessage,
        $not: [{ idUser: { $eq: id } }],
        read: false,
      },
    },
  );

  return Message.update(
    { idStatus: 2 },
    {
      where: {
        id: idMessage,
        idStatus: 1,
      },
    },
  );
};

const sendReply = (idUser, text, replyTo) => {
  const firstMessage = replyTo[0];
  return Reply.bulkCreate(
    replyTo.map(({ id: idMessage }) => ({
      idMessage,
      idUser,
      text,
    })),
  ).then((replies) => {
    const hasReply = replies.some((reply) => {
      if (reply.idUser !== firstMessage.idUserFrom) {
        return true;
      }

      return false;
    });

    if (hasReply) {
      Message.update(
        { idStatus: 3 },
        {
          where: {
            id: firstMessage.id,
          },
        },
      );
    }
  }).then(() => findByPk({ id: idUser }, firstMessage.id));
};

const createFindMessage = ({
  id: userId,
}, {
  idMessage: id,
  idMessageType,
  recipients,
  subject,
  text,
}) => {
  if (id) {
    return Message.findAll({
      where: {
        id,
      },
    })
      .then(mensagens => sendReply(userId, text, mensagens));
  }

  return Message.create(
    {
      idMessageType,
      idUserFrom: userId,
      idUserRecipient: recipients[0],
      subject,
    },
    { returning: true },
  )
    .then(result => result.toJSON())
    .then((result) => {
      sendReply(userId, text, [result]);
      return result;
    })
    .then((msg) => {
      recipients.splice(0, 1);

      if (recipients.length <= 0) return [msg];

      return Message.bulkCreate(
        recipients.map(idUserRecipient => ({
          idMessageType,
          idParentMessage: msg.id,
          idUserFrom: userId,
          idUserRecipient,
          subject,
        })),
        { returning: true },
      )
        .then(mensagens => sendReply(userId, text, mensagens));
    });
};

const findAllInbox = ({ id: idUser }) => Message.findAll({
  attributes: [
    'id',
    'dateTimeLastResponse',
    'subject',
    [fn('count', col('[reply].lido')), 'unread'],
  ],
  include: [{
    as: 'reply',
    attributes: [],
    model: Reply,
    required: false,
    where: {
      read: false,
      idUser: {
        [Op.ne]: idUser,
      },
    },
  },
  {
    as: 'type',
    attributes: [
      'id',
      'name',
    ],
    model: Type,
  },
  {
    as: 'status',
    attributes: [
      'id',
      'name',
    ],
    model: Status,
  },
  {
    as: 'from',
    attributes: [
      'id',
      'name',
      'email',
    ],
    include: [
      {
        as: 'attachment',
        attributes: [
          'id',
        ],
        include: [
          {
            as: 'attachmentType',
            attributes: [
              'id',
              'name',
            ],
            model: UserAttachmentType,
          },
        ],
        model: UserAttachment,
      },
    ],
    model: User,
  },
  {
    as: 'recipient',
    attributes: [
      'id',
      'name',
      'email',
    ],
    include: [
      {
        as: 'attachment',
        attributes: [
          'id',
        ],
        include: [
          {
            as: 'attachmentType',
            attributes: [
              'id',
              'name',
            ],
            model: UserAttachmentType,
          },
        ],
        model: UserAttachment,
      },
    ],
    model: User,
  }],
  where: {
    idUserRecipient: idUser,
    destinationDeleted: false,
  },
  group: [
    '[Message].[id]',
    '[Message].[assunto]',
    '[type].[id]',
    '[type].[nome]',
    '[status].[id]',
    '[status].[nome]',
    '[from].[id]',
    '[from->attachment].[id]',
    '[from->attachment->attachmentType].[id]',
    '[from->attachment->attachmentType].[nome]',
    '[from].[nome]',
    '[from].[email]',
    '[recipient].[id]',
    '[recipient].[nome]',
    '[recipient].[email]',
    '[recipient->attachment].[id]',
    '[recipient->attachment->attachmentType].[id]',
    '[recipient->attachment->attachmentType].[nome]',
    '[Message].[dataHoraUltimaResposta]',
  ],
  order: [
    [col('unread'), 'DESC'],
    ['dateTimeLastResponse', 'DESC'],
  ],
});

const findAllMessagesTypes = ({
  role: {
    id,
  },
}) => Type.findAll({
  attributes: [
    'id',
    'name',
  ],
  include: {
    model: Roles,
    where: {
      id,
    },
  },
  includeIgnoreAttributes: false,
});

const findAllMessagesStatus = () => Status.findAll({
  attributes: [
    'id',
    'name',
  ],
  includeIgnoreAttributes: false,
});

const findAllRecipients = ({ id, filters, currentUser }) => {
  const {
    idSuperintendences,
    idDnitUnits,
    Institutions,
    idRoles,
  } = filters;

  let whereLiteralIdSuperintendences = "";
  let whereLiteralIdDnitUnits = "";
  let whereLiteralInstitutions = "";
  let whereLiteral = ` [User].id != ${id} `;


  switch (currentUser.role.id) {
    case 5:
      whereLiteral = whereLiteral.concat(` AND (([User].idPerfil in (5, 3, 4, 6, 7) and [User].idUnidadeDnit = ${currentUser.idDnitUnit})
                OR ([User].idPerfil = 11 and [DnitUnit].idSuperintendenciaRegional = (select [DnitUnit].idSuperintendenciaRegional as SR
                                                                            from [seguranca].[Usuario] as [User]
                                                                            INNER JOIN [dnit].[unidadednit] AS [DnitUnit] ON [User].[idunidadednit] = [DnitUnit].[id]
                                                                            where [User].id = ${id}))) `);
      break;
    case 6:
      whereLiteral = whereLiteral.concat(` AND (([User].idPerfil in (5, 3, 4, 6, 7) and [User].idUnidadeDnit =  ${currentUser.idDnitUnit})
                OR ([User].idPerfil in (11, 12) and [DnitUnit].idSuperintendenciaRegional = (select [DnitUnit].idSuperintendenciaRegional as SR
                                                                            from [seguranca].[Usuario] as [User]
                                                                            INNER JOIN [dnit].[unidadednit] AS [DnitUnit] ON [User].[idunidadednit] = [DnitUnit].[id]
                                                                            where [User].id = ${id})))`);
      break;
    case 7:
      whereLiteral = whereLiteral.concat(` AND (([User].idPerfil in (5, 3, 4, 6, 7) and [User].idUnidadeDnit = ${currentUser.idDnitUnit})
                OR ([User].idPerfil in (11, 12, 13) and [DnitUnit].idSuperintendenciaRegional = (select [DnitUnit].idSuperintendenciaRegional as SR
                                                                            from [seguranca].[Usuario] as [User]
                                                                            INNER JOIN [dnit].[unidadednit] AS [DnitUnit] ON [User].[idunidadednit] = [DnitUnit].[id]
                                                                            where [User].id = ${id}))) `);
      break;
    case 11:
      whereLiteral = whereLiteral.concat(` AND (([User].idPerfil = ${currentUser.idDnitUnit})
                OR ([User].idPerfil in (7, 3, 4, 5, 6, 12, 13) and [DnitUnit].idSuperintendenciaRegional = (select [DnitUnit].idSuperintendenciaRegional as SR
                                                                            from [seguranca].[Usuario] as [User]
                                                                            INNER JOIN [dnit].[unidadednit] AS [DnitUnit] ON [User].[idunidadednit] = [DnitUnit].[id]
                                                                            where [User].id = ${id}))) `);
      break;
    case 12:
      whereLiteral = whereLiteral.concat(` AND (([User].idPerfil in (11, 12))
                OR ([User].idPerfil in (7, 3, 4, 5, 6, 12, 13) and [DnitUnit].idSuperintendenciaRegional = (select [DnitUnit].idSuperintendenciaRegional as SR
                                                                            from [seguranca].[Usuario] as [User]
                                                                            INNER JOIN [dnit].[unidadednit] AS [DnitUnit] ON [User].[idunidadednit] = [DnitUnit].[id]
                                                                            where [User].id = ${id}))) `);
      break;
    case 13:
      whereLiteral = whereLiteral.concat(` AND (([User].idPerfil in (11, 12, 13))
                OR ([User].idPerfil in (7, 3, 4, 5, 6, 12, 13) and [DnitUnit].idSuperintendenciaRegional = (select [DnitUnit].idSuperintendenciaRegional as SR
                                                                            from [seguranca].[Usuario] as [User]
                                                                            INNER JOIN [dnit].[unidadednit] AS [DnitUnit] ON [User].[idunidadednit] = [DnitUnit].[id]
                                                                            where [User].id = ${id}))) `);
      break;
    default:
  }

  if (idRoles.includes(-1)) {
    whereLiteral = whereLiteral.concat(` AND [role].[id] != -1 `);
  }

  if (idSuperintendences.includes(-1)) {
    whereLiteralIdSuperintendences = `[DnitUnit->RegionalSuperintendence].[id] != -1 `;
  }

  if (idDnitUnits.includes(-1)) {
    whereLiteralIdDnitUnits = `[DnitUnit].[id] != -1`;
  }

  if (Institutions.includes(-1)) {
    whereLiteralInstitutions = `[instituitions].[id] != -1 and [instituitions].[participaConexaoDnit] = 1`;
  }

  if (idRoles && idRoles.length > 0 && !idRoles.includes(-1)) {
    whereLiteral = whereLiteral.concat(` AND [role].[id] in (${idRoles})`);
  }

  let condicaoSuperIntendencia = null;
  if (idSuperintendences && idSuperintendences.length) {
    if (idSuperintendences.includes(-1)) {
      condicaoSuperIntendencia = sequelize.literal(whereLiteralIdSuperintendences);
    } else {
      condicaoSuperIntendencia = {
        id: {
          $in: idSuperintendences,
        },
      }
    }
  }

  let condicaoInstituicao = null;
  if (Institutions && Institutions.length) {
    if (Institutions.includes(-1)) {
      condicaoInstituicao = sequelize.literal(whereLiteralInstitutions);
    } else {
      condicaoSuperIntendencia = {
        id: {
          $in: Institutions,
        },
      }
    }
  }  

  return User.findAll({
    attributes: [
      'id',
      'name',
      'email',
    ],
    include: [
      {
        as: 'attachment',
        attributes: [
          'id',
        ],
        include: [
          {
            as: 'attachmentType',
            attributes: [
              'id',
              'name',
            ],
            model: UserAttachmentType,
          },
        ],
        model: UserAttachment,
      },
      {
        as: 'DnitUnit',
        attributes: [],
        include: [
          {
            as: 'RegionalSuperintendence',
            attributes: [],
            model: DnitUnit,
            required: idSuperintendences && idSuperintendences.length,
            where: condicaoSuperIntendencia
          },
        ],
        model: DnitUnit,
        required: (idDnitUnits && idDnitUnits.length > 0),
        where: idDnitUnits && idDnitUnits.includes(-1) ? sequelize.literal(whereLiteralIdDnitUnits) : null
      },
      {
        as: 'role',
        attributes: [],
        model: Roles,
        required: idRoles && idRoles.length,
        // where: idRoles && idRoles.length && idRoles.includes(-1) ? whereLiteralidRoles : null
      },
      {
        as: 'instituitions',
        attributes: [],
        model: EducationalInstitution,
        required: Institutions && Institutions.length,
        through: { attributes: [] },
        where: condicaoInstituicao
      },
    ],
    where: sequelize.literal(whereLiteral),
  });
};

const findAllSend = ({ id: idUserFrom }) => Message.findAll({
  attributes: [
    'id',
    'subject',
    'idParentMessage',
    'dateTimeLastResponse',
  ],
  include: [{
    as: 'reply',
    attributes: [
      'id',
      'dateTime',
      'text',
    ],
    model: Reply,
    order: [
      ['dateTime', 'DESC'],
    ],
  },
  {
    as: 'replyFromUser',
    attributes: [
      'id',
      'dateTime',
      'text',
    ],
    model: Reply,
    order: [
      ['dateTime', 'DESC'],
    ],
    on: {
      col1: sequelize.where(sequelize.col('replyFromUser.idMensagem'), '=', sequelize.col('Message.id')),
      col2: sequelize.where(sequelize.col('replyFromUser.idUsuario'), '=', idUserFrom),
    },
    required: false,
  },
  {
    as: 'type',
    attributes: [
      'id',
      'name',
    ],
    model: Type,
  },
  {
    as: 'status',
    attributes: [
      'id',
      'name',
    ],
    model: Status,
  },
  {
    as: 'from',
    attributes: [
      'id',
      'name',
      'email',
    ],
    include: [
      {
        as: 'attachment',
        attributes: [
          'id',
        ],
        include: [
          {
            as: 'attachmentType',
            attributes: [
              'id',
              'name',
            ],
            model: UserAttachmentType,
          },
        ],
        model: UserAttachment,
      },
    ],
    model: User,
  },
  {
    as: 'recipient',
    attributes: [
      'id',
      'name',
      'email',
    ],
    include: [
      {
        as: 'attachment',
        attributes: [
          'id',
        ],
        include: [
          {
            as: 'attachmentType',
            attributes: [
              'id',
              'name',
            ],
            model: UserAttachmentType,
          },
        ],
        model: UserAttachment,
      },
    ],
    model: User,
  }],
  where: sequelize.literal(`([Message].[idUsuarioOrigem] = ${idUserFrom} OR ([Message].[idUsuarioOrigem] != ${idUserFrom} AND replyFromUser.id is not null)) AND [Message].[removidoOrigem] = 0`),
  order: [
    ['dateTimeLastResponse', 'DESC'],
  ],
});

const deleteMessage = (idMessage, user) => {
  return findByPk(user, idMessage)
    .then(message => {
      let updateBody = {destinationDeleted: true};

      if(user.id === message.from.id) {
        updateBody = {originDeleted : true};
      }

      return Message.update(
        updateBody,
        {
          where: {
            id: idMessage,
          },
        },
      );
    });
};

export default {
  createFindMessage,
  findAllInbox,
  findAllMessagesTypes,
  findAllMessagesStatus,
  findAllRecipients,
  findAllSend,
  findByPk,
  markAsRead,
  sendReply,
  deleteMessage,
};
