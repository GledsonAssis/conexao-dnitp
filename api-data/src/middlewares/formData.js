import parseFormData from '../utils/http/parseFormData';

import genericErrorHandler from './errors/genericErrorHandler';

const formData = [
  'application/x-www-form-urlencoded',
  'multipart/form-data',
];

/**
* Middleware for parse formData
*
* @param {object} req
* @param {object} res
* @param {function} next
*/
export default (req, res, next) => {
  const {
    headers: {
      'content-type': content,
    },
  } = req;

  if (!content) {
    next();
  } else {
    const isFormData = formData.some(
      form => content.includes(form),
    );

    if (!isFormData) {
      next();
    } else {
      parseFormData(req)
        .then(({
          body,
          files,
        }) => {
          req.body = body;
          req.files = files;
        })
        .catch((error) => {
          genericErrorHandler(error, req, res);
        })
        .finally(() => next());
    }
  }
};
