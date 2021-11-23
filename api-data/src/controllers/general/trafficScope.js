import TrafficScope from '../../services/general/TrafficScope';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
} from '../../utils/http';

/**
* Find all the TrafficScope
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  TrafficScope.findAll()
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find the TrafficScope by id
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

  TrafficScope.findById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Search by a TrafficScope
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const search = (req, res) => {
  const {
    query: {
      idTrafficContent,
      limit,
      page = 1,
      keyword,
    },
  } = req;
  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  TrafficScope.search({
    idTrafficContent,
    limit: parseInt(limit, 10),
    offset,
    keyword,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  findAll,
  findById,
  search,
};
