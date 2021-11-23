import HttpStatus from 'http-status-codes';
import db from '../../config/database';
import Attachments from '../../models/project/Attachment';
import Comments from '../../models/project/UserComment';
import ImageCarousel from '../../models/project/ImageCarousel';
import Project from '../../models/project/Project';
import Ratings from '../../models/project/UserRating';
import User from '../../models/user/User';
import HighLights from '../../models/highlight/HighlightItem';

import isPublisherWhereClause from '../../utils/validators/isPublisherWhereClause';

const attributes = [
  'id',
  'date',
  'description',
  'endDate',
  'excludedDate',
  'isCover',
  'isPublished',
  'summary',
  'title',
];

const create = (payload) => {
  const {
    idUser,
    description,
    endDate,
    isCover,
    isPublished,
    summary,
    title,
  } = payload;

  const currentDate = new Date();

  return Project.create({
    idUser,
    date: currentDate,
    description,
    endDate,
    isCover,
    isPublished,
    summary,
    title,
    modifyDate: currentDate,
  })
    .then(({ id }) => Project.findByPk(id));
};

const deleteProject = id => db.transaction(async (transaction) => {
  await Attachments.destroy({
    transaction,
    where: {
      idProject: id,
    },
  });

  await ImageCarousel.destroy({
    transaction,
    where: {
      idProject: id,
    },
  });

  await Comments.destroy({
    transaction,
    where: {
      idProject: id,
    },
  });

  await Ratings.destroy({
    transaction,
    where: {
      idProject: id,
    },
  });

  return Project.destroy({
    transaction,
    where: {
      id,
    },
  });
});

const findAll = currentUser => Project.findAll({
  attributes,
  where: isPublisherWhereClause(currentUser),
});

const findById = id => Project.findByPk(id, {
  attributes,
  include: [
    {
      as: 'author',
      attributes: [
        'id',
        'name',
      ],
      model: User,
    },
  ],
});

const publish = ({ id, isPublished }) => db.transaction(async (transaction) => {
  const isHighLited = await HighLights.findOne({
    transaction,
    where: {
      id,
      highlighted: true,
      type: 'Projeto',
    },
  })
    .then(el => (el ? el.get({ plain: true }) : undefined));

  if (isHighLited) {
    // transaction.rollback();
    return ({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Não é possível despublicar um projeto em destaque',
      message_token: 'unallowed_unpublish',
    });
  }

  const currentDate = new Date();

  return Project.update({
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
    .then(() => Project.findByPk(id, { transaction }));
});


const update = ({
  id,
  description,
  endDate,
  excludedDate,
  isCover,
  isPublished,
  summary,
  title,
}) => Project.update({
  description,
  endDate,
  excludedDate,
  isCover,
  isPublished,
  summary,
  title,
  modifyDate: new Date(),
},
{
  where: {
    id,
  },
})
  .then(() => Project.findByPk(id));

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

  return Project.findAndCountAll({
    attributes,
    limit,
    offset,
    order,
    where,
  });
};

export default {
  create,
  deleteProject,
  findAll,
  findById,
  publish,
  search,
  update,
};
