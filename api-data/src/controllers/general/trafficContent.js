import HttpStatus from "http-status-codes";
import TrafficContent from "../../services/general/TrafficContent";

import { dbErrorHandler } from "../../middlewares";

import {
  dbDataHandler,
  mapCSVFile,
  dbFileHandler,
  dbDeleteHandler,
} from "../../utils/http";
import updateTrafficContentErrorHandler from "../../middlewares/errors/updateTrafficContentErrorHandler";

/**
 * Create a TrafficContent with the received payload
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const create = (req, res) => {
  const {
    body: { idTransitConcept, description, trafficScope },
  } = req;

  return TrafficContent.createTrafficContent({
    idTransitConcept,
    description,
    trafficScope,
  })
    .then((id) => TrafficContent.findById(id))
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Find all the TrafficContent
 * and download the list in CSV
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const download = (req, res) => {
  const {
    query: { idTransitConcept, keyword, order },
  } = req;

  TrafficContent.search({
    idTransitConcept,
    keyword,
    order,
  })
    .then((list) =>
      list.rows.map((item) => {
        const {
          id,
          trafficConcept: { description: TransitConcept, idSchoolYear },
          description,
        } = item;

        return {
          id,
          Ano: idSchoolYear,
          "Conteúdo de Trânsito": description,
          "Conceito de Transito": TransitConcept,
        };
      })
    )
    .then((file) => mapCSVFile(file, "lista_conteudo_transito"))
    .then(dbFileHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Find all the TrafficContent
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const findAll = (req, res) => {
  const {
    query: { idTransitConcept, idSchoolYear, keyword, limit, order, page },
  } = req;

  TrafficContent.search({
    idTransitConcept: idTransitConcept
      ? idTransitConcept.split(",")
      : undefined,
    idSchoolYear: idSchoolYear ? idSchoolYear.split(",") : undefined,
    keyword,
    limit: parseInt(limit, 10),
    order,
    page: parseInt(page, 10),
  })
    .then((res) => res.rows)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Find the TrafficContent by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const findById = (req, res) => {
  const {
    params: { id },
  } = req;

  TrafficContent.findById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Find all the TrafficContent paginated
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const findAllCMS = (req, res) => {
  const {
    query: { idTransitConcept, idSchoolYear, keyword, limit, order, page },
  } = req;

  TrafficContent.search({
    idTransitConcept: idTransitConcept
      ? idTransitConcept.toString().split(",")
      : undefined,
    idSchoolYear: idSchoolYear ? idSchoolYear.toString().split(",") : undefined,
    keyword,
    limit: parseInt(limit, 10),
    order,
    page: parseInt(page, 10),
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Delete a TrafficContent from database
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const remove = (req, res) => {
  const {
    params: { id },
  } = req;

  return TrafficContent.remove(id)
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
 * Update a TrafficContent with the received payload
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const update = (req, res) => {
  const {
    body: { id, idTransitConcept, description, trafficScope },
  } = req;

  TrafficContent.updateTrafficContent({
    id,
    idTransitConcept,
    description,
    trafficScope,
  })
    .then(() => TrafficContent.findById(id))
    .then(dbDataHandler(req, res))
    .catch(updateTrafficContentErrorHandler(req, res))
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
