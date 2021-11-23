import City from '../../models/general/City';

const findAll = () => City.findAll({
  attributes: [
    'id',
    'idState',
    'ibgeCode',
    'name',
  ],
  order: [
    ['idState', 'ASC'],
  ],
});

export default {
  findAll,
};
