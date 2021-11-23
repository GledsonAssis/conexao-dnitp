import HttpStatus from 'http-status-codes';

import UserRating from '../../services/projectAction/UserRating';

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
      id: idProjectAction,
      rating,
    },
    currentUser: {
      id: idUser,
    },
  } = req;

  UserRating.createUpdate({
    idProjectAction,
    idUser,
    rating,
  })
    .then(() => res.sendStatus(HttpStatus.OK))
    .catch(dbErrorHandler(req, res));
};

/**
 * delete new UserRating
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
    currentUser,
    params: {
      id: idProjectAction,
    },
  } = req;

  if (currentUser) {
    const {
      id: idUser,
    } = currentUser;

    UserRating.findById({
      idProjectAction,
      idUser,
    })
      .then(result => (result === null ? { rating: 0 } : result))
      .then(data => res.json(data))
      .catch(dbErrorHandler(req, res));
  } else {
    res.json(res.sendStatus(HttpStatus.NO_CONTENT));
  }
};

export default {
  createUpdate,
  deleteUserRating,
  findById,
};
