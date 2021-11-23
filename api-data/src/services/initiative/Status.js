import Status from '../../models/initiative/Status';

const create = ({
  name,
}) => Status.create({
  name,
});

const findAll = () => Status.findAll({});

const findByPk = ({ id }) => Status.findByPk(id);

export default {
  create,
  findAll,
  findByPk,
};
