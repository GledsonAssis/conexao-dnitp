import Discipline from '../../services/general/Discipline';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
  dbFileHandler,
} from '../../utils/http';

/**
* Find all the Disciplines
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  const {
    query: {
      idKnoledgeArea,
      year: schoolYear,
      keyword,
      limit,
      page = 1,
      local,
    },
  } = req;

  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  const payload = {
    idKnoledgeArea,
    keyword,
    limit: parseInt(limit, 10),
    offset,
    local,
    schoolYear,
  };

  Discipline.findAll(payload)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find the Discipline by id
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

  Discipline.findById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const findIconByDisciplineId = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  Discipline.findIconByDisciplineId(id)
    .then(dbFileHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  findAll,
  findIconByDisciplineId,
  findById,
};
