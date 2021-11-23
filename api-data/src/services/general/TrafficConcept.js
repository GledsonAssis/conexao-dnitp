import sequelize from 'sequelize';
import SchoolYear from '../../models/general/SchoolYear';
import TrafficConcept from '../../models/general/TrafficConcept';
import Theme from '../../models/general/Theme';
import SubTheme from '../../models/general/SubTheme';

const transitConceptAttributes = [
  'id',
  'description',
  'idSchoolYear',
];

const createTrafficConcept = ({
  description,
  idSchoolYear,
}) => TrafficConcept.create({
  description,
  idSchoolYear,
});

const findAll = () => TrafficConcept.findAll({
  attributes: transitConceptAttributes,
});

const findById = id => TrafficConcept.findByPk(id, {
  attributes: transitConceptAttributes,
  include: [
    {
      as: 'schoolYear',
      attributes: ['ordinal'],
      include: [
        {
          as: 'subTheme',
          attributes: [
            'id',
            'name',
          ],
          include: [
            {
              as: 'theme',
              attributes: [
                'id',
                'name',
              ],
              model: Theme,
            },
          ],
          model: SubTheme,
        },
      ],
      model: SchoolYear,
    },
  ],
  where: {
    id,
  },
});

const findAllCMS = () => TrafficConcept.findAndCountAll({
  attributes: transitConceptAttributes,
});

const search = ({
  idSchoolYear,
  keyword,
  order: sort,
  page = 1,
  limit = 0,
}) => {
  let offset = 0;
  if (limit > 0) {
    offset = limit * (page - 1);
  }

  const where = {
    $and: [
      (idSchoolYear ? { idSchoolYear } : undefined),
    ],
  };

  if (keyword) {
    where.$or = [
      { description: { $like: `%${keyword}%` } },
      sequelize.literal(`[schoolYear->subTheme].nome like '%${keyword}%'`),
      sequelize.literal(`cast([schoolYear].[numeroOrdinal] as varchar(3)) like '${keyword}'`),
      sequelize.literal(`[schoolYear->subTheme->theme].nome like '%${keyword}%'`),
    ];
  }

  const order = [];
  const fields = (sort || '').split(',');

  if (fields[1] === '0') order.push(['description', 'asc']);
  else {
    switch (fields[0]) {
      case 'year': if (fields[1] !== '0') order.push(['idSchoolYear', fields[1]]);
        break;
      case 'name': if (fields[1] !== '0') order.push(['description', fields[1]]);
        break;
      case 'theme': if (fields[1] !== '0') order.push([sequelize.literal('[schoolYear.subTheme.theme.name]'), fields[1]]);
        break;
      case 'Subtheme': if (fields[1] !== '0') order.push([sequelize.literal('[schoolYear.subTheme.name]'), fields[1]]);
        break;
      default: order.push(['description', 'asc']);
        break;
    }
  }

  return TrafficConcept.findAndCountAll({
    attributes: transitConceptAttributes,
    include: [
      {
        as: 'schoolYear',
        attributes: ['ordinal'],
        include: [
          {
            as: 'subTheme',
            attributes: [
              'id',
              'name',
            ],
            include: [
              {
                as: 'theme',
                attributes: [
                  'id',
                  'name',
                ],
                model: Theme,
              },
            ],
            model: SubTheme,
          },
        ],
        model: SchoolYear,
      },
    ],
    offset,
    limit,
    order,
    where,
  });
};

const remove = id => TrafficConcept.destroy({
  where: {
    id,
  },
});

const updateTrafficConcept = ({
  id,
  idSchoolYear,
  description,
}) => TrafficConcept.update({
  idSchoolYear,
  description,
},
{
  where: {
    id,
  },
});

export default {
  createTrafficConcept,
  findAll,
  findAllCMS,
  findById,
  remove,
  search,
  updateTrafficConcept,
};
