import HttpStatus from 'http-status-codes';

import genericErrorHandler from './errors/genericErrorHandler';

const notAuthorizedError = {
  code: HttpStatus.FORBIDDEN,
  message: 'You\'re not authorized',
  messageToken: 'notAuthorized',
};
/**
* Middleware for role-based permissions
*
* @param {object} req
* @param {object} res
* @param {function} next
*/
export default (roles = [], isPrivate = false) => {
  const isAllowed = userRole => !roles.length || roles.find(role => role === userRole);
  return (req, res, next) => {
    if (!isPrivate) return next();

    const {
      currentUser,
    } = req;

    if (currentUser && isAllowed(currentUser.role.id)) {
      return next();
    }

    return genericErrorHandler(notAuthorizedError, req, res);
  };
};
