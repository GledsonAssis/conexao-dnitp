import HttpStatus from 'http-status-codes';

/**
 * Database handler returning data
 *
 * @param {object} data
 * @param {object} req
 * @param {object} res
 */
export default (req, res) => (data) => {
  const errorOnPersistData = data[0] === 0;

  if (errorOnPersistData) {
    const error = {
      code: HttpStatus.FORBIDDEN,
      details: data,
      message: 'Record already deleted',
      messageToken: 'comments.delete.forbidden',
    };
    res.json(error);
  } else {
    const obj = {
      code: HttpStatus.OK,
      details: data,
      message: 'Record deleted successfully',
      messageToken: 'comments.delete.succesfully',
    };
    res.json(obj);
  }
};
