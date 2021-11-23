import HttpStatus from 'http-status-codes';

import Error from '../../models/general/Error';

const mapError = ({
  message,
  path,
}) => ({
  message,
  param: path,
});

/**
* Joi error handler middleware
*
* @param {object} error
* @param {object} req
* @param {object} res
* @param {function} next
*/
export default (error, req, res, next) => {
  const {
    details,
    isJoi,
  } = error;

  if (isJoi) {
    const code = HttpStatus.BAD_REQUEST;
    const detailsMap = details && details.map(mapError);
    const message = HttpStatus.getStatusText(code);

    res
      .status(code)
      .json(new Error(code, message, detailsMap));
  }

  // If this isn't a Joi error, send it to the next error handler
  return next(error);
};
