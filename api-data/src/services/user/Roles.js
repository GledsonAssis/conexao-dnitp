import Roles from '../../models/user/Roles';

const findAll = () => Roles.findAll({
  attributes: [
    'id',
    'name',
  ],
  order: [
    ['name', 'ASC'],
    ['id', 'ASC'],
  ],
});

export default {
  findAll,
};
