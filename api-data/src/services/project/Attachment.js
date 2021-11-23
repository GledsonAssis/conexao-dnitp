import Attachment from '../../models/project/Attachment';
import Mime from '../../models/general/Mime';


const create = attachments => Attachment.bulkCreate(
  attachments,
  {
    returning: true,
  },
);

const deleteAttachment = ({ id, idProject }) => Attachment.destroy({
  where: {
    id,
    idProject,
  },
});

const findAll = idProject => Attachment.findAll({
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
    idProject,
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

export default {
  create,
  deleteAttachment,
  findAll,
  findById,
};
