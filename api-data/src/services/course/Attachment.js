import Attachment from '../../models/course/Attachment';
import Mime from '../../models/general/Mime';


const create = attachments => Attachment.bulkCreate(
  attachments,
  {
    returning: true,
  },
);

const findAll = idCourse => Attachment.findAll({
  attributes: [
    'id',
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
  where: {
    idCourse,
  },
});

const findById = id => Attachment.findByPk(id, {
  attributes: [
    'id',
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

const deleteAttachment = id => Attachment.destroy({
  where: {
    id,
  },
});

export default {
  create,
  deleteAttachment,
  findAll,
  findById,
};
