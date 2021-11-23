import Mime from '../../models/general/Mime';
import Attachment from '../../models/action/Attachment';

const create = attachments => Attachment.bulkCreate(
  attachments,
  {
    returning: true,
  },
);

const deleteAttachment = id => Attachment.destroy({
  where: {
    id,
  },
});

const findAll = idAction => Attachment.findAll({
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
    idAction,
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

const update = ({
  id,
  name,
}) => Attachment.update({ name },
  {
    where: {
      id,
    },
  })
  .then(() => findById(id));

export default {
  create,
  deleteAttachment,
  findAll,
  findById,
  update,
};
