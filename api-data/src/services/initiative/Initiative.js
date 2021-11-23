import Sequelize, { Op } from 'sequelize';
import db from '../../config/database';
import Address from '../../models/general/Address';
import Attachment from '../../models/initiative/Attachment';
import Audio from '../../models/initiative/Audio';
import City from '../../models/general/City';
import DnitUnit from '../../models/dnitUnit/DnitUnit';
import EducationalInstitution from '../../models/EducationalInstitution/EducationalInstitution';
import Evaluation from '../../models/initiative/Evaluation';
import EvaluationHistory from '../../models/initiative/History';
import Initiative from '../../models/initiative/Initiative';
import InitiativeStageStatus from '../../models/initiative/StageStatus';
import Mime from '../../models/general/Mime';
import State from '../../models/general/State';
import Status from '../../models/initiative/Status';
import User from '../../models/user/User';
import UserAttachment from '../../models/user/Attachment';

const create = ({
  description,
  title,
}, {
  id: idUser,
  email: emailUser,
}) => db.transaction(async (transaction) => {
  const initiative = await Initiative.create({
    idUser,
    description,
    title,
  },
  {
    transaction,
  });

  await EvaluationHistory.create({
    idInitiative: initiative.id,
    text: 'Usuário enviou a iniciativa',    
    alert: false,
  },
  {
    transaction,
  });

  return initiative;
});

const findAllSaved = ({ id: idUser }) => Initiative.findAll({
  include: [
    {
      as: 'status',
      attributes: ['id', 'name'],
      model: Status,
    },
    {
      as: 'stage',
      attributes: ['id', 'name'],
      model: InitiativeStageStatus,
    },
  ],
  where: {
    idUser,
  },
  order: [['date', 'DESC'], ['id', 'DESC']],
});

const findAllToEvaluate = ({
  currentUser,
  keyword,
  limit,
  offset,
  order,
}) => {
  const where = {
    $or: [
      Sequelize.literal(
        `((select us.idUnidadeDnit from seguranca.Usuario us where us.id = ${currentUser.id}) is null)`,
      ),
      Sequelize.literal(
        `([author].[idUnidadeDnit] in (select us.idUnidadeDnit from seguranca.Usuario us where us.id = ${currentUser.id})) `,
      ),
      Sequelize.literal(
        `([author->DnitUnit->RegionalSuperintendence].[id] in (select us.idUnidadeDnit from seguranca.Usuario us where us.id = ${currentUser.id})) `,
      ),
      Sequelize.literal(
        `([author->instituitions].[idUnidadeDnit] in (select us.idUnidadeDnit from seguranca.Usuario us where us.id = ${currentUser.id})) `,
      ),
      Sequelize.literal(
        `([author->instituitions->dnitUnit->RegionalSuperintendence].[id] in (select us.idUnidadeDnit from seguranca.Usuario us where us.id = ${currentUser.id})) `,
      ),
    ],
  };

  if (keyword) {
    where.$and = {
      $or: [{
        description: {
          $like: `%${keyword}%`,
        },
      },
      {
        title: {
          $like: `%${keyword}%`,
        },
      },
      ],
    };

    where.$and.$or.push(
      Sequelize.literal(`[author].[nome] like '%${keyword}%'`),
    );
    where.$and.$or.push(
      Sequelize.literal(
        `[author->instituitions].[identificacao] like '%${keyword}%'`,
      ),
    );
    // TRECHO COMENTADO POR ESTAR GERANDO ERRO.
    // ATUALMENTE O ENDERECO DO USUARIO NAO ESTA SENDO PREENCHIDO.
    // VERIFICAR SE ALGUM DIA SERA PREENCHIDO, SE SERA OBRIGATORIO, SE TERA QUE CONTORNAR...
    // where.$and.$or.push(
    //  Sequelize.literal(`[author->address->city].[nome] like '%${keyword}%'`),
    // );
    // where.$and.$or.push(
    //  Sequelize.literal(
    //    `[author->address->city->state].[sigla] like '%${keyword}%'`,
    //  ),
    // );
    where.$and.$or.push(
      Sequelize.literal(
        `[author->instituitions].[identificacao] like '%${keyword}%'`,
      ),
    );
    where.$and.$or.push(
      Sequelize.literal(`[status].[nome] like '%${keyword}%'`),
    );
  }

  return Initiative.findAll({
    attributes: [
      'id',
      'idUser',
      'authorId',
      'comment',
      'date',
      'description',
      'title',
    ],
    include: [{
      as: 'author',
      attributes: ['id', 'name', 'idDnitUnit'],
      include: [{
        as: 'city',
        attributes: ['id', 'name'],
        include: [
          {
            as: 'state',
            attributes: ['id', 'name'],
            model: State,
          },
        ],
        model: City,
      },
      {
        as: 'DnitUnit',
        attributes: ['id', 'identification'],
        include: [{
          as: 'RegionalSuperintendence',
          attributes: ['id', 'identification'],
          model: DnitUnit,
          required: false,
        }],
        model: DnitUnit,
        required: false,
      },
      {
        as: 'instituitions',
        attributes: ['id', 'dnitUnitId', 'name'],
        include: [{
          as: 'dnitUnit',
          attributes: ['id', 'identification'],
          include: [{
            as: 'RegionalSuperintendence',
            attributes: ['id', 'identification'],
            model: DnitUnit,
            required: false,
          }],
          model: DnitUnit,
          required: false,
        }],
        model: EducationalInstitution,
        through: {
          attributes: [],
        },
      },
      ],
      model: User,
    },
    {
      as: 'evaluation',
      attributes: ['id', 'rejected', 'accepted'],
      include: [{
        as: 'evaluator',
        attributes: ['id', 'name'],
        model: User,
      }],
      model: Evaluation,
      required: false,
    },
    {
      as: 'status',
      attributes: ['id', 'name'],
      model: Status,
      where: {
        id: {
          $eq: 1,
        },
      },
    },
    {
      as: 'stage',
      attributes: ['id', 'name'],
      model: InitiativeStageStatus,
      required: false,
    },
    ],
    order,
    where,
  }).then((rows) => {
    const resultRows = rows.slice(offset, limit + offset || rows.length);
    return {
      count: rows.length,
      rows: resultRows,
    };
  });
};

