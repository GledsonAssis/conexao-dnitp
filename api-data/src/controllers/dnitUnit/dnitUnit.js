import HttpStatus from 'http-status-codes';
import DnitUnit from '../../services/dnitUnit/DnitUnit';

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
 * Chech if a DNIT Unit can be removed
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

  DnitUnit.canRemove(id, currentUser)
    .then((data) => {
      res.status(data.code);
      return res.json(data);
    })
    .catch(dbErrorHandler(req, res));
};

/**
 * Delete a DNIT Unit
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
    currentUser,
  } = req;

  DnitUnit.remove(id, currentUser)
    .then((data) => {
      if ((typeof data === 'object') && !data.status) {
        res.status(data.code);
        return res.json(data);
      }

      return dbDeleteHandler(req, res)(data);
    })
    .catch(dbErrorHandler(req, res));
};

/**
 * Create a DNIT Unit
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const create = (req, res) => {
  const {
    body,
  } = req;

  if (body.roads === null) { body.roads = []; }

  return DnitUnit.create(body)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Create a DNIT Unit linked to a superintendence
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */

const createLocalunit = (req, res) => {
  const {
    body,
  } = req;

  if (body.idRegionalSuperintendence && body.UF) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY);
    return res.json({ message_token: 'malformed_payload_uf_regional' });
  }

  if (!body.idRegionalSuperintendence) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY);
    return res.json({ message_token: 'malformed_payload_superintendence' });
  }

  if (!body.cities) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY);
    return res.json({ message_token: 'malformed_payload_cities' });
  }

  if (!body.roads) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY);
    return res.json({ message_token: 'malformed_payload_roads' });
  }

  return DnitUnit.create(body)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * search by DNIT Unit and download data in CSV format
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const downloadCSV = (req, res) => {
  const {
    query,
    query: {
      local,
    },
  } = req;

  DnitUnit.search(query)
    .then((data) => {
      if (data && data.count && data.count > 0) {
        return data.rows.map(row => row.dataValues);
      }
      return [];
    })
    .then(list => list.map(({
      id,
      identification,
      address: {
        cep,
        street,
        city: {
          name: cityName,
          state: UfCity,
        },
      },
      RegionalSuperintendence,
      phones,
      cities,
    }) => {
      const defaultColumns = {      
        CEP: cep || '',
        Cidade: cityName || '',
        Fones: phones.length > 0 ? [(phones[0] ? `(${phones[0].DDD}) ${phones[0].number}` : ''),
        (phones[1] ? `(${phones[1].DDD}) ${phones[1].number}` : '')] : '',
        Endereço: street || '',
        Uf: UfCity ? UfCity.initials : '',
      }
      
      if(local) {
        return {
          id,        
          'Unidade Local': identification,
          ...defaultColumns,
          'Superintendência Regional': RegionalSuperintendence.identification || '',
          'Municípios Abrangência': cities.length > 0 ? cities.map(c => `${c.name}`) : '',
        };
      }

      return {
        id,        
        'Superintendência Regional': identification,
        ...defaultColumns,
      };
    }))
    .then(file => mapCSVFile(file, `${local ? 'lista_unidades_locais' : 'superintendências_regionais'}`))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

const getAllUsers = (req, res) => {
  const { query: { id } } = req;

  return DnitUnit.getAllUsers(id)
    .then(dbDataHandler(req, res));
};

const getDnitUnitCities = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  return DnitUnit.getDnitUnitCities(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};


const findAllDnitUnitByCities = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  return DnitUnit.findAllDnitUnitByCities(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * List all DNIT Units
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findAll = (req, res) => DnitUnit.findAllUnits(req.body)
  .then(dbDataHandler(req, res))
  .catch(dbErrorHandler(req, res));

/**
* Find the Dnit Unit by id
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

  DnitUnit.findById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * search by a DNIT Unit
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
      local,
      order,
      page = 1,
      withAll = false
    },
  } = req;

  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  const payload = {
    keyword,
    limit: parseInt(limit, 10),
    local,
    offset,
    order,
  };


  DnitUnit.search(payload)
    .then(data => {

      if (withAll) {
        let newRows = [{
          "id": -1,
          "addressId": null,
          "UFId": null,
          "idRegionalSuperintendence": null,
          "email": null,
          "identification": "TODAS",
          "address": null,
          "phones": null,
          "RegionalSuperintendence": {
            "id": -1,
            "identification": "TODAS"
          },
          "UF": null,
          "cities": null
        }].concat(data.rows);
        data.rows = newRows;
      }
      return dbDataHandler(req, res)(data);
    }
    )
    .catch(dbErrorHandler(req, res));
};

const findAllCMS = (req, res) => {
  const {
    query: {
      idRegionalSuperintendence,
      isLocalUnit,
    },
    currentUser,
  } = req;

  const payload = {
    idRegionalSuperintendence,
    isLocalUnit,
    currentUser,
  };

  DnitUnit.findAllCMS(payload)
    .then(data => dbDataHandler(req, res)(data))
    .catch(dbErrorHandler(req, res));
};

const findAllRegionalSuperintendence = (req, res) => {
  const {
    query: {
      limit,
      order,
      page = 1,
      withAll = false,
    },
    currentUser,
  } = req;
  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  return DnitUnit.findAllRegionalSuperintendence({ limit: parseInt(limit, 10), offset, order }, currentUser)
    .then(data => {
      if (data.rows.length > 1 && withAll) {
        let newRows = [{
          "id": -1,
          "addressId": null,
          "UFId": null,
          "idRegionalSuperintendence": null,
          "email": null,
          "identification": "TODAS",
          "address": null,
          "phones": null,
          "RegionalSuperintendence": {
            "id": -1,
            "identification": "TODAS"
          },
          "UF": null,
          "cities": null
        }].concat(data.rows);
        data.rows = newRows;
      }
      return dbDataHandler(req, res)(data);
    })
    .catch(dbErrorHandler(req, res));
};

/**
 * Update a DNIT Unit
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

  if (body.roads === null) { body.roads = []; }

  if (!body.id) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY);
    return res.json({ message_token: 'malformed_payload' });
  }

  if (body.idRegionalSuperintendence && (body.UF && body.UF.id)) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY);
    return res.json({ message_token: 'malformed_payload_uf_regional' });
  }

  return DnitUnit.update(body)
    .then((data) => {
      if (data.code === HttpStatus.UNPROCESSABLE_ENTITY) {
        res.status(data.code);
        return res.json(data);
      }
      return dbDataHandler(req, res)(data);
    })
    .catch(dbErrorHandler(req, res));
};

/**
 * Search a Local DNIT Unit
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const searchLocalUnit = (req, res) => {
  const {
    query,
    query: {
      idRegionalSuperintendence,
      keyword,
      limit,
      order,
      ...rest
    },
  } = req;
  let {
    body: {
      page,
    },
  } = req;

  page = page > 0
    ? page -= 1
    : 0;

  const payload = {
    ...rest,
    idRegionalSuperintendences: [idRegionalSuperintendence],
    keyword,
    limit,
    local: true,
    offset: page * limit,
  };

  if (!idRegionalSuperintendence) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY);
    return res.json({ message_token: 'malformed_payload_superintendence' });
  }

  return DnitUnit.search(payload)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const findBySuperintendences = (req, res) => {
  const {
    body: {
      limit,
      order,
      page = 1,
      idRegionalSuperintendences,
      keyword,
      withAll = false
    },
  } = req;

  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  return DnitUnit.search({
    limit: parseInt(limit, 10),
    local: true,
    idRegionalSuperintendences,
    offset,
    order,
    keyword,
  })
    .then(({ count, rows }) => ({
      count,
      rows: rows.map((el) => {
        const result = el.get({ plain: true });
        return ({
          ...result,
          cities: result.cities.map(city => city.id),
        });
      }),
    }))
    .then(data => {
      if (withAll) {
        let newRows = [{
          "id": -1,
          "addressId": null,
          "UFId": null,
          "idRegionalSuperintendence": null,
          "email": null,
          "identification": "TODAS",
          "address": null,
          "phones": null,
          "RegionalSuperintendence": {
            "id": -1,
            "identification": "TODAS"
          },
          "UF": null,
          "cities": null
        }].concat(data.rows);
        data.rows = newRows;
      }
      return dbDataHandler(req, res)(data);
    })
    .catch(dbErrorHandler(req, res));
};

const findAllLocalUnits = (req, res) => {
  const {
    query: {
      limit,
      order,
      page = 1,
      idRegionalSuperintendence,
      keyword,
      superintendencesIds,
      withAll = false,
    },
    currentUser,
  } = req;

  const offset = parseInt(page, 10) > 0
    ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
    : 0;

  return DnitUnit.search({
    limit: parseInt(limit, 10),
    local: true,
    idRegionalSuperintendences: idRegionalSuperintendence ? [idRegionalSuperintendence] : superintendencesIds ? JSON.parse(superintendencesIds) : [],
    offset,
    order,
    keyword,
  }, currentUser, true)
    .then(({ count, rows }) => {
      let newRows = rows;

      if(count > 1 && withAll) {
        newRows = [{
          "id": -1,
          "addressId": null,
          "UFId": null,
          "idRegionalSuperintendence": null,
          "email": null,
          "identification": "TODAS",
          "address": null,
          "phones": null,
          "RegionalSuperintendence": {
            "id": -1,
            "identification": "TODAS"
          },
          "UF": null,
          "cities": null
        }].concat(rows);
      }

      return ({
      count,
      rows: newRows.map((el) => {
        if(!el.get) {
          return el;
        }

        const result = el.get({ plain: true });
        return ({
          ...result,
          cities: result.cities.map(city => city.id),
        });
      }),
    })})
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Update a Local DNIT Unit
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const updatelocalUnit = (req, res) => {
  const {
    body,
  } = req;
  if (!body.id) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY);
    return res.json({ message_token: 'malformed_payload' });
  }

  if (!body.idRegionalSuperintendence || (
    body.idRegionalSuperintendence && body.UF && body.UF.id
  )) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY);
    return res.json({ message_token: 'malformed_payload_superintendence' });
  }

  return DnitUnit.update(body)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  canRemove,
  create,
  createLocalunit,
  downloadCSV,
  findAll,
  findAllCMS,
  findAllLocalUnits,
  findAllRegionalSuperintendence,
  findBySuperintendences,
  findById,
  getAllUsers,
  getDnitUnitCities,
  findAllDnitUnitByCities,
  remove,
  search,
  searchLocalUnit,
  update,
  updatelocalUnit,
};
