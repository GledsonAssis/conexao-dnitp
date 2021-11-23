import SchoolYear from '../../services/general/SchoolYear';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
} from '../../utils/http';

/**
* Find all the ActionAttachments by trainingId
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  SchoolYear.findAll()
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find the ActionAttachment by id
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

  SchoolYear.findById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  findAll,
  findById,
};
