import Audio from '../../models/initiative/Audio';
import Mime from '../../models/general/Mime';

const create = ({
  idInitiative,
  idMime,
  file,
  guid,
}) => Audio.create({
  idInitiative,
  idMime,
  file,
  guid,
});

const findAll = () => Audio.findAll({});

const findByPk = id => Audio.findByPk(id, {
  attributes: [
    'idInitiative',
    'file',
  ],
  include: [
    {
      as: 'mime',
      attributes: [
        'id',
        'media',
        'suffix',
      ],
      model: Mime,
    },
  ],
});

export default {
  create,
  findAll,
  findByPk,
};
