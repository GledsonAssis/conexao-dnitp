import ImageCarousel from '../../models/course/ImageCarousel';
import Mime from '../../models/general/Mime';
import db from '../../config/database';

const create = attachments => ImageCarousel.bulkCreate(
  attachments,
  {
    returning: true,
  },
);

const deleteImage = id => ImageCarousel.destroy({
  where: {
    id,
  },
});

const findAll = idCourse => ImageCarousel.findAll({
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
    idCourse,
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
      idCourse,
      fileName: name,
    } = payload;

    await ImageCarousel.update(
      { default: false },
      {
        transaction,
        where: {
          idCourse,
        },
      },
    );

    await ImageCarousel.update(
      { default: true },
      {
        transaction,
        where: {
          idCourse,
          name: {
            $like: `%${name}%`,
          },
        },
      },
    );
    transaction.commit();
    return idCourse;
  })
  .then(idCourse => ImageCarousel.findAll({
    attributes: [
      'id',
      'default',
      'name',
    ],
    where: {
      idCourse,
    },
  }));

export default {
  create,
  deleteImage,
  findAll,
  findById,
  setDefault,
};
