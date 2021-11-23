import KnowledgeObject from '../../services/general/KnowledgeObject';

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
* Create a KnowledgeObject from received payload
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const create = (req, res) => {
  const {
    body: {
      idDiscipline,
      idSchoolYear,
      description,
    },
  } = req;

  return KnowledgeObject.create({
    idDiscipline,
    idSchoolYear,
    description,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * search by KnowledgeObjects and download data in CSV format
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const downloadCSV = (req, res) => {
  const {
    query: {
      idDiscipline: disciplineId,
      keyword,
      limit,
      local,
      page = 1,
    },
  } = req;

  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  const payload = {
    idDiscipline: disciplineId,
    keyword,
    limit: parseInt(limit, 10),
    local,
    offset,
  };

  KnowledgeObject.search(payload)
    .then((data) => {
      if (data && data.count && data.count > 0) {
        return data.rows.map(row => row.dataValues);
      }
      return [];
    })
    .then(list => list.map(({
      id,
      description,
      discipline: {
        name,
        knowledgeArea: {
          description: knowledgeAreaDescription,
        },
      },
      idSchoolYear: year,
    }) => ({
      Id: id,
      Ano: year,
      'Área de conhecimento': knowledgeAreaDescription,
      Disciplina: name,
      'Objetos de conhecimento': description,
    })))
    .then(file => mapCSVFile(file, 'lista_objecto_conhecimento'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

/**
* Find all the Disciplines Subjects
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  KnowledgeObject.findAll()
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find the Discipline Subjects by id
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

  KnowledgeObject.findById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Delete a KnowledgeObject by id
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const remove = (req, res) => {
  const {
    params: { id },
  } = req;
  KnowledgeObject.remove(id)
    .then(dbDeleteHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find all the KnowledgeObjects
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const search = (req, res) => {
  const {
    query: {
      idDiscipline,
      idSchoolYear,
      keyword,
      limit,
      local,
      order,
      page = 1,
    },
  } = req;

  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  const payload = {
    idDiscipline: idDiscipline ? idDiscipline.split(',') : undefined,
    idSchoolYear: idSchoolYear ? idSchoolYear.split(',') : undefined,
    keyword,
    limit: parseInt(limit, 10),
    local,
    offset,
    order,
  };

  return KnowledgeObject.search(payload)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Update a KnowledgeObject with the received payload
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const update = (req, res) => {
  const {
    body: {
      id,
      idDiscipline,
      idSchoolYear,
      description,
    },
  } = req;
  KnowledgeObject.updateKnowledgeObject({
    id,
    idDiscipline,
    idSchoolYear,
    description,
  })
    .then(() => KnowledgeObject.findById(id))
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  create,
  downloadCSV,
  findAll,
  findById,
  remove,
  search,
  update,
};
