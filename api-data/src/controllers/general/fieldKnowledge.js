import FieldKnowledge from '../../services/general/FieldKnowledge';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
} from '../../utils/http';

/**
* Find all the FieldKnowledge's
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  FieldKnowledge.findAll()
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find the FieldKnowledge by id
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

  FieldKnowledge.findById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  findAll,
  findById,
};
