import sequelize, { Op } from 'sequelize';
import moment from 'moment';
import Model from '../../models/message/Message';
import MessageType from '../../models/message/Type';
import MessageStatus from '../../models/message/Status';
import User from '../../models/user/User';
import UserService from '../user/User';
import DnitUnit from '../../models/dnitUnit/DnitUnit';
import {SUPORTE_TECNICO, SUPORTE_PEDAGOGICO, SUGESTAO} from '../../constants/MessageTypes'

const getReport = async (filters, user) => {
  const currentUser = await UserService.findById(user.id);

  const {
    idRegionalSuperintendence,
    localUnit,
    type,
    dateInit,
    dateEnd,
    order: sort,
    situation,
  } = filters;

  const where = (filters ? { $and: [] } : undefined);

  where.$and.push({ idMessageType: { [Op.not]: 6 } });

  if (dateInit && dateEnd) {
    where.$and.push({ dateTimeLastResponse: { $between: [dateInit, dateEnd] } });
  }

  if (type) where.$and.push({ idMessageType: type });

  if (situation) where.$and.push({ idStatus: situation });

  if (localUnit) {
    where.$and.push({
      [Op.or]: [
        sequelize.literal(`[recipient->DnitUnit].[id] = ${localUnit}`),
        sequelize.literal(`[from->DnitUnit].[id] = ${localUnit}`),
      ],
    });
  }

  if (idRegionalSuperintendence) {
    where.$and.push({
      [Op.or]: [
        sequelize.literal(`[recipient->DnitUnit->RegionalSuperintendence].[id] = ${idRegionalSuperintendence}`),
        sequelize.literal(`[from->DnitUnit->RegionalSuperintendence].[id] = ${idRegionalSuperintendence}`),
      ],
    });
  }

  if (!(localUnit || idRegionalSuperintendence)
    && currentUser.idDnitUnit
    && currentUser.idDnitUnit !== null) {
    where.$or = [
      sequelize.literal(`[recipient->DnitUnit].[id] = ${currentUser.idDnitUnit}`),
      sequelize.literal(`[recipient->DnitUnit->RegionalSuperintendence].[id] = ${currentUser.idDnitUnit}`),
      sequelize.literal(`[from->DnitUnit].[id] = ${currentUser.idDnitUnit}`),
      sequelize.literal(`[from->DnitUnit->RegionalSuperintendence].[id] = ${currentUser.idDnitUnit}`),
      sequelize.literal('[recipient->DnitUnit].[id] is null'),
      sequelize.literal('[recipient->DnitUnit->RegionalSuperintendence].[id] is null'),
      sequelize.literal('[from->DnitUnit].[id] is null'),
      sequelize.literal('[from->DnitUnit->RegionalSuperintendence].[id] is null'),
    ];
  }

  const order = [];

  if (sort) {
    const fields = sort.split(',');
    if (fields[1] === '0') order.push(['dateTimeLastResponse', 'DESC']);
    else {
      switch (fields[0]) {
        case 'Assunto':
          order.push(['subject', fields[1]]);
          break;
        case 'Tipo':
          order.push([sequelize.literal('[type.name]'), fields[1]]);
          break;
        case 'Data':
          order.push(['dateTimeLastResponse', fields[1]]);
          break;
        case 'Superintendência Regional':
          order.push([sequelize.literal('[recipient.DnitUnit.RegionalSuperintendence.identification]'), fields[1]]);
          break;
        case 'Unidade Local':
          order.push([sequelize.literal('[recipient.DnitUnit.identification]'), fields[1]]);
          break;
        case 'Remetente':
          order.push([sequelize.literal('[from.name]'), fields[1]]);
          break;
        default: order.push(['id', 'DESC']);
      }
    }
  } else {
    order.push(['dateTimeLastResponse', 'DESC']);
  }

  return Model.findAll({
    attributes: [
      'id',
      'subject',
      'dateTimeLastResponse',
      'idParentMessage',
    ].concat([[sequelize.literal(` (SELECT top 1 CASE
      WHEN Datediff(hour, mr_origem.dataHora, mr_destino.dataHora) >= 24
      THEN Concat(CONVERT(VARCHAR, Datediff(day, mr_origem.dataHora, mr_destino.dataHora)), ' Dia(s )') 
      WHEN Datediff(second, mr_origem.dataHora, mr_destino.dataHora) <= 60
      THEN Concat(CONVERT(VARCHAR, Datediff(second, mr_origem.dataHora, mr_destino.dataHora)), ' Segundo(s )') 
      WHEN Datediff(minute, mr_origem.dataHora, mr_destino.dataHora) <= 60 
      THEN Concat(CONVERT(VARCHAR, Datediff(minute, mr_origem.dataHora, mr_destino.dataHora)), ' Minutos(s)') 
      ELSE Concat(CONVERT(VARCHAR, Datediff(hour, mr_origem.dataHora, mr_destino.dataHora)), ' Hora (s)') 
      END 
    FROM  [dnit].[MensagemResposta] mr_destino, 
          [dnit].[MensagemResposta] mr_origem
    WHERE mr_destino.idMensagem = [Message].id
    AND mr_origem.idMensagem = [Message].id
    AND mr_destino.idUsuario != [Message].idUsuarioOrigem
    AND mr_origem.idUsuario = [Message].idUsuarioOrigem
  order by mr_destino.dataHora) `), 'responseTime']]),
    include: [
      {
        as: 'status',
        attributes: [
          'id',
          'name',
        ],
        model: MessageStatus,
      },
      {
        as: 'type',
        attributes: [
          'id',
          'name',
        ],
        model: MessageType,
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
            as: 'DnitUnit',
            attributes: [
              'id',
              'identification',
              'idUFSuperintendence',
            ],
            include: [
              {
                as: 'RegionalSuperintendence',
                attributes: [
                  'id',
                  'idUFSuperintendence',
                  'identification',
                ],
                model: DnitUnit,
              },
            ],
            model: DnitUnit,
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
            as: 'DnitUnit',
            attributes: [
              'id',
              'identification',
              'idUFSuperintendence',
            ],
            include: [
              {
                as: 'RegionalSuperintendence',
                attributes: [
                  'id',
                  'idUFSuperintendence',
                  'identification',
                ],
                model: DnitUnit,
              },
            ],
            model: DnitUnit,
          },
        ],
        model: User,
      },
    ],
    where,
    order,
  })
    .then(list => list.map(el => el.get({ plain: true })))
    .then(list => list.flatMap(el => {
      if((el.type.id === SUPORTE_TECNICO.id || el.type.id === SUPORTE_PEDAGOGICO.id || el.type.id === SUGESTAO.id) && el.idParentMessage !== null) {
        return [];
      }

      return {
        Tipo: el.type.name,
        Data: moment(el.dateTimeLastResponse).format('DD/MM/YYYY'),
        Assunto: el.subject,
        'Superintendência Regional': el.from.DnitUnit && el.from.DnitUnit.RegionalSuperintendence ? el.from.DnitUnit.RegionalSuperintendence.identification : '',
        'Unidade Local': el.from.DnitUnit ? el.from.DnitUnit.identification : '',
        Remetente: el.from.name,
        Situação: el.status.name,
        'Tempo de Resposta': el.responseTime ? el.responseTime : '',
      };
  }));
};

export default {
  getReport,
};
