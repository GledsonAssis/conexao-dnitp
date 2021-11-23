import db from '../../config/database';
import { professor } from '../../constants/Role';
import Attachment from '../../models/activity/Attachment';
import Download from '../../models/activity/FileDownload';
import UserEvaluation from '../../models/survey/UserEvaluation';
import Survey from '../../models/survey/Survey';
import Mime from '../../models/general/Mime';
import FileDownload from '../../models/activity/FileDownload';

const attributes = [
  'id',
  'idActivity',
  'name',
];

const create = attachments => Attachment.bulkCreate(
  attachments,
);

const download = ({
  id,
  currentUser,
}) => db.transaction(async (transaction) => {
  await Download.upsert({
    idActivityAttachment: id,
    idUser: currentUser.id,
  },
  {
    transaction,
  });

  const attachment = await Attachment.findByPk(id, {
    attributes: [
      ...attributes,
      'file',
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
    transaction,
  });

  const survey = await Survey.findOne({
    order: [
      ['version', 'DESC'],
    ],
    where: {
      active: 1,
    },
  });

  if (survey && (currentUser.role.id === professor)) {
    await UserEvaluation.findOrCreate({
      defaults: {
        status: 1,
        idActivityEvaluation: survey.id,
      },
      transaction,
      where: {
        idActivity: attachment.idActivity,
        idUser: currentUser.id,
      },
    });
  }

  return attachment;
});

const findAll = idActivity => Attachment.findAll({
  attributes,
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
    idActivity,
  },
});

const findByPk = id => Attachment.findByPk(id, {
  attributes: [
    ...attributes,
    'file',
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

const remove = id => 
  db.transaction(transaction => FileDownload.destroy({
    transaction,
    where: {
      idActivityAttachment: id
    },
  }).then(() => Attachment.destroy({
      transaction,
      where: {
        id,
      },
  })));

export default {
  create,
  download,
  findAll,
  findByPk,
  remove,
};
