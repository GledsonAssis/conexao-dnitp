import ImageCarousel from '../../models/action/ImageCarousel';
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

const findAll = idAction => ImageCarousel.findAll({
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
    idAction,
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
      idAction,
      fileName: name,
    } = payload;

    await ImageCarousel.update(
      { default: false },
      {
        transaction,
        where: {
          idAction,
        },
      },
    );

    await ImageCarousel.update(
      { default: true },
      {
        transaction,
        where: {
          idAction,
          name: {
            $like: `%${name}%`,
          },
        },
      },
    );
    transaction.commit();
    return idAction;
  })
  .then(idAction => ImageCarousel.findAll({
    attributes: [
      'id',
      'default',
      'name',
    ],
    where: {
      idAction,
    },
  }));

export default {
  create,
  deleteImage,
  findAll,
  findById,
  setDefault,
};
