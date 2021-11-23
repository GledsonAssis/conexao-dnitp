import {
  notFoundErrorHandler,
} from '../../middlewares';

/**
 * Database handler returning data
 *
 * @param {object} data
 * @param {object} req
 * @param {object} res
 */
export default (req, res) => (data) => {
  if (data) {
    res.json(data);
  } else {
    notFoundErrorHandler(req, res);
  }
};
