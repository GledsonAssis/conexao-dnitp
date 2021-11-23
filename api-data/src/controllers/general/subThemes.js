import ActivitySubTheme from '../../services/general/SubTheme';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
} from '../../utils/http';

/**
* Find all the SubTheme
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  ActivitySubTheme.findAll()
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find all the SubThemes with pagination
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

  return ActivitySubTheme.findAllCMS({ offset, limit: parseInt(limit, 10) })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find the SubTheme by id
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

  ActivitySubTheme.findById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find the SubTheme by Theme id
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAllByTheme = (req, res) => {
  const {
    params: {
      idTheme,
    },
  } = req;

  ActivitySubTheme.findAllByTheme(idTheme)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  findAll,
  findAllCMS,
  findById,
  findAllByTheme,
};
