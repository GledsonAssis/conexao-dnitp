import User from '../../models/user/User';
import UserComment from '../../models/projectAction/UserComment';
import Sequelize from 'sequelize';

const findAll = idProject => UserComment.findAll({
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
    idParent: null,
    idProject,
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
      model: User,
    },
  ],
  where: {
    id,
  },
});

const create = comment => UserComment.create(comment).then(({ id }) => findById(id));


const deleteComment = (id, idProject) => UserComment.update(
  {
    excludedDate: new Date(),
  },
  {
    where: {
      id,
      idProject,
      excludedDate: null,
    },
  },
);

export default {
  create,
  deleteComment,
  findAll,
};
