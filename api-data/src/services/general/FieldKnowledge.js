import FieldKnowledge from '../../models/general/FieldKnowledge';

const KnowledgeAreaAttributes = [
  'id',
  'description',
];

const findAll = () => FieldKnowledge.findAll({
  attributes: KnowledgeAreaAttributes,
});

const findById = id => FieldKnowledge.findByPk(id, {
  attributes: KnowledgeAreaAttributes,
});

export default {
  findAll,
  findById,
};
