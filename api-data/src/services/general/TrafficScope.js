import TrafficConcept from '../../models/general/TrafficConcept';
import TrafficContent from '../../models/general/TrafficContent';
import TrafficScope from '../../models/general/TrafficScope';
import Skills from '../../models/general/Skill';

const schoolYearAttributes = [
  'id',
  'description',
];

const findAll = () => TrafficScope.findAll({
  attributes: [
    ...schoolYearAttributes,
    'idTrafficContent',
  ],
});

const findById = id => TrafficScope.findByPk(id, {
  attributes: schoolYearAttributes,
  include: [
    {
      as: 'trafficContent',
      attributes: [
        'id',
        'description',
      ],
      include: [
        {
          as: 'trafficConcept',
          attributes: [
            'id',
            'description',
          ],
          model: TrafficConcept,
        },
      ],
      model: TrafficContent,
    },
  ],
});

const search = ({
  idTrafficContent,
  keyword,
  limit,
  offset,
}) => {
  const where = keyword || idTrafficContent ? {
    $and: [],
  }
    : {};

  if (keyword) where.$and.push({ description: { $like: `%${keyword}%` } });
  if (idTrafficContent) {
    if (!where.$or) where.$or = [];
    idTrafficContent
      .split(',')
      .map(id => where.$or.push({ idTrafficContent: id }));
  }

  return TrafficScope.findAndCountAll({
    attributes: [
      'id',
      'description',
      'idTrafficContent',
    ],
    include: [
      {
        as: 'skills',
        attributes: [
          'id',
          'description',
        ],
        model: Skills,
      },
    ],
    limit,
    offset,
    where,
  });
};

export default {
  findAll,
  findById,
  search,
};
