import State from '../../models/general/State';

const findAll = () => State.findAll({
  attributes: [
    'id',
    'initials',
    'name',
  ],
  order: [
    ['name', 'ASC'],
  ],
});

export default {
  findAll,
};
