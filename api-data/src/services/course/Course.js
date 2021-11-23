import HttpStatus from 'http-status-codes';
import Course from '../../models/course/Course';
import HighLights from '../../models/highlight/HighlightItem';
import ImageCarousel from '../../models/course/ImageCarousel';
import Attachments from '../../models/course/Attachment';
import Comments from '../../models/course/UserComment';
import Ratings from '../../models/course/UserRating';
import db from '../../config/database';
import isPublisherWhereClause from '../../utils/validators/isPublisherWhereClause';
import courseTypeWhereClause from '../../utils/validators/courseTypeWhereClause';

const attributes = [
  'date',
  'description',
  'endDate',
  'excludedDate',
  'id',
  'isCover',
  'isPublished',
  'link',
  'summary',
  'title',
  'type',
  'modifyDate',
];

const create = (payload, userId) => {
  const {
    idUser,
    endDate,
    isPublished,
    isCover,
    link = '',
    ...rest
  } = payload;

  const currentDate = new Date();

  return Course.create({
    ...rest,
    idUser: userId,
    link,
    date: currentDate,
    endDate: endDate || currentDate,
    isCover: isCover || false,
    isPublished: isPublished || false,
    modifyDate: currentDate,
  })
    .then(({ id }) => Course.findByPk(id));
};

const deleteCourse = id => db.transaction(async (transaction) => {
  await Attachments.destroy({
    transaction,
    where: {
      idCourse: id,
    },
  });

  await ImageCarousel.destroy({
    transaction,
    where: {
      idCourse: id,
    },
  });

  await Comments.destroy({
    transaction,
    where: {
      idCourse: id,
    },
  });

  await Ratings.destroy({
    transaction,
    where: {
      idCourse: id,
    },
  });

  return Course.destroy({
    transaction,
    where: {
      id,
    },
  });
});

const findAll = async currentUser => Course.findAll({
  attributes,
  where: {
    ...isPublisherWhereClause(currentUser),
    ...(await courseTypeWhereClause(currentUser)),
  },
  order: [
    ['date', 'DESC'],
    ['description', 'ASC'],
  ],
});

const findById = id => Course.findByPk(id, {
  attributes,
});

const publish = ({ id, isPublished }) => db.transaction(async (transaction) => {
  const isHighLited = await HighLights.findOne({
    transaction,
    where: {
      id,
      highlighted: true,
      type: 'Curso',
    },
  })
    .then(el => (el ? el.get({ plain: true }) : undefined));

  if (isHighLited) {
    // transaction.rollback();
    return ({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Não é possível despublicar um curso em destaque',
      message_token: 'unallowed_unpublish',
    });
  }

  const currentDate = new Date();

  return Course.update({
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
    .then(() => Course.findByPk(id, { transaction }));
});

const update = ({
  id,
  ...rest
}) => Course.update({...rest, modifyDate: new Date()},
  {
    where: {
      id,
    },
  })
  .then(() => Course.findByPk(id));

const search = ({
  keyword,
  limit,
  offset,
  order,
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

  return Course.findAndCountAll({
    attributes,
    limit,
    offset,
    order,
    where,
  });
};

export default {
  create,
  deleteCourse,
  findAll,
  findById,
  publish,
  search,
  update,
};
