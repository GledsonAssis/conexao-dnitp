import HttpStatus from 'http-status-codes';

import {
  dbErrorHandler,
} from '../../middlewares';

import Status from '../../services/initiative/Status';

import {
  dbDataHandler,
} from '../../utils/http';

/**
 * Create new Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const create = (req, res) => {
  const {
    body,
  } = req;

  Status.create(body)
    .then(() => res.sendStatus(HttpStatus.CREATED))
    .catch(dbErrorHandler(req, res));
};

/**
 * Find all the Status
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const findAll = (req, res) => {
  const {
    currentUser,
  } = req;

  Status.findAll(currentUser)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Find the Status by id
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

  Status.findById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  create,
  findAll,
  findById,
};
