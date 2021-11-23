import Attachment from '../../models/user/Attachment';
import Mime from '../../models/general/Mime';

const findByUserId = idUser => Attachment.findOne({
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
    idUser,
  },
});

const createOrUpdate = async (newAvatar) => {
  const {
    idUser,
  } = newAvatar;

  const avatar = await findByUserId(idUser);

  if (!avatar) {
    return Attachment.create(newAvatar);
  }

  return Attachment.update(newAvatar, {
    where: {
      id: avatar.id,
    },
  });
};

export default {
  createOrUpdate,
  findByUserId,
};
