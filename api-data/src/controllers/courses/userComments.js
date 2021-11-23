import {
  dbErrorHandler,
} from '../../middlewares';

import UserComment from '../../services/course/UserComment';

import {
  dbDataHandler,
  dbDeleteHandler,
} from '../../utils/http';

/**
* Find all the UserComments by courseId*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  const {
    params: {
      id: idCourse,
    },
  } = req;

  UserComment.findAll(idCourse)
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
* Delete a comment by its id and idCourse
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const deleteComment = (req, res) => {
  const {
    params: {
      id,
      idCourse,
    },
  } = req;

  UserComment.deleteComment(id, idCourse).then(
    dbDeleteHandler(req, res),
  ).catch(
    dbErrorHandler(req, res),
  );
};

export default {
  create,
  deleteComment,
  findAll,
};
