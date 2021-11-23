import Terms from '../../models/general/Terms';

const findById = id => Terms.findByPk(id, {
  attributes: [
    'id',
    'active',
    'endDate',
    'startDate',
  ],
});

export default {
  findById,
};
