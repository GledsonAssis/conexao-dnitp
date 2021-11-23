import HighlightItem from '../../services/highlight/Highlight';

import {
  dbErrorHandler,
  genericErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
  dbFileHandler,
  mapCSVFile,
} from '../../utils/http';


/**
 * search by Actions and download data in CSV format
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const downloadCSV = (req, res) => HighlightItem.findAll()
  .then((data) => {
    if (data && data.count && data.count > 0) {
      return data.rows.map(row => row.dataValues);
    }
    return [];
  })
  .then(list => list.sort((cur, next) => cur.position - next.position))
  .then((list) => {
    const orderList = list.filter(item => item.position);
    orderList.push(...list.filter(item => !item.position));
    return orderList;
  })
  .then(file => mapCSVFile(file, 'lista_cursos'))
  .then(dbFileHandler(req, res))
  .catch(error => genericErrorHandler(error, req, res));


/**
 * List all Highlights
 *
 * @returns {*}
 */
const findAll = (req, res) => {
  const {
    currentUser,
  } = req;

  HighlightItem.findHighlights(currentUser)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * List all Highlights for cms
 *
 * @returns {*}
 */
const listHighlightItems = (req, res) => {
  const {
    query,
  } = req;

  return HighlightItem.search(query)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Update Highlights
 *
 * @returns {*}
 */
const updateHighlightItems = (req, res) => {
  const {
    body,
  } = req;

  HighlightItem.updateHighlightItems(body)
    .then(() => HighlightItem.findAll())
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const listHighlightTypes = (req, res) => {
  HighlightItem.listHighlightTypes()
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  downloadCSV,
  findAll,
  listHighlightItems,
  updateHighlightItems,
  listHighlightTypes,
};
