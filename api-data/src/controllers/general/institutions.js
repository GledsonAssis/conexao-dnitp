import HttpStatus from 'http-status-codes';
import Institution from '../../services/general/Institution';
import DnitUnit from '../../services/dnitUnit/DnitUnit';

import {
  dbErrorHandler, genericErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
  dbDeleteHandler,
  dbFileHandler,
  mapCSVFile,
} from '../../utils/http';

/**
 * Check institutions for deletion
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const canRemove = (req, res) => {
  const {
    params: {
      id,
    },
    currentUser,
  } = req;

  Institution.canRemove(id, currentUser)
    .then((data) => {
      res.status(data.code);
      return res.json(data);
    })
    .catch(dbErrorHandler(req, res));
};

/**
 * Create a Educational instituition
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */

const create = async (req, res) => {
  const {
    body,
  } = req;
  const {
    idDnit,
    address: {
      idCity,
    },
  } = body;

  if(!body.isDF) {
    const citiesDnitUnit = await DnitUnit.getDnitUnitCities(idDnit);
    const idCities = citiesDnitUnit.map((city) => city.dataValues.id);
    if (!idCities.includes(idCity)) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY);
      return res.json({
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'O CEP informado não consta na lista de municípios abrangidos pela unidade local selecionada.',
        message_token: 'malformed_payload_id',
      });
    }
  }
  return Institution.createInstituition(body)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Get Institution by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const getById = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  Institution.getById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * List all institutions by city id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findInstitutionsByCityId = (req, res) => {
  const {
    params: { idCity },
  } = req;

  Institution.findInstitutionsByIdCity(idCity)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const findInstitutionsByDnitUnit = (req, res) => {
  const {
    params: {
      dnitUnitId,
    },
  } = req;
  Institution.findInstituitionsByDnitUnitId(dnitUnitId)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const findByDnitUnitIds = (req, res) => {
  const {
    body: {
      dnitUnitIds,
      withAll = false,
    },
  } = req;

  return Institution.findByDnitUnitIds(dnitUnitIds)
    .then(data => {
      if (data.length > 1 && withAll) {
        let newRows = [{
          id: -1,
          name: "TODAS",
          idDnit: null
        }].concat(data);
        data = newRows;
      }
      return dbDataHandler(req, res)(data);
    })
    .catch(dbErrorHandler(req, res));
};

const deleteById = (req, res) => {
  const {
    params: { id },
    currentUser,
  } = req;

  Institution.deleteById(id, currentUser)
    .then((data) => {
      if (data.code === HttpStatus.UNPROCESSABLE_ENTITY) {
        res.status(data.code);
        return res.json(data);
      }

      return dbDeleteHandler(req, res)(data);
    })
    .catch(dbErrorHandler(req, res));
};

/**
 * search by Instituitions and download data in CSV format
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const downloadCSV = (req, res) => {
  const {
    query: {
      dnitUnitId,
      idTeachingNetwork,
      keyword,
      order: sort,
      searchDnit,
    },
  } = req;

  Institution.search({
    dnitUnitId,
    idTeachingNetwork,
    keyword,
    sort,
    limit: 0,
    searchDnit,
  })
    .then((data) => {
      if (data && data.count && data.count > 0) {
        return data.rows.map(row => row.dataValues);
      }
      return [];
    })
    .then(list => list.map(({
      id,
      name,
      quantidadeAlunos,
      quantidadeProfessores,
      dnitUnit: {
        dataValues: {
          identificacao: dnitUnit,
          RegionalSuperintendence,
        },
      },
      address: {
        cep,
        city: {
          name: cityName,
          state: UfCity,
        },
      },
      phones,
    }) => ({
      Id: id,
      Instituição: name,
      'Unidade Local': dnitUnit,
      'Superintendência Regional': RegionalSuperintendence && RegionalSuperintendence.dataValues
        ? RegionalSuperintendence.dataValues.identificacao
        : '',
      CEP: cep,
      Cidade: cityName,
      UF: UfCity ? UfCity.initials : null,
      Fones: phones ? phones.map(phone => (`(${phone.DDD}) ${phone.number}`)).join(', ') : null,
      "Quantidade de Alunos": quantidadeAlunos,
      "Quantidade de Professores": quantidadeProfessores,
    })))
    .then(file => mapCSVFile(file, 'lista_instituicoes'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

/**
 * Search a Local DNIT Unit
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const searchInstitution = (req, res) => {
  const {
    query: {
      dnitUnitId,
      idTeachingNetwork,
      keyword,
      limit,
      order: sort,
      page = 1,
      participaConexaoDnit,
      uf,
      searchDnit,
    },
  } = req;
  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  return Institution.search({
    dnitUnitId,
    idTeachingNetwork,
    keyword,
    searchDnit,
    limit: parseInt(limit, 10),
    offset,
    sort,
    participaConexaoDnit,
    uf,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Update a Educational instituition
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */

const update = async (req, res) => {
  const {
    body: {
      id,
      idInep,
      idTeachingNetwork,
      name,
      idDnit,
      idDnitUnitCity,
      address: {
        id: idAddress,
        cep,
        complement,
        district,
        number,
        street,
        idCity,
      },
      isDF,
      joinProgram,
      latitude,
      longitude,
      phones,
      quantidadeAlunos,
      quantidadeProfessores,
      studentsPerCycle,
    },
  } = req;

  if (!id) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY);
    return res.json({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Não foi possível atualizar o registro',
      message_token: 'malformed_payload_id',
    });
  }

  if (!isDF) {
    const citiesDnitUnit = await DnitUnit.getDnitUnitCities(idDnit);
    const idCities = citiesDnitUnit.map((city) => city.dataValues.id);
    if (!idCities.includes(idCity)) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY);
      return res.json({
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'O CEP informado não consta na lista de municípios abrangidos pela unidade local selecionada.',
        message_token: 'malformed_payload_id',
      });
    }
  }
  return Institution.updateInstituition({
    id,
    idAddress,
    idCity,
    idDnit,
    idDnitUnitCity,
    idInep,
    idTeachingNetwork,
    cep,
    complement,
    district,
    isDF,
    joinProgram,
    latitude,
    longitude,
    name,
    number,
    phones,
    street,
    quantidadeAlunos,
    quantidadeProfessores,
    studentsPerCycle,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const findCodeInep = (req, res) => {
  const {
    body: {
      codeInep,
    },
  } = req;

  return Institution.findCodeInep(codeInep)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};


export default {
  canRemove,
  create,
  deleteById,
  downloadCSV,
  findInstitutionsByCityId,
  findInstitutionsByDnitUnit,
  findByDnitUnitIds,
  getById,
  searchInstitution,
  update,
  findCodeInep,
};
