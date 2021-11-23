import {
  dbErrorHandler,
  genericErrorHandler,
} from '../../middlewares';

import ExternalLink from '../../services/externalLinks/ExternalLinks';

import coverListParser from '../../utils/parsers/coverList';
import {
  dbDataHandler,
  dbDeleteHandler,
  dbFileHandler,
  mapCSVFile,
} from '../../utils/http';

/**
 * Create new ExternalLink
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const create = (req, res) => {
  const {
    body: {
      description,
      isCover,
      summary,
      title,
      link,
    },
  } = req;

  ExternalLink.createExternalLink({
    description,
    isCover,
    summary,
    title,
    link,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const deleteExternalLink = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  ExternalLink.deleteExternalLink(id)
    .then(dbDeleteHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * search by ExternalLinks and download data in CSV format
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const downloadCSV = (req, res) => {
  const {
    query: {
      keyword,
      order,
    },
  } = req;

  return ExternalLink.search({ keyword, order })
    .then(data => ((data && data.count && data.count > 0) ? data.rows.map(row => row.dataValues) : []))
    .then(list => list.map(({
      id,
      description,
      summary,
      title,
    }) => ({
      id,
      título: title,
      sumário: summary,
      descrição: description,
    })))
    .then(file => mapCSVFile(file, 'lista_links_externos'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

/**
 * Find all ExternalLinks
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findAll = (req, res) => {
  ExternalLink.findAll()
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 *  Find ExternalLink by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findById = (req, res) => {
  const {
    params: { id },
  } = req;

  ExternalLink.findById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 *  publish Action by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const publish = (req, res) => ExternalLink.publish(req.body)
  .then((data) => {
    if (data && data.code === 422) {
      res.status(data.code)
        .json(data);
    } else {
      return dbDataHandler(req, res)(data);
    }
  })
  .catch(dbErrorHandler(req, res));

/**
 * Find all the ExternalLinks
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const search = (req, res) => {
  const {
    query: {
      keyword,
      limit = 0,
      order,
      page = 1,
    },
  } = req;
  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  return ExternalLink.search({
    keyword,
    limit: parseInt(limit, 10),
    offset,
    order,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 *  Update ExternalLink by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const update = (req, res) => {
  const {
    body,
  } = req;

  ExternalLink.updateExternalLink(body)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  create,
  deleteExternalLink,
  downloadCSV,
  findAll,
  findById,
  publish,
  search,
  update,
};
