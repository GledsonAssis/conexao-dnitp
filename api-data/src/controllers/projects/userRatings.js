import HttpStatus from 'http-status-codes';

import UserRating from '../../services/project/UserRating';

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
      id: idProject,
      rating,
    },
    currentUser: {
      id: idUser,
    },
  } = req;

  UserRating.createUpdate({
    idProject,
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
      id: idProject,
    },
  } = req;

  if (currentUser) {
    const {
      id: idUser,
    } = currentUser;

    UserRating.findById({
      idUser,
      idProject,
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
