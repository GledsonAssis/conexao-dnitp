import HttpStatus from 'http-status-codes';
import TrafficConcept from '../../services/general/TrafficConcept';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
  dbFileHandler,
  mapCSVFile,
  dbDeleteHandler,
} from '../../utils/http';

/**
* Create a TrafficConcept with the received payload
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const create = (req, res) => {
  const {
    body: {
      idSchoolYear,
      description,
    },
  } = req;
  TrafficConcept.createTrafficConcept({
    idSchoolYear,
    description,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find all the TrafficConcept
* and download the list in CSV
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const download = (req, res) => {
  const {
    query: {
      idSchoolYear,
      keyword,
      order,
    },
  } = req;

  TrafficConcept.search({
    idSchoolYear,
    keyword,
    order,
  })
    .then(list => list.rows.map(({
      id,
      description,
      schoolYear: {
        ordinal: Ano,
        subTheme: {
          name: subtheme,
          theme: {
            name: theme,
          },
        },
      },
    }) => ({
      id,
      Ano,
      Descrição: description,
      Tema: theme,
      'Sub Tema': subtheme,
    })))
    .then(file => mapCSVFile(file, 'lista_conceito_transito'))
    .then(dbFileHandler(req, res))
    .catch(dbErrorHandler(req, res));
};


/**
* Find all the TrafficConcept
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  TrafficConcept.findAll()
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find the TrafficConcept by id
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

  TrafficConcept.findById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find all the TrafficConcept paginated
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAllCMS = (req, res) => {
  const {
    query: {
      idSchoolYear,
      keyword,
      limit,
      order,
      page,
    },
  } = req;

  TrafficConcept.search({
    idSchoolYear,
    keyword,
    limit: parseInt(limit, 10),
    order,
    page: parseInt(page, 10),
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Delete a TrafficConcept from database
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const remove = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  return TrafficConcept.remove(id)
    .then(dbDeleteHandler(req, res))
    .catch((error) => {
      const err = {
        ...error,
        code: HttpStatus.UNPROCESSABLE_ENTITY,
      };
      res.status(HttpStatus.UNPROCESSABLE_ENTITY);
      res.json(err);
    });
};

/**
* Update a TrafficConcept with the sended payload
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const update = (req, res) => {
  const {
    body: {
      id,
      idSchoolYear,
      description,
    },
  } = req;
  TrafficConcept.updateTrafficConcept({
    id,
    idSchoolYear,
    description,
  })
    .then(() => TrafficConcept.findById(id))
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  create,
  download,
  findAll,
  findAllCMS,
  findById,
  remove,
  update,
};
