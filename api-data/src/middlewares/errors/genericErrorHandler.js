import HttpStatus from 'http-status-codes';

import Error from '../../models/general/Error';

/**
 * Generic error response middleware
 *
 * @param {object} error
 * @param {object} req
 * @param {object} res
 * @param {method} method
 */
export default (error, req, res) => {
  console.error('genericErrorHandler', error); // eslint-disable-line no-console

  const {
    details,
  } = error;

  const code = (error.code !== 'ECONNREFUSED') || (error.code !== 'EAI_AGAIN')
    ? error.code || HttpStatus.INTERNAL_SERVER_ERROR
    : HttpStatus.INTERNAL_SERVER_ERROR;
  const message = error.message || HttpStatus.getStatusText(code);
  const messageToken = error.messageToken || 'generic.error';
  const status = error.status || code;

  res
    .status(status)
    .json(new Error(
      code,
      message,
      details,
      messageToken,
    ));
};
