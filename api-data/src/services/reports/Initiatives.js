import sequelize from 'sequelize';
import moment from 'moment';
import Model from '../../models/initiative/Initiative';
import InitiativeStatus from '../../models/initiative/Status';
import User from '../../models/user/User';
import UserService from '../user/User';
import DnitUnit from '../../models/dnitUnit/DnitUnit';
import EducationalInstitution from '../../models/EducationalInstitution/EducationalInstitution';

const getReport = async (filters, user) => {
  const {
    dateInit = new Date('1990', '01', '01'),
    dateEnd = new Date(),
    situation: idStatus,
    idRegionalSuperintendence: idSuperintendencia,
    localUnit: idUnidadeLocal,
    educationalInstitution: idInstituicaoEnsino,
    order: sort,
  } = filters;


  const where = (filters ? {
    $and: [
      { date: { $between: [dateInit, dateEnd] } },

    ],
  } : undefined);

  if (idStatus) where.$and.push({ idStatus });

  if (idInstituicaoEnsino) where.$and.push({ idInstituicaoEnsino: sequelize.literal(`[author->instituitions->UserInstituition].[idInstituicaoEnsino] = ${idInstituicaoEnsino}`) });

  if (idUnidadeLocal) {
    const param = sequelize.literal(`[author->DnitUnit].[id] = ${idUnidadeLocal}`);
    where.$and.push(param);
  }

  if (idSuperintendencia) {
    const param = sequelize.literal(`[author->DnitUnit->RegionalSuperintendence].[id] = ${idSuperintendencia}`);
    where.$and.push(param);
  }

  if (idUnidadeLocal && !idSuperintendencia) {
    where.$or = [
      sequelize.literal(`[author->DnitUnit].[id] = ${idUnidadeLocal}`),
      sequelize.literal(`[author->DnitUnit->RegionalSuperintendence].[id] = ${idUnidadeLocal}`),
    ];
  }

  if (!(idUnidadeLocal || idSuperintendencia) && user.idDnitUnit && user.idDnitUnit !== null) {
    where.$or = [
      sequelize.literal(`[author->DnitUnit].[id] = ${user.idDnitUnit}`),
      sequelize.literal(`[author->DnitUnit->RegionalSuperintendence].[id] = ${user.idDnitUnit}`),
    ];
  }

  let order = [];
  const sorter = sort ? sort.split(',') : '';
  order = [['id', 'DESC']];
  if (sorter[1] !== '0') {
    switch (sorter[0]) {
      case 'Autor':
        order = [[sequelize.col('[author].[nome]'), sorter[1] || 'ASC']];
        break;
      case 'Situação':
        order = [[sequelize.col('[status].[nome]'), sorter[1] || 'ASC']];
        break;
      case 'Data Envio':
        order = [[sequelize.col('[Initiative].[date]'), sorter[1] || 'ASC']];
        break;
      case 'Superintendência':
        order = [[sequelize.col('[author->DnitUnit->RegionalSuperintendence].[identificacao]'), sorter[1] || 'ASC']];
        break;
      case 'Unidade Local':
        order = [[sequelize.col('[author->DnitUnit].[identificacao]'), sorter[1] || 'ASC']];
        break;
      case 'Instituição de Ensino':
        order = [[sequelize.col('[author->instituitions].[identificacao]'), sorter[1] || 'ASC']];
        break;
      default:
        break;
    }
  }
  return Model.findAll({
    attributes: [
      'title',
      'description',
      'date',
    ],
    include: [
      {
        as: 'status',
        attributes: [
          'id',
          'nome',
        ],
        model: InitiativeStatus,
        required: true,
      },
      {
        as: 'author',
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
                required: true,
              },
            ],
            model: DnitUnit,
            required: true,
          },
          {
            as: 'instituitions',
            attributes: [
              'id',
              'name',
            ],
            model: EducationalInstitution,
            required: true,
            through: { attributes: [] },
          },
        ],
        model: User,
        required: true,
      },
    ],
    where,
    order,
  })
    .then(list => list.map(el => el.get({ plain: true })))
    .then(list => list.map(el => ({
      Situação: el.status.nome,
      'Data Envio': moment(el.date).format('DD/MM/YYYY'),
      Autor: el.author.name,
      Superintendência: el.author.DnitUnit.RegionalSuperintendence.identification,
      'Unidade Local': el.author.DnitUnit.identification,
      'Instituição de Ensino': el.author.instituitions.map(el => el.name).join(', '),
    })));
};


export default {
  getReport,
};
