import {
  dbErrorHandler,
} from '../../middlewares';

import UserComment from '../../services/projectAction/UserComment';

import {
  dbDataHandler,
  dbDeleteHandler,
} from '../../utils/http';

/**
* Find all the project action comments by idProjectAction.
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  const {
    params: {
      idProjectAction,
    },
  } = req;

  UserComment.findAll(idProjectAction)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

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
* Delete a comment by id and idProjectAction
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const deleteComment = (req, res) => {
  const {
    params: {
      id,
      idProjectAction,
    },
  } = req;

  UserComment.deleteComment(id, idProjectAction)
    .then(dbDeleteHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  create,
  deleteComment,
  findAll,
};
