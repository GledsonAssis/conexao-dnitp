import HttpStatus from 'http-status-codes';
import UserRating from '../../services/action/UserRating';

import {
  dbErrorHandler,
} from '../../middlewares';

/**
 * createUpdate new UserRating
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const createUpdate = (req, res) => {
  const {
    body: {
      id: idAction,
      rating,
    },
    currentUser: {
      id: idUser,
    },
  } = req;

  UserRating.createUpdate({
    idAction,
    idUser,
    rating,
  })
    .then(() => res.sendStatus(HttpStatus.OK))
    .catch(dbErrorHandler(req, res));
};

/**
 * createUpdate new UserRating
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const deleteUserRating = (req, res) => {
  const {
    params: {
      id: idAction,
    },
    currentUser: {
      id: idUser,
    },
  } = req;

  UserRating.deleteUserRating({
    idAction,
    idUser,
  })
    .then(() => res.sendStatus(HttpStatus.OK))
    .catch(dbErrorHandler(req, res));
};

/**
 *  Find UserRating by id and user
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findById = (req, res) => {
  const {
    currentUser: {
      id: idUser,
    },
    params: {
      id: idAction,
    },
  } = req;

  UserRating.findById({
    idUser,
    idAction,
  })
    .then(result => (result === null ? { rating: 0 } : result))
    .then(data => res.json(data))
    .catch(dbErrorHandler(req, res));
};

export default {
  createUpdate,
  deleteUserRating,
  findById,
};
