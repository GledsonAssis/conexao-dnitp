import ImageCarousel from '../../models/project/ImageCarousel';
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

const findAll = idProject => ImageCarousel.findAll({
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
    idProject,
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
      idProject,
      fileName: name,
    } = payload;

    await ImageCarousel.update(
      { default: false },
      {
        transaction,
        where: {
          idProject,
        },
      },
    );

    await ImageCarousel.update(
      { default: true },
      {
        transaction,
        where: {
          idProject,
          name: {
            $like: `%${name}%`,
          },
        },
      },
    );
    transaction.commit();
    return idProject;
  })
  .then(idProject => ImageCarousel.findAll({
    attributes: [
      'id',
      'default',
      'name',
    ],
    where: {
      idProject,
    },
  }));

export default {
  create,
  deleteImage,
  findAll,
  findById,
  setDefault,
};
