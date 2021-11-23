import Discipline from '../../models/general/Discipline';
import DisciplineSubject from '../../models/general/KnowledgeObject';
import FieldKnowledge from '../../models/general/FieldKnowledge';
import SchoolYear from '../../models/general/SchoolYear';

const DisciplineAttributes = [
  'id',
  'idKnoledgeArea',
  'color',
  'corHexa',
  'name',
];

const findAll = ({
  idKnoledgeArea,
  schoolYear,
  keyword,
  limit,
  offset,
}) => {
  const where = {
    $and: [
      (idKnoledgeArea ? { idKnoledgeArea } : {}),
      (keyword ? { name: { $like: `%${keyword}%` } } : {}),
    ],
  };
  return Discipline.findAll({
    attributes: DisciplineAttributes,
    include: [{
      as: 'schoolYears',
      attributes: [],
      through: { attributes: [] },
      model: SchoolYear,
      where: (schoolYear ? { ordinal: { $eq: schoolYear } } : {}),
    }],
    limit,
    offset,
    where,
  });
};

const findById = id => Discipline.findByPk(id, {
  attributes: DisciplineAttributes,
  include: [
    {
      as: 'disciplineContent',
      attributes: [
        'id',
        'description',
      ],
      model: DisciplineSubject,
      required: false,
      through: { attributes: [] },
    },
    {
      as: 'fieldKnowledge',
      attributes: [
        'description',
      ],
      model: FieldKnowledge,
    },
  ],
});

const findIconByDisciplineId = id => Discipline.findByPk(id, {
  attributes: [
    'icon',
  ],
})
  .then(icon => ({
    file: icon.dataValues.icon,
    name: 'icone',
    mime: {
      suffix: '.png',
      media: 'image/png',
    },
  }));

export default {
  findAll,
  findIconByDisciplineId,
  findById,
};
