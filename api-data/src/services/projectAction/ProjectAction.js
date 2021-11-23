import HttpStatus from 'http-status-codes';
import db from '../../config/database';
import ProjectAction from '../../models/projectAction/ProjectAction';
import Attachments from '../../models/projectAction/Attachment';
import Images from '../../models/projectAction/ImageCarousel';
import Comments from '../../models/projectAction/UserComment';
import Ratings from '../../models/projectAction/UserRating';
import Project from '../../models/project/Project';
import isPublisherWhereClause from '../../utils/validators/isPublisherWhereClause';
import HighLights from '../../models/highlight/HighlightItem';

const attributes = [
  'id',
  'idProject',
  'date',
  'description',
  'endDate',
  'excludedDate',
  'isPublished',
  'summary',
  'title',
  'idUser',
];

const createAction = newAction => db.transaction(transaction => ProjectAction.create(
  { ...newAction, date: new Date(), modifyDate: new Date() },
  {
    transaction,
  },
)
  .then(({ id }) => ProjectAction.findByPk(id, {
    attributes,
    transaction,
  })));

const deleteAction = id => db.transaction(async (transaction) => {
  await Attachments.destroy({
    transaction,
    where: {
      idAction: id,
    },
  });

  await Images.destroy({
    transaction,
    where: {
      idAction: id,
    },
  });

  await Comments.destroy({
    transaction,
    where: {
      idAction: id,
    },
  });

  await Ratings.destroy({
    transaction,
    where: {
      idAction: id,
    },
  });

  return ProjectAction.destroy({
    transaction,
    where: {
      id,
    },
  });
});

const findAll = (idProject, currentUser) => ProjectAction.findAll({
  attributes,
  where: {
    idProject,
    ...isPublisherWhereClause(currentUser),
  },
});

const findById = idProjectAction => ProjectAction.findByPk(idProjectAction, {
  attributes,
  include: [
    {
      attributes: ['id', 'title'],
      as: 'project',
      model: Project,
    },
  ],
});

const publish = ({ id, isPublished }) => db.transaction(async (transaction) => {
  const isHighLited = await HighLights.findOne({
    transaction,
    where: {
      id,
      highlighted: true,
      type: 'Ação de Projeto',
    },
  })
    .then(el => (el ? el.get({ plain: true }) : undefined));

  if (isHighLited) {
    return ({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Não é possível despublicar uma ação de projeto em destaque',
      message_token: 'unallowed_unpublish',
    });
  }

  const currentDate = new Date();

  return ProjectAction.update({
    isPublished,
    excludedDate: (!isPublished ? currentDate : null),
    modifyDate: currentDate,
  },
    {
      transaction,
      where: {
        id,
      },
    })
    .then(() => ProjectAction.findByPk(id, {
      attributes,
      include: [
        {
          attributes: ['id', 'title'],
          as: 'project',
          model: Project,
        },
      ],
      transaction,
    }));
});

const search = ({
  keyword,
  limit,
  offset,
  order: sort,
}) => {
  const where = keyword
    ? {
      $or: [
        { description: { $like: `%${keyword}%` } },
        { summary: { $like: `%${keyword}%` } },
        { title: { $like: `%${keyword}%` } },
      ],
    }
    : {};
  where.isCover = false;

  const fields = (sort || '').split(',');
  const sufix = (fields[1] && fields[1] !== '0') ? fields[1] : 'asc';
  const order = [[fields[0] || 'description', sufix]];

  return ProjectAction.findAndCountAll({
    attributes,
    include: [
      {
        attributes: ['id', 'title'],
        as: 'project',
        model: Project,
      },
    ],
    limit,
    offset,
    order,
    where,
  });
};

const updateAction = ({
  id,
  ...rest
}) => ProjectAction.update(
  { ...rest, modifyDate: new Date() },
  {
    where: {
      id,
    },
  },
)
  .then(() => ProjectAction.findByPk(id, {
    attributes,
  }));

export default {
  createAction,
  deleteAction,
  findAll,
  findById,
  publish,
  search,
  updateAction,
};
