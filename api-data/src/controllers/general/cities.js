import City from '../../services/general/City';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
} from '../../utils/http';

/**
 * List all cities
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findAll = (req, res) => City.findAll()
  .then(dbDataHandler(req, res))
  .catch(dbErrorHandler(req, res));

export default {
  findAll,
};
