import HttpStatus from 'http-status-codes';
import sequelize from 'sequelize';
import {
  dbErrorHandler,
  genericErrorHandler,
} from '../../middlewares';

import Course from '../../services/course/Course';

import coverListParser from '../../utils/parsers/coverList';

import {
  dbDataHandler,
  dbDeleteHandler,
  dbFileHandler,
  mapCSVFile,
} from '../../utils/http';

/**
 * Create new Course
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const create = (req, res) => {
  const { body, currentUser } = req;

  Course.create(body, currentUser.id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const deleteCourse = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  Course.deleteCourse(id)
    .then(dbDeleteHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * search by Actions and download data in CSV format
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

  return Course.search({ keyword, order })
    .then((data) => {
      if (data && data.count && data.count > 0) {
        return data.rows.map(row => row.dataValues);
      }
      return [];
    })
    .then(list => list.map(({
      id,
      title,
    }) => ({
      Id: id,
      Titulo: title,
    })))
    .then(file => mapCSVFile(file, 'lista_cursos'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

/**
 * Find all the Courses
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findAll = (req, res) => {
  const { currentUser } = req;

  Course.findAll(currentUser)
    .then(coverListParser)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 *  Find Course by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findById = (req, res) => {
  const {
    currentUser,
    params: { id },
  } = req;
  Course.findById(id, currentUser)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 *  publish Course by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const publish = (req, res) => Course.publish(req.body)
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
 * Search the Courses
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const search = (req, res) => {
  const {
    query: {
      limit,
      order: sort,
      page = 1,
      keyword,
    },
  } = req;
  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  const fields = (sort || '').split(',');
  const sufix = (fields[1] && fields[1] !== '0') ? fields[1] : 'asc';
  const order = (fields[0] && fields[1] !== '0') ? [[sequelize.literal(fields[0]), sufix]] : [['id', 'asc']];

  return Course.search({
    keyword,
    limit: parseInt(limit, 10),
    offset,
    order,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 *  Update Course by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const update = (req, res) => Course.update(req.body)
  .then(dbDataHandler(req, res))
  .catch(dbErrorHandler(req, res));

export default {
  create,
  deleteCourse,
  downloadCSV,
  findAll,
  findById,
  publish,
  search,
  update,
};
