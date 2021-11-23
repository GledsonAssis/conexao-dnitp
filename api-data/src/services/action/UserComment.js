import Attachment from '../../models/user/Attachment';
import AttachmentType from '../../models/user/AttachmentType';
import User from '../../models/user/User';
import UserComment from '../../models/action/UserComment';
import Sequelize from 'sequelize';

const findAll = idAction => UserComment.findAll({
  attributes: [
    'id',
    'comment',
    'dateTime',
  ],
  include: [
    {
      as: 'author',
      attributes: [
        'id',
        [Sequelize.literal(`CASE WHEN [author].[ativo] = 1 THEN [author].[email] WHEN [author].[email] IS NULL THEN NULL ELSE 'Anônimo' END`), 'email'],
        [Sequelize.literal(`CASE WHEN [author].[ativo] = 1 THEN [author].[nome] WHEN [author].[nome] IS NULL THEN NULL ELSE 'Anônimo' END`), 'name'],
      ],
      include: [
        {
          as: 'attachment',
          attributes: [
            [Sequelize.literal(`CASE WHEN [author].[ativo] = 1 THEN [author->attachment].[id] ELSE NULL END`), 'id'],
          ],
          include: [
            {
              as: 'attachmentType',
              attributes: [
                'id',
                'name',
              ],
              model: AttachmentType,
            },
          ],
          model: Attachment,
        },
      ],
      model: User,
    },
    {
      as: 'replies',
      attributes: [
        'id',
        'comment',
        'dateTime',
        'idParent',
      ],
      include: [
        {
          as: 'author',
          attributes: [
            'id',
            [Sequelize.literal(`CASE WHEN [replies->author].[ativo] = 1 THEN [replies->author].[email] WHEN [replies->author].[email] IS NULL THEN NULL ELSE 'Anônimo' END`), 'email'],
            [Sequelize.literal(`CASE WHEN [replies->author].[ativo] = 1 THEN [replies->author].[nome] WHEN [replies->author].[nome] IS NULL THEN NULL ELSE 'Anônimo' END`), 'name'],
          ],
          include: [
            {
              as: 'attachment',
              attributes: [
                [Sequelize.literal(`CASE WHEN [replies->author].[ativo] = 1 THEN [replies->author->attachment].[id] ELSE NULL END`), 'id'],
              ],
              include: [
                {
                  as: 'attachmentType',
                  attributes: [
                    'id',
                    'name',
                  ],
                  model: AttachmentType,
                },
              ],
              model: Attachment,
            },
          ],
          model: User,
        },
      ],
      model: UserComment,
      required: false,
      where: {
        excludedDate: null,
      },
    },
  ],
  where: {
    excludedDate: null,
    idAction,
    idParent: null,
  },
});

const findById = id => UserComment.findOne({
  attributes: [
    'id',
    'comment',
    'dateTime',
    'idParent',
  ],
  include: [
    {
      as: 'author',
      attributes: [
        'id',
        'email',
        'name',
      ],
      include: [
        {
          as: 'attachment',
          attributes: [
            'id',
          ],
          include: [
            {
              as: 'attachmentType',
              attributes: [
                'id',
                'name',
              ],
              model: AttachmentType,
            },
          ],
          model: Attachment,
        },
      ],
      model: User,
    },
  ],
  where: {
    id,
  },
});

const create = comment => UserComment.create(comment).then(({ id }) => findById(id));


const deleteComment = (id, idAction) => UserComment.update(
  {
    excludedDate: new Date(),
  },
  {
    where: {
      id,
      idAction,
      excludedDate: null,
    },
  },
);


export default {
  create,
  deleteComment,
  findAll,
};
