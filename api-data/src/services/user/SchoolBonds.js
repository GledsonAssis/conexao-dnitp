import SchoolBonds from '../../models/user/SchoolBonds';

const findAll = () => SchoolBonds.findAll({
  attributes: [
    'id',
    'name',
  ],
});

export default {
  findAll,
};
