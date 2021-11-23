import sequelize from 'sequelize';
import Discipline from '../../models/general/Discipline';
import KnowledgeObject from '../../models/general/KnowledgeObject';
import FieldKnowledge from '../../models/general/FieldKnowledge';
import SchoolYear from '../../models/general/SchoolYear';

const KnowledgeObjectAttributes = [
  'id',
  'idDiscipline',
  'idSchoolYear',
  'description',
];


const create = ({
  description,
  idDiscipline,
  idSchoolYear,
}) => KnowledgeObject.create({
  description,
  idDiscipline,
  idSchoolYear,
});

const findAll = () => KnowledgeObject.findAll({
  attributes: KnowledgeObjectAttributes,
});

const findById = id => KnowledgeObject.findByPk(id, {
  attributes: KnowledgeObjectAttributes,
  include: [
    {
      as: 'discipline',
      attributes: [
        'id',
        'name',
      ],
      model: Discipline,
      include: [
        {
          as: 'knowledgeArea',
          attributes: [
            'id',
            'description',
          ],
          model: FieldKnowledge,
        },
      ],
    },
  ],
  where: {
    id,
  },
});

const remove = id => KnowledgeObject.destroy({
  where: {
    id,
  },
});

const search = ({
  idDiscipline,
  idSchoolYear,
  keyword,
  offset = 0,
  order: sort,
  limit = 0,
}) => {
  const where = {};

  if (idSchoolYear || idDiscipline) {
    where.$and = [];
    if (idDiscipline) where.$and.push({ idDiscipline: { $in: idDiscipline } });
    if (idSchoolYear) where.$and.push({ idSchoolYear: { $in: idSchoolYear } });
  }
  if (keyword) {
    where.$or = [
      { description: { $like: `%${keyword}%` } },
      sequelize.literal(` [discipline].[nome] like '%${keyword}%'`),
      sequelize.literal(` [discipline->knowledgeArea].[nome] like '%${keyword}%'`),
      sequelize.literal(` cast([KnowledgeObject].[idAnoEscolar] as varchar(2)) = '${keyword}'`),

    ];
  }

  const order = [];
  const fields = (sort || '').split(',');

  if (fields[1] === '0') order.push(['description', 'asc']);
  else {
    switch (fields[0]) {
      case 'Year': if (fields[1] !== '0') order.push(['idSchoolYear', fields[1]]);
        break;
      case 'Name': if (fields[1] !== '0') order.push(['description', fields[1]]);
        break;
      case 'KnowledgeField': if (fields[1] !== '0') order.push([sequelize.literal('[discipline.knowledgeArea.description]'), fields[1]]);
        break;
      case 'Disciplines': if (fields[1] !== '0') order.push([sequelize.literal('[discipline.name]'), fields[1]]);
        break;
      default: order.push(['description', 'asc']);
        break;
    }
  }

  return KnowledgeObject.findAll({
    attributes: KnowledgeObjectAttributes,
    include: [
      {
        as: 'discipline',
        attributes: [
          'id',
          'name',
        ],
        include: [
          {
            as: 'knowledgeArea',
            attributes: [
              'id',
              'description',
            ],
            model: FieldKnowledge,
            required: true,
          },
        ],
        model: Discipline,
        required: true,
      },
      {
        as: 'schoolYear',
        attributes: ['ordinal'],
        model: SchoolYear,
        through: { attributes: [] },
      },
    ],
    order,
    where,
  })
    .then(resultSet => ({
      count: resultSet.length,
      rows: resultSet.slice(offset, (limit > 0 ? offset + limit : resultSet.length)),
    }));
};

const updateKnowledgeObject = ({
  id,
  idDiscipline,
  idSchoolYear,
  description,
}) => KnowledgeObject.update({
  idDiscipline,
  idSchoolYear,
  description,
},
{
  where: {
    id,
  },
});

export default {
  create,
  findAll,
  findById,
  remove,
  search,
  updateKnowledgeObject,
};
