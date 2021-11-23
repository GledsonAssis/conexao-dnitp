import { dbErrorHandler } from '../../middlewares';

import UserComment from '../../services/action/UserComment';

import {
  dbDataHandler,
  dbDeleteHandler,
} from '../../utils/http';

/**
* Create a comment
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const create = (req, res) => {
  const {
    body,
    currentUser: {
      id,
    },
  } = req;
  const comment = {
    ...body,
    idUser: id,
  };
  UserComment.create(comment)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Delete a comment by its id and idAction
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const deleteComment = (req, res) => {
  const {
    params: {
      id,
      idAction,
    },
  } = req;
  UserComment.deleteComment(id, idAction)
    .then(dbDeleteHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find all the UserComments by actionId
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  const {
    params: {
      id: idAction,
    },
  } = req;

  UserComment.findAll(idAction)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find a UserComments by Id
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findById = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  UserComment.findById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  create,
  deleteComment,
  findAll,
  findById,
};
