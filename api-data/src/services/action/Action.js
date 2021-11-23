import HttpStatus from 'http-status-codes';
import db from '../../config/database';
import Action from '../../models/action/Action';
import Attachments from '../../models/action/Attachment';
import Images from '../../models/action/ImageCarousel';
import Comments from '../../models/action/UserComment';
import Ratings from '../../models/action/UserRating';
import isPublisherWhereClause from '../../utils/validators/isPublisherWhereClause';
import HighLights from '../../models/highlight/HighlightItem';

const attributes = [
  'id',
  'idUser',
  'date',
  'description',
  'endDate',
  'excludedDate',
  'isCover',
  'isPublished',
  'summary',
  'title',
];

const createAction = newAction => db.transaction(transaction => Action.create(
  {...newAction, date: new Date(), modifyDate: new Date()},
  {
    transaction,
  },
)
  .then(({ id }) => Action.findByPk(id, {
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

  return Action.destroy({
    transaction,
    where: {
      id,
    },
  });
});

const findAll = currentUser => Action.findAll({
  attributes,
  where: isPublisherWhereClause(currentUser),
});

const publish = ({ id, isPublished }) => db.transaction(async (transaction) => {
  const isHighLited = await HighLights.findOne({
    transaction,
    where: {
      id,
      highlighted: true,
      type: 'Ação de Ativação',
    },
  })
    .then(el => (el ? el.get({ plain: true }) : undefined));

  if (isHighLited) {
    return ({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Não é possível despublicar uma ação de ativação em destaque',
      message_token: 'unallowed_unpublish',
    });
  }

  const currentDate = new Date();

  return Action.update({
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
    .then(() => Action.findByPk(id, { transaction }));
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
  const order = [['title', sufix]];

  return Action.findAndCountAll({
    attributes,
    limit,
    offset,
    order,
    where,
  });
};


const findById = id => Action.findByPk(id, {
  attributes,
});

const updateAction = ({ id, ...rest }) => Action.update(
  {...rest, modifyDate: new Date()},
  {
    where: {
      id,
    },
  },
)
  .then(() => Action.findByPk(id, {
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
