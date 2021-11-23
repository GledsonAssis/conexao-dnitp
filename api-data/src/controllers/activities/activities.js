import Activity from '../../services/activity/Activity';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
  dbFileHandler,
  mapCSVFile,
  dbDeleteHandler,
} from '../../utils/http';

import activityProcedureParser from '../../utils/parsers/activityProcedureParser';


/**
 * Create a Activities with received payload
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const create = (req, res) => {
  const {
    body: {
      idConcept,
      idDiscipline,
      idInitiative,
      code,
      duration,
      evaluation,
      isPublished,
      knowledgeObject,
      otherConnections,
      reference,
      resource,
      skills,
      teachingArticulation,
      teachingGuide,
      title,
      trafficContent,
      trafficScope,
    },
    currentUser: {
      id: idUser,
    },
  } = req;

  Activity.create({
    idConcept,
    idDiscipline,
    idInitiative,
    code,
    duration,
    evaluation,
    isPublished,
    knowledgeObject,
    otherConnections,
    reference,
    resource,
    skills,
    teachingArticulation,
    teachingGuide,
    title,
    trafficContent,
    trafficScope,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find all the Activities
* and download the list in CSV
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const download = (req, res) => {
  const {
    query: {
      keyword,
      limit = 0,
      order,
      page = 1,
    },
  } = req;

  const payload = {
    keyword,
    limit: parseInt(limit, 10),
    order,
    page: parseInt(page, 10),
  };
  return Activity.cmsDownload(payload)
  .then(file => mapCSVFile(file, 'lista_atividades'))
  .then(dbFileHandler(req, res))
  .catch(dbErrorHandler(req, res));
};

/**
 * Find all the Activities
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findAll = (req, res) => {
  Activity.findAll()
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 *  Find Activity by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findById = (req, res) => {
  const {
    params: { id },
    currentUser: { id: idUser },
  } = req;

  Activity.findById({ id, idUser })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Delete a Activity by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const remove = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  Activity.remove(id)
    .then(dbDeleteHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Update Situation a Activity by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const publish = (req, res) => Activity.publish(req.body)
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
 * Search Activities
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const search = (req, res) => {
  const {
    body: searchParams,
  } = req;

  Activity.search(searchParams)
    .then(resultSet => resultSet.map(activityProcedureParser))
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};
const findAllYear = (req, res) => {
  Activity.findAllYear()
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};
/**
 * Search Activities for CMS list
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const cmsSearch = (req, res) => {
  const {
    query: {
      keyword,
      limit = 0,
      order,
      page = 1,
    },
  } = req;

  const payload = {
    keyword,
    limit: parseInt(limit, 10),
    order,
    page: parseInt(page, 10),
  };

  Activity.cmsSearch(payload)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Update some Activities with received payload
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const update = (req, res) => {
  const {
    body: {
      id,
      idConcept,
      idDiscipline,
      idInitiative,
      code,
      duration,
      evaluation,
      isPublished,
      otherConnections,
      reference,
      resource,
      teachingGuide,
      teachingArticulation,
      title,
      knowledgeObject,
      trafficScope,
      trafficContent,
      skills,
    },
    currentUser: {
      id: idUser,
    },
  } = req;

  Activity.update({
    id,
    idConcept,
    idDiscipline,
    idInitiative,
    code,
    duration,
    evaluation,
    isPublished,
    otherConnections,
    reference,
    resource,
    teachingGuide,
    teachingArticulation,
    title,
    knowledgeObject,
    trafficScope,
    trafficContent,
    skills,
  })
    .then(() => Activity.findById({ id, idUser }))
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  create,
  cmsSearch,
  download,
  findAll,
  findAllYear,
  findById,
  remove,
  search,
  update,
  publish,
};
