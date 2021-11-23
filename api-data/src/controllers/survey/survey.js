import moment from 'moment';
import Survey from '../../services/survey/Survey';
import {
  dbDataHandler,
  mapCSVFile,
  dbFileHandler,
} from '../../utils/http';
import { dbErrorHandler } from '../../middlewares';

/**
 * List all roles
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const getSurvey = (req, res) => {
  const {
    query: {
      idActivity,
    },
    currentUser: {
      id: idUser,
    },
  } = req;

  return Survey.findUserEvaluation({ idUser, idActivity })
    .then((payload) => {
      if (!payload) {
        return ({
          code: 404,
          message: 'Avaliação não disponível',
          messageToken: 'Actitivity.evaluation.not_allowed',
        });
      }

      const {
        answer,
      } = payload;


      if (answer) {
        return ({
          idActivity,
          idUser,
          answered: true,
          answer: JSON.parse(answer),
        });
      }

      return Survey.findOne({
        order: [
          ['version', 'DESC'],
        ],
        where: {
          active: 1,
        },
      })
        .then(list => ({
          idActivity,
          idUser,
          answered: false,
          answer: list,
        }));
    })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const getSurveyById = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  return Survey.getById(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const setSurvey = (req, res) => {
  const {
    body: {
      idActivity,
      answer,
    },
    currentUser: {
      id: idUser,
      idDnitUnit,
    },
  } = req;

  return Survey.saveSurveyAnswer({
    idActivity,
    idUser,
    idDnitUnit,
    status: 2,
    evaluated: new Date(),
    answer: JSON.stringify(answer),
  })
    .then(() => Survey.findUserEvaluation({ idUser, idActivity: parseInt(idActivity, 10) }))
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const findAll = (req, res) => Survey.findAll()
  .then(dbDataHandler(req, res))
  .catch(dbErrorHandler(req, res));

const countAll = (req, res) => Survey.countAll()
  .then(count => ({ count }))
  .then(dbDataHandler(req, res))
  .catch(dbErrorHandler(req, res));

const download = (req, res) => Survey.findAll()
  .then(list => list.rows.map(({ title, date }) => ({
    Título: title,
    'Data Criação': date ? moment(date).utc().format('DD/MM/YYYY hh:mm') : '',
  })))
  .then(file => mapCSVFile(file, 'lista_questionários'))
  .then(dbFileHandler(req, res))
  .catch(dbErrorHandler(req, res));

const createSurvey = (req, res) => Survey.createSurvey(req.body)
  .then(dbDataHandler(req, res))
  .catch(dbErrorHandler(req, res));

export default {
  createSurvey,
  download,
  getSurvey,
  getSurveyById,
  setSurvey,
  findAll,
  countAll,
};
