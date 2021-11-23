import {
  dbErrorHandler,
  genericErrorHandler,
} from '../../middlewares';

import Action from '../../services/action/Action';

import coverListParser from '../../utils/parsers/coverList';
import {
  dbDataHandler,
  dbDeleteHandler,
  dbFileHandler,
  mapCSVFile,
} from '../../utils/http';

/**
 * Create new Action
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const create = (req, res) => {
  const {
    body: {
      date,
      description,
      endDate,
      excludedDate = null,
      isCover,
      isPublished = false,
      summary,
      title,
    },
    currentUser,
  } = req;

  Action.createAction({
    idUser: currentUser.id,
    date,
    description,
    endDate,
    excludedDate,
    isCover,
    isPublished,
    summary,
    title,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const deleteAction = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  Action.deleteAction(id)
    .then(dbDeleteHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * search by Actions and download data in CSV format
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const downloadCSV = (req, res) => {
  const {
    query: {
      keyword,
      order,
    },
  } = req;

  return Action.search({
    keyword,
    order,
  })
    .then((data) => {
      if (data && data.count && data.count > 0) {
        return data.rows.map(row => row.dataValues);
      }
      return [];
    })
    .then(list => list.map(({
      id,
      title,
    }) => ({
      Id: id,
      Título: title,
    })))
    .then(file => mapCSVFile(file, 'lista_acoesativacao'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

/**
 * Find all the Actions
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findAll = (req, res) => {
  const { currentUser } = req;

  Action.findAll(currentUser)
    .then(coverListParser)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 *  Find Action by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findById = (req, res) => {
  const {
    params: { id },
  } = req;

  Action.findById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 *  publish Action by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const publish = (req, res) => Action.publish(req.body)
  .then((data) => {
    if (data && data.code === 422) {
      res.status(data.code)
        .json(data);
    } else {
      return dbDataHandler(req, res)(data);
    }
  })
  .catch(dbErrorHandler(req, res));

/**
 * Find all the Actions
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const search = (req, res) => {
  const {
    query: {
      keyword,
      limit,
      order,
      page = 1,
    },
  } = req;
  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  return Action.search({
    keyword,
    limit: parseInt(limit, 10),
    offset,
    order,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 *  Update Action by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const update = (req, res) => {
  const {
    body: action,
  } = req;

  Action.updateAction(action)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  create,
  deleteAction,
  downloadCSV,
  findAll,
  findById,
  publish,
  search,
  update,
};
