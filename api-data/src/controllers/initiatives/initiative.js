import sequelize from 'sequelize';
import {
  dbErrorHandler,
  genericErrorHandler,
} from '../../middlewares';
import {
  dbDataHandler,
  dbFileHandler,
  mapCSVFile,
} from '../../utils/http';

import Initiative from '../../services/initiative/Initiative';
import Status from '../../services/initiative/Status';
import SendMail from '../../services/sendmail';
import DnitUnit from '../../services/dnitUnit/DnitUnit';

import UserService from '../../services/user/User';

const USER_ROLE_EVALUATOR_HIGHER = 4;

const orderFormat = (sort) => {
  const order = [];
  const fields = (sort || '').split(',');

  if (fields[1] === '0') order.push(['date', 'ASC']);
  else {
    switch (fields[0]) {
      case 'author':
        if (fields[1] !== '0') {
          order.push([sequelize.literal('[author.name]'), fields[1]]);
        }
        break;
      case 'instituition':
        if (fields[1] !== '0') {
          order.push([
            sequelize.literal('[author.instituitions.name]'),
            fields[1],
          ]);
        }
        break;
      case 'city':
        if (fields[1] !== '0') {
          order.push([
            sequelize.literal('[author->city].[nome]'),
            fields[1],
          ]);
        }
        break;
      case 'uf':
        if (fields[1] !== '0') {
          order.push([
            sequelize.literal('[author->city->state].sigla'),
            fields[1],
          ]);
        }
        break;
      case 'title':
        if (fields[1] !== '0') {
          order.push([sequelize.literal('[title]'), fields[1]]);
        }
        break;
      case 'state':
        if (fields[1] !== '0') {
          order.push([sequelize.literal('[status.name]'), fields[1]]);
        }
        break;
      default:
        order.push(['date', 'ASC']);
        break;
    }
  }
  return order;
};