const findAllToPublish = ({
  currentUser,
  keyword,
  limit,
  offset,
  order,
}) => {
  const where = {
    $or: [
      Sequelize.literal(
        `([author].[idUnidadeDnit] in (select us.idUnidadeDnit from seguranca.Usuario us where us.id = ${currentUser.id})) `,
      ),
      Sequelize.literal(
        `([author->DnitUnit->RegionalSuperintendence].[id] in (select us.idUnidadeDnit from seguranca.Usuario us where us.id = ${currentUser.id})) `,
      ),
      Sequelize.literal(
        `([author->instituitions].[idUnidadeDnit] in (select us.idUnidadeDnit from seguranca.Usuario us where us.id = ${currentUser.id})) `,
      ),
      Sequelize.literal(
        `([author->instituitions->dnitUnit->RegionalSuperintendence].[id] in (select us.idUnidadeDnit from seguranca.Usuario us where us.id = ${currentUser.id})) `,
      ), Sequelize.literal(
        `((select us.idUnidadeDnit from seguranca.Usuario us where us.id = ${currentUser.id}) is null)`,
      ),
    ],
  };

  if (keyword) {
    where.$and = {
      $or: [{
        description: {
          $like: `%${keyword}%`,
        },
      },
      {
        title: {
          $like: `%${keyword}%`,
        },
      },
      ],
    };

    where.$and.$or.push(
      Sequelize.literal(`[author].[nome] like '%${keyword}%'`),
    );
    where.$and.$or.push(
      Sequelize.literal(
        `[author->instituitions].[identificacao] like '%${keyword}%'`,
      ),
    );
    // TRECHO COMENTADO POR ESTAR GERANDO ERRO.
    // ATUALMENTE O ENDERECO DO USUARIO NAO ESTA SENDO PREENCHIDO.
    // VERIFICAR SE ALGUM DIA SERA PREENCHIDO, SE SERA OBRIGATORIO, SE TERA QUE CONTORNAR...
    // where.$and.$or.push(
    //  Sequelize.literal(`[author->address->city].[nome] like '%${keyword}%'`),
    // );
    // where.$and.$or.push(
    //  Sequelize.literal(
    //    `[author->address->city->state].[sigla] like '%${keyword}%'`,
    //  ),
    // );
    where.$and.$or.push(
      Sequelize.literal(
        `[author->instituitions].[identificacao] like '%${keyword}%'`,
      ),
    );
    where.$and.$or.push(
      Sequelize.literal(`[status].[nome] like '%${keyword}%'`),
    );
  }

  return Initiative.findAll({
    attributes: [
      'id',
      'idUser',
      'authorId',
      'comment',
      'date',
      'description',
      'title',
      'idStatus',
    ],
    include: [{
      as: 'author',
      attributes: ['id', 'name', 'idDnitUnit'],
      include: [{
        as: 'city',
        attributes: ['id', 'name'],
        include: [
          {
            as: 'state',
            attributes: ['id', 'name'],
            model: State,
          },
        ],
        model: City,
      },
      {
        as: 'DnitUnit',
        attributes: ['id', 'identification'],
        include: [{
          as: 'RegionalSuperintendence',
          attributes: ['id', 'identification'],
          model: DnitUnit,
          required: false,
        }],
        model: DnitUnit,
        required: false,
      },
      {
        as: 'instituitions',
        attributes: ['id', 'dnitUnitId', 'name'],
        include: [{
          as: 'dnitUnit',
          attributes: ['id', 'identification'],
          include: [{
            as: 'RegionalSuperintendence',
            attributes: ['id', 'identification'],
            model: DnitUnit,
            required: false,
          }],
          model: DnitUnit,
          required: false,
        }],
        model: EducationalInstitution,
        through: {
          attributes: [],
        },
      },
      ],
      model: User,
    },
    {
      as: 'evaluation',
      attributes: ['id', 'rejected', 'accepted'],
      include: [{
        as: 'evaluator',
        attributes: ['id', 'name'],
        include: [{
          as: 'attachment',
          attributes: ['id'],
          model: UserAttachment,
          where: {
            idAttachmentType: {
              $eq: 1,
            },
          },
        }],
        model: User,
      }],
      model: Evaluation,
      required: false,
    },
    {
      as: 'status',
      attributes: ['id', 'name'],
      model: Status,
      where: {
        id: {
          $eq: 3,
        },
      },
      required: true,
    },
    {
      as: 'stage',
      attributes: ['id', 'name'],
      model: InitiativeStageStatus,
      required: true,
    },
    ],
    order,
    where,
  }).then((rows) => {
    const resultRows = rows.slice(offset, limit + offset || rows.length);
    return {
      count: rows.length,
      rows: resultRows,
    };
  });
};

