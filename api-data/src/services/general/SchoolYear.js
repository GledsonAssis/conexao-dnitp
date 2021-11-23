import Discipline from '../../models/general/Discipline';
import FieldKnowledge from '../../models/general/FieldKnowledge';
import SchoolYear from '../../models/general/SchoolYear';
import SubTheme from '../../models/general/SubTheme';
import Theme from '../../models/general/Theme';

const schoolYearAttributes = [
  'id',
  'idSubTheme',
  'color',
  'ordinal',
  'startYear',
];

const findAll = () => SchoolYear.findAll({
  attributes: schoolYearAttributes,
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
});

const findById = id => SchoolYear.findByPk(id, {
  attributes: schoolYearAttributes,

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
    {
      as: 'disciplines',
      model: Discipline,
      attributes: [
        'id',
        'color',
        'name',
      ],
      include: [
        {
          as: 'knowledgeArea',
          attributes: [
            'description',
          ],
          model: FieldKnowledge,
        },
      ],
      required: false,
      through: { attributes: [] },
    },
  ],
});

export default {
  findAll,
  findById,
};