/**
 * Create new Initiative
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const create = async (req, res) => {
  const { body, currentUser } = req;

  // const gestor = await DnitUnit.getGestorOpLocal(currentUser.idDnitUnit);
  // const emails = gestor.map(el => el.email).join(';');
  // const nomes = gestor.map(el => el.nome).join(',');
  //
  // const remetente = await UserService.findById(currentUser.id);

  Initiative.create(body, currentUser)
    .then(dbDataHandler(req, res))
    // .then(() => {
    //   const message = {
    //     destinatarios: [
    //       emails,
    //     ],
    //     assunto: `Avaliação da iniciativa: ${body.title}`,
    //     gestores: nomes,
    //     name: remetente.name,
    //     title: body.title,
    //     template: 'iniciativa',
    //   };
    //
    //   SendMail.sendMail(message);
    // })
    .catch(dbErrorHandler(req, res));
};

/**
 * Find all the Initiatives
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const findAllSaved = (req, res) => {
  const { currentUser } = req;

  Initiative.findAllSaved(currentUser)
    .then(dbDataHandler(req, res))
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
const downloadCSVToEvaluate = (req, res) => {
  const {
    query: {
      keyword, limit, order: sort, page = 1,
    },
    currentUser,
  } = req;

  const offset = parseInt(page, 10) > 0 ? (parseInt(page, 10) - 1) * parseInt(limit, 10) : 0;

  const order = [];
  order.push(orderFormat(sort));

  return Initiative.findAllToEvaluate({
    currentUser,
    keyword,
    limit: parseInt(limit, 10),
    offset,
    order,
  })
    .then((data) => {
      if (data && data.count && data.count > 0) {
        return data.rows.map(row => row.dataValues);
      }
      return [];
    })
    .then(list => list.map(({ author, title, status }) => ({
      Autor: author.name,
      'Instituições': author.instituitions
        .map((value, i) => {
          if (i === 0) return value.name;
        })
        .join(''),
      Cidade: author.address ? author.address.city.name : '',
      Uf: author.address ? author.address.city.state.initials : '',
      'Título': title,
      'Situação': status.name,
    })))
    .then(file => mapCSVFile(file, 'lista_iniciativas-avaliador'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

const downloadCSVToPublish = (req, res) => {
  const {
    query: {
      keyword, limit, order: sort, page = 1,
    },
    currentUser,
  } = req;

  const offset = parseInt(page, 10) > 0 ? (parseInt(page, 10) - 1) * parseInt(limit, 10) : 0;

  const order = [];
  order.push(orderFormat(sort));

  return Initiative.findAllToPublish({
    currentUser,
    keyword,
    limit: parseInt(limit, 10),
    offset,
    order,
  })
    .then((data) => {
      if (data && data.count && data.count > 0) {
        return data.rows.map(row => row.dataValues);
      }
      return [];
    })
    .then(list => list.map(({ author, title, status }) => ({
      Autor: author.name,
      'Instituições': author.instituitions
        .map((value, i) => {
          if (i === 0) return value.name;
        })
        .join(''),
      Cidade: author.address ? author.address.city.name : '',
      Uf: author.address ? author.address.city.state.initials : '',
      'Título': title,
      'Situação': status.name,
    })))
    .then(file => mapCSVFile(file, 'lista_iniciativas-avaliador'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

const downloadCSVToVisualization = (req, res) => {
  const {
    query: {
      keyword, limit, order: sort, page = 1,
    },
    currentUser,
  } = req;

  const offset = parseInt(page, 10) > 0 ? (parseInt(page, 10) - 1) * parseInt(limit, 10) : 0;

  const order = [];
  order.push(orderFormat(sort));

  return Initiative.findAllToVisualization({
    currentUser,
    keyword,
    limit: parseInt(limit, 10),
    offset,
    order,
  })
    .then((data) => {
      if (data && data.count && data.count > 0) {
        return data.rows.map(row => row.dataValues);
      }
      return [];
    })
    .then(list => list.map(({ author, title, status }) => ({
      Autor: author.name,
      'Instituições': author.instituitions
        .map((value, i) => {
          if (i === 0) return value.name;
        })
        .join(''),
      Cidade: author.address ? author.address.city.name : '',
      Uf: author.address ? author.address.city.state.initials : '',
      'Título': title,
      'Situação': status.name,
    })))
    .then(file => mapCSVFile(file, 'lista_iniciativas'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

/**
 * Find all the Initiatives to evaluate
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const findAllToEvaluate = (req, res) => {
  const {
    query: {
      keyword, limit, order: sort, page = 1,
    },
    currentUser,
  } = req;

  const offset = parseInt(page, 10) > 0 ? (parseInt(page, 10) - 1) * parseInt(limit, 10) : 0;

  const order = [];
  order.push(orderFormat(sort));


  return Initiative.findAllToEvaluate({
    currentUser,
    keyword,
    limit: parseInt(limit, 10),
    offset,
    order,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const findAllStatus = (req, res) => {
  Status.findAll()
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Find all the Initiatives with publish review pending
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const findAllToPublish = (req, res) => {
  const {
    query: {
      keyword, limit, order: sort, page = 1,
    },
    currentUser,
  } = req;

  const offset = parseInt(page, 10) > 0 ? (parseInt(page, 10) - 1) * parseInt(limit, 10) : 0;

  const order = [];
  order.push(orderFormat(sort));

  Initiative.findAllToPublish({
    currentUser,
    keyword,
    limit: parseInt(limit, 10),
    offset,
    order,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Find all the Initiatives to visualization
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const findAllToVisualization = (req, res) => {
  const {
    query: {
      keyword, limit, order: sort, page = 1,
    },
    currentUser,
  } = req;

  const offset = parseInt(page, 10) > 0 ? (parseInt(page, 10) - 1) * parseInt(limit, 10) : 0;

  const order = [];
  order.push(orderFormat(sort));

  Initiative.findAllToVisualization({
    currentUser,
    keyword,
    limit: parseInt(limit, 10),
    offset,
    order,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Find the Initiative by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const findById = (req, res) => {
  const {
    currentUser,
    params: { id },
  } = req;

  if (currentUser.role.id > USER_ROLE_EVALUATOR_HIGHER) {
    Initiative.findByPk(id)
      .then(dbDataHandler(req, res))
      .catch(dbErrorHandler(req, res));
  } else {
    Initiative.findOneByUser(id, currentUser)
      .then(dbDataHandler(req, res))
      .catch(dbErrorHandler(req, res));
  }
};

const findAllByStatus = (req, res) => {
  const {
    status,
    idInitiative: id,
  } = req.body;
  Initiative.findAllByStatus({
    status,
    id,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  create,
  findAllSaved,
  findAllToEvaluate,
  findAllToPublish,
  findAllStatus,
  findById,
  downloadCSVToEvaluate,
  downloadCSVToPublish,
  findAllByStatus,
  findAllToVisualization,
  downloadCSVToVisualization,
};
