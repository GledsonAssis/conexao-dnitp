import Skill from '../../models/general/Skill';
import TrafficContent from '../../models/general/TrafficContent';
import TrafficScope from '../../models/general/TrafficScope';

const schoolYearAttributes = [
  'id',
  'description',
  'idTransitCompetence',
];

const findAll = () => Skill.findAll({
  attributes: schoolYearAttributes,
});

const findById = id => Skill.findByPk(id, {
  attributes: schoolYearAttributes,
  include: [
    {
      as: 'trafficScope',
      attributes: [
        'id',
        'description',
      ],
      include: [
        {
          as: 'content',
          attributes: [
            'id',
            'description',
          ],
          model: TrafficContent,
        },
      ],
      model: TrafficScope,
    },
  ],
});

export default {
  findAll,
  findById,
};
