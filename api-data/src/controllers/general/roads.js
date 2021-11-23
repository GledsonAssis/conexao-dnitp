import Road from '../../services/general/Road';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
} from '../../utils/http';

/**
 * List all Roads
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findAll = (req, res) => Road.findAll()
  .then(dbDataHandler(req, res))
  .catch(dbErrorHandler(req, res));

/**
 * List all Roads from a DNIT Unit
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */

const findByDnitUnit = (req, res) => {
  const {
    query: {
      idDnitUnit: id,
      limit = 0,
      page = 1,
    },
  } = req;
  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  return Road.findByDnitUnit({ id, offset, limit: parseInt(limit, 10) })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * List all Roads from State
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */

const findByUf = (req, res) => {
  const {
    query: {
      idUf: id,
      limit = 0,
      page = 1,
    },
  } = req;
  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  return Road.findByUf({ id, offset, limit: parseInt(limit, 10) })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  findAll,
  findByDnitUnit,
  findByUf,
};
