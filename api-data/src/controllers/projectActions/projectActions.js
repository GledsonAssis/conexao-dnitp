import ProjectAction from '../../services/projectAction/ProjectAction';

import {
  dbErrorHandler,
  genericErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
  dbDeleteHandler,
  dbFileHandler,
  mapCSVFile,
} from '../../utils/http';


/**
 * Create new Project Action
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const create = (req, res) => {
  const {
    body: {
      idProject,
      date = new Date(),
      description,
      endDate,
      excludedDate = null,
      isCover = false,
      isPublished = false,
      summary,
      title,
    },
    currentUser: {
      id: idUser,
    },
  } = req;

  ProjectAction.createAction({
    idProject,
    idUser,
    date,
    description,
    endDate,
    excludedDate,
    isCover,
    isPublished,
    summary,
    title,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const deleteAction = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  ProjectAction.deleteAction(id)
    .then(dbDeleteHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * search by Project Actions and download data in CSV format
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

  return ProjectAction.search({
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
      description,
      summary,
      title,
    }) => ({
      Id: id,
      Título: title,
      Resumo: summary,
      Descrição: description,
    })))
    .then(file => mapCSVFile(file, 'lista_acoes'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

/**
* Find all the Project Actions by idProject
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  const {
    params: {
      idProject,
    },
    currentUser,
  } = req;

  ProjectAction.findAll(idProject, currentUser)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find the ProjectAction by id
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

  ProjectAction.findById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};


/**
 *  publish Project Action by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const publish = (req, res) => ProjectAction.publish(req.body)
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
 * Find all the Project Actions
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
      limit,
      order,
      page = 1,
    },
  } = req;
  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  return ProjectAction.search({
    keyword,
    limit: parseInt(limit, 10),
    offset,
    order,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 *  Update Project Action by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const update = (req, res) => {
  const {
    body: action,
  } = req;

  ProjectAction.updateAction(action)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  create,
  deleteAction,
  downloadCSV,
  findAll,
  findById,
  publish,
  search,
  update,
};
