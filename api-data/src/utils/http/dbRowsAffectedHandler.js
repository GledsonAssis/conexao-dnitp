import {
  notFoundErrorHandler,
} from '../../middlewares';

/**
 * Database handler rows affected
 *
 * @param {object} req
 * @param {object} res
 * @param {integer} rowsAffected
 */
export default (req, res) => (rowsAffected) => {
  if (rowsAffected) {
    res.json();
  } else {
    notFoundErrorHandler(req, res);
  }
};