const findAllToVisualization = ({
  currentUser,
  keyword,
  limit,
  offset,
  order,
}) => {
  const where = {
    $or: [
      Sequelize.literal(
        `([author].[idUnidadeDnit] in (select us.idUnidadeDnit from seguranca.Usuario us where us.id = ${currentUser.id})) `,
      ),
      Sequelize.literal(
        `([author->DnitUnit->RegionalSuperintendence].[id] in (select us.idUnidadeDnit from seguranca.Usuario us where us.id = ${currentUser.id})) `,
      ),
      Sequelize.literal(
        `([author->instituitions].[idUnidadeDnit] in (select us.idUnidadeDnit from seguranca.Usuario us where us.id = ${currentUser.id})) `,
      ),
      Sequelize.literal(
        `([author->instituitions->dnitUnit->RegionalSuperintendence].[id] in (select us.idUnidadeDnit from seguranca.Usuario us where us.id = ${currentUser.id})) `,
      ), Sequelize.literal(
        `((select us.idUnidadeDnit from seguranca.Usuario us where us.id = ${currentUser.id}) is null)`,
      ),
    ],
  };

  if (keyword) {
    where.$and = {
      $or: [{
        description: {
          $like: `%${keyword}%`,
        },
      },
      {
        title: {
          $like: `%${keyword}%`,
        },
      },
      ],
    };

    where.$and.$or.push(
      Sequelize.literal(`[author].[nome] like '%${keyword}%'`),
    );
    where.$and.$or.push(
      Sequelize.literal(
        `[author->instituitions].[identificacao] like '%${keyword}%'`,
      ),
    );
    // TRECHO COMENTADO POR ESTAR GERANDO ERRO.
    // ATUALMENTE O ENDERECO DO USUARIO NAO ESTA SENDO PREENCHIDO.
    // VERIFICAR SE ALGUM DIA SERA PREENCHIDO, SE SERA OBRIGATORIO, SE TERA QUE CONTORNAR...
    // where.$and.$or.push(
    //  Sequelize.literal(`[author->address->city].[nome] like '%${keyword}%'`),
    // );
    // where.$and.$or.push(
    //  Sequelize.literal(
    //    `[author->address->city->state].[sigla] like '%${keyword}%'`,
    //  ),
    // );
    where.$and.$or.push(
      Sequelize.literal(
        `[author->instituitions].[identificacao] like '%${keyword}%'`,
      ),
    );
    where.$and.$or.push(
      Sequelize.literal(`[status].[nome] like '%${keyword}%'`),
    );
  }

  return Initiative.findAll({
    attributes: [
      'id',
      'idUser',
      'authorId',
      'comment',
      'date',
      'description',
      'title',
      'idStatus',
    ],
    include: [{
      as: 'author',
      attributes: ['id', 'name', 'idDnitUnit'],
      include: [{
        as: 'city',
        attributes: ['id', 'name'],
        include: [
          {
            as: 'state',
            attributes: ['id', 'name'],
            model: State,
          },
        ],
        model: City,
      },
      {
        as: 'DnitUnit',
        attributes: ['id', 'identification'],
        include: [{
          as: 'RegionalSuperintendence',
          attributes: ['id', 'identification'],
          model: DnitUnit,
          required: false,
        }],
        model: DnitUnit,
        required: false,
      },
      {
        as: 'instituitions',
        attributes: ['id', 'dnitUnitId', 'name'],
        include: [{
          as: 'dnitUnit',
          attributes: ['id', 'identification'],
          include: [{
            as: 'RegionalSuperintendence',
            attributes: ['id', 'identification'],
            model: DnitUnit,
            required: false,
          }],
          model: DnitUnit,
          required: false,
        }],
        model: EducationalInstitution,
        through: {
          attributes: [],
        },
      },
      ],
      model: User,
    },
    {
      as: 'evaluation',
      attributes: ['id', 'rejected', 'accepted'],
      include: [{
        as: 'evaluator',
        attributes: ['id', 'name'],
        include: [{
          as: 'attachment',
          attributes: ['id'],
          model: UserAttachment,
          where: {
            idAttachmentType: {
              $eq: 1,
            },
          },
        }],
        model: User,
      }],
      model: Evaluation,
      required: false,
    },
    {
      as: 'status',
      attributes: ['id', 'name'],
      model: Status,
      required: true,
    },
    {
      as: 'stage',
      attributes: ['id', 'name'],
      model: InitiativeStageStatus,
      required: true,
    },
    ],
    order,
    where,
  }).then((rows) => {
    const resultRows = rows.slice(offset, limit + offset || rows.length);
    return {
      count: rows.length,
      rows: resultRows,
    };
  });
};

