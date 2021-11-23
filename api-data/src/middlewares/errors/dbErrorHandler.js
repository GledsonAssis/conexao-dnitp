
import HttpStatus from 'http-status-codes';

import genericErrorHandler from './genericErrorHandler';

/**
 * INTERNAL_SERVER_ERROR(500) middleware to catch database errors
 *
 * @param {object} req
 * @param {object} res
 */
export default (req, res) => (dbError) => {
  const error = {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    details: dbError,
    message: 'Database error',
    messageToken: 'databaseError',
  };
  genericErrorHandler(error, req, res);
};
