import ImageCarousel from '../../models/projectAction/ImageCarousel';
import Mime from '../../models/general/Mime';
import db from '../../config/database';

const create = images => ImageCarousel.bulkCreate(
  images,
  {
    returning: true,
  },
);

const deleteImage = id => ImageCarousel.destroy({
  where: {
    id,
  },
});

const findAll = idProjectAction => ImageCarousel.findAll({
  attributes: [
    'id',
    'name',
    'default',
  ],
  include: [
    {
      as: 'mime',
      attributes: [
        'suffix',
      ],
      model: Mime,
    },
  ],
  where: {
    idProjectAction,
  },
});

const findById = id => ImageCarousel.findByPk(id, {
  attributes: [
    'file',
    'name',
  ],
  include: [
    {
      as: 'mime',
      attributes: [
        'media',
        'suffix',
      ],
      model: Mime,
    },
  ],
});

const setDefault = payload => db.transaction()
  .then(async (transaction) => {
    const {
      idProjectAction,
      fileName: name,
    } = payload;

    await ImageCarousel.update(
      { default: false },
      {
        transaction,
        where: {
          idProjectAction,
        },
      },
    );

    await ImageCarousel.update(
      { default: true },
      {
        transaction,
        where: {
          idProjectAction,
          name: {
            $like: `%${name}%`,
          },
        },
      },
    );
    transaction.commit();
    return idProjectAction;
  })
  .then(idProjectAction => ImageCarousel.findAll({
    attributes: [
      'id',
      'default',
      'name',
    ],
    where: {
      idProjectAction,
    },
  }));

export default {
  create,
  deleteImage,
  findAll,
  findById,
  setDefault,
};
