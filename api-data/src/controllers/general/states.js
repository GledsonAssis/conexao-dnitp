import State from '../../services/general/State';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
} from '../../utils/http';

/**
 * List all states
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findAll = (req, res) => State.findAll()
  .then(dbDataHandler(req, res))
  .catch(dbErrorHandler(req, res));

export default {
  findAll,
};
