import HttpStatus from 'http-status-codes';

import UserRating from '../../services/course/UserRating';

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
      id: idCourse,
      rating,
    },
    currentUser: {
      id: idUser,
    },
  } = req;

  UserRating.createUpdate({
    idCourse,
    idUser,
    rating,
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
      id: idCourse,
    },
  } = req;

  if (currentUser) {
    const {
      id: idUser,
    } = currentUser;

    UserRating.findById({
      idUser,
      idCourse,
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
  findById,
};
