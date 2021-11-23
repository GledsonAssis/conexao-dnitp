import Road from '../../models/Road/Road';
import DnitUnit from '../../models/dnitUnit/DnitUnit';
import State from '../../models/general/State';

const findAll = () => Road.findAll({
  attributes: [
    'id',
    'name',
  ],
  order: [
    ['name', 'ASC'],
  ],
});

const findByDnitUnit = ({ id, offset, limit }) => Road.findAndCountAll({
  attributes: [
    'id',
    'name',
  ],
  include: [
    {
      as: 'dnitUnit',
      attributes: [],
      model: DnitUnit,
      through: { attributes: [] },
      where: {
        id,
      },
    },
  ],
  limit,
  offset,
  order: [
    ['name', 'ASC'],
  ],
});

const findByUf = ({ id, offset, limit }) => Road.findAndCountAll({
  attributes: [
    'id',
    'name',
  ],
  include: [
    {
      as: 'states',
      attributes: [],
      model: State,
      through: { attributes: [] },
      where: {
        id,
      },
    },
  ],
  limit,
  offset,
  order: [
    ['name', 'ASC'],
  ],
});

export default {
  findAll,
  findByDnitUnit,
  findByUf,
};
