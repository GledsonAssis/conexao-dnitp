import SchoolBonds from '../../services/user/SchoolBonds';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
} from '../../utils/http';

/**
 * List all SchoolBond
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findAll = (req, res) => SchoolBonds.findAll()
  .then(dbDataHandler(req, res))
  .catch(dbErrorHandler(req, res));


export default {
  findAll,
};
