import {
  dbErrorHandler,
} from '../../middlewares';

import UserComment from '../../services/project/UserComment';

import {
  dbDataHandler,
  dbDeleteHandler,
} from '../../utils/http';

/**
* Find all the UserComments by projectId
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  const {
    params: {
      id: idProject,
    },
  } = req;

  UserComment.findAll(idProject)
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
* Delete a comment by its id and idProject
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const deleteComment = (req, res) => {
  const {
    params: {
      id,
      idProject,
    },
  } = req;
  UserComment.deleteComment(id, idProject)
    .then(dbDeleteHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Update a comment
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const update = (req, res) => {
  const {
    params: {
      id,
      idProject,
    },
    body: {
      comment,
    },
  } = req;

  UserComment.update(id, idProject, comment)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  create,
  deleteComment,
  findAll,
  update,
};
