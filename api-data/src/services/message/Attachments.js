import Attachment from '../../models/message/Attachment';
import Mime from '../../models/general/Mime';

const create = attachments => Attachment.bulkCreate(
  attachments,
);

const findAll = () => Attachment.findAll({});

const findByPk = id => Attachment.findByPk(id, {
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
  findAll,
  findByPk,
};
