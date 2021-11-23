import {
  dbErrorHandler,
  genericErrorHandler,
} from '../../middlewares';


import Project from '../../services/project/Project';

import coverListParser from '../../utils/parsers/coverList';

import {
  dbDataHandler,
  dbDeleteHandler,
  dbFileHandler,
  mapCSVFile,
} from '../../utils/http';

/**
 * Create new Project
 *
 * @param {object} req : {
 *   body: {
 *      description: String,
        endDate: Date,
        isCover: Boolean,
        isPublished: Boolean,
        summary: String,
        title: String"
      }
  }
 * @returns {*}
 */
const create = (req, res) => {
  const {
    body,
    currentUser,
  } = req;

  Project.create({ ...body, idUser: currentUser.id })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Delete a Project
 *
 * @param {object} req
 * @returns {affected rows}
 */
const deleteProject = (req, res) => {
  const {
    params: {
      idProject,
    },
  } = req;

  Project.deleteProject(idProject)
    .then(dbDeleteHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * search by Projects and download data in CSV format
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

  return Project.search({
    keyword,
    order,
  })
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
      'T�tulo': title,
    })))
    .then(file => mapCSVFile(file, 'lista_projetos'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

/**
 * Find all the Projects
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findAll = (req, res) => {
  const { currentUser } = req;

  Project.findAll(currentUser)
    .then(coverListParser)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 *  Find Project by id
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

  Project.findById(id, currentUser)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Find all the Projects
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
      order,
      page = 1,
      keyword,
    },
  } = req;
  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  return Project.search({
    keyword,
    limit: parseInt(limit, 10),
    offset,
    order,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 *  publish Project by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const publish = (req, res) => Project.publish(req.body)
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
 *  Update Project by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const update = (req, res) => Project.update(req.body)
  .then(dbDataHandler(req, res))
  .catch(dbErrorHandler(req, res));


export default {
  create,
  deleteProject,
  downloadCSV,
  findAll,
  findById,
  publish,
  search,
  update,
};
