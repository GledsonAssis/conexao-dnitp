import ActivityTheme from '../../services/general/Theme';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
} from '../../utils/http';

/**
* Find all the ActivityTheme
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  ActivityTheme.findAll()
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find all the ActivityTheme with pagination
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAllCMS = (req, res) => {
  const {
    query: {
      limit,
      page = 1,
    },
  } = req;
  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  return ActivityTheme.findAllCMS({ offset, limit: parseInt(limit, 10) })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find the ActivityTheme by id
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findById = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  ActivityTheme.findById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  findAll,
  findAllCMS,
  findById,
};
