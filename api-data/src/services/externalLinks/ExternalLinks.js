import HttpStatus from 'http-status-codes';
import ExternalLink from '../../models/ExternalLink/ExternalLink';
import db from '../../config/database';
import HighLights from '../../models/highlight/HighlightItem';

const attributes = [
  'id',
  'description',
  'summary',
  'title',
  'link',
  'excludedDate',
  'isPublished',
];

const createExternalLink = ({
  id,
  isPublished,
  ...rest
}) => db.transaction(transaction => ExternalLink.create({
  ...rest,
  isPublished: isPublished || false,
  date: new Date(),
  modifyDate: new Date(),
},
{
  transaction,
})
  .then(({ id }) => ExternalLink.findByPk(id, {
    attributes,
    transaction,
  })));

const deleteExternalLink = id => db.transaction(transaction => ExternalLink.destroy({
  transaction,
  where: {
    id,
  },
}));


const findAll = () => ExternalLink.findAll({
  attributes,
});

const publish = ({ id, isPublished }) => db.transaction(async (transaction) => {
  const isHighLited = await HighLights.findOne({
    transaction,
    where: {
      id,
      highlighted: true,
      type: 'Link Externo',
    },
  })
    .then(el => (el ? el.get({ plain: true }) : undefined));

  if (isHighLited) {
    return ({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Não é possível despublicar um link externo em destaque',
      message_token: 'unallowed_unpublish',
    });
  }

  const currentDate = new Date();

  return ExternalLink.update({
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
    .then(() => ExternalLink.findByPk(id, { transaction }));
});


const search = ({
  keyword,
  limit,
  offset,
  order: sort,
}) => {
  let order = ['id'];
  const fields = (sort || '').split(',');

  if (fields[0] && fields[1] !== '0') order = [['title', fields[1]]];

  const where = keyword
    ? {
      $or: [
        { description: { $like: `%${keyword}%` } },
        { summary: { $like: `%${keyword}%` } },
        { title: { $like: `%${keyword}%` } },
      ],
    }
    : {};

  return ExternalLink.findAndCountAll({
    attributes,
    limit,
    offset,
    order,
    where,
  });
};


const findById = id => ExternalLink.findByPk(id, {
  attributes,
});

const updateExternalLink = ({ id, isPublished, ...rest }) => ExternalLink.update({
  isPublished: isPublished || false,
  modifyDate: new Date(),
  ...rest,
},
{
  where: {
    id,
  },
})
  .then(() => ExternalLink.findByPk(id, {
    attributes,
  }));

export default {
  createExternalLink,
  deleteExternalLink,
  findAll,
  findById,
  publish,
  search,
  updateExternalLink,
};
