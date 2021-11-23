
import HttpStatus from 'http-status-codes';

import genericErrorHandler from './genericErrorHandler';

/**
 * NOT_FOUND(404) middleware to catch error response
 *
 * @param {object} req
 * @param {object} res
 */
export default (req, res) => {
  const error = {
    code: HttpStatus.NOT_FOUND,
  };
  genericErrorHandler(error, req, res);
};