const findOneByUser = (id, {
  id: idUser,
}) => Initiative.findOne({
  include: [
    {
      as: 'audio',
      attributes: ['idInitiative'],
      model: Audio,
    },
    {
      as: 'attachments',
      attributes: ['id', 'name', 'idInitiative'],
      include: [{
        as: 'mime',
        attributes: ['media', 'suffix'],
        model: Mime,
      }],
      model: Attachment,
    },
  ],
  where: {
    id,
    idUser,
  },
});

const findByPk = id => Initiative.findByPk(id, {
  include: [{
    as: 'author',
    attributes: ['id', 'name', 'idDnitUnit'],
    include: [{
      as: 'attachment',
      attributes: ['id'],
      model: UserAttachment,
      required: false,
      where: {
        idAttachmentType: {
          $eq: 1,
        },
      },
    },
    {
      as: 'DnitUnit',
      attributes: ['id', 'identification'],
      include: [{
        as: 'RegionalSuperintendence',
        attributes: ['id', 'identification'],
        model: DnitUnit,
        required: false,
      }],
      model: DnitUnit,
      required: false,
    },
    {
      as: 'instituitions',
      attributes: ['id', 'dnitUnitId', 'name'],
      model: EducationalInstitution,
      through: {
        attributes: [],
      },
    },
    ],
    model: User,
  },
  {
    as: 'status',
    attributes: ['id', 'name'],
    model: Status,
    required: false,
  },
  {
    as: 'stage',
    attributes: ['id', 'name'],
    model: InitiativeStageStatus,
    required: false,
  },
  {
    as: 'evaluation_history',
    attributes: ['id', 'text', 'date'],
    model: EvaluationHistory,
    required: false,
  },
  {
    as: 'attachments',
    attributes: ['id', 'name', 'idInitiative'],
    include: [{
      as: 'mime',
      attributes: ['media', 'suffix'],
      model: Mime,
    }],
    model: Attachment,
  },
  {
    as: 'audio',
    attributes: ['idInitiative', 'idMime'],
    include: [{
      as: 'mime',
      attributes: ['media', 'suffix'],
      model: Mime,
    }],
    model: Audio,
  },
  {
    as: 'evaluation',
    attributes: ['id', 'rejected', 'accepted'],
    include: [{
      as: 'evaluator',
      attributes: ['id', 'name'],
      include: [{
        as: 'attachment',
        attributes: ['id'],
        model: UserAttachment,
        where: {
          idAttachmentType: {
            $eq: 1,
          },
        },
      }],
      model: User,
    },
    ],
    model: Evaluation,
    required: false,
  },
  ],
});

const findAllByStatus = ({ status, id }) => Initiative.findAll({
  where: {
    $or: [
      {
        idStatus: {
          $in: status,
        },
      },
      { id },
    ],
  },
});

export default {
  create,
  findAllSaved,
  findAllToEvaluate,
  findAllToPublish,
  findByPk,
  findOneByUser,
  findAllByStatus,
  findAllToVisualization,
};
