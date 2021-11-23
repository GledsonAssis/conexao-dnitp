import Evaluation from '../../services/initiative/Evaluation';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
} from '../../utils/http';

/**
 * Accept initiative
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const saveEvaluation = (req, res) => {
  const {
    body,
    currentUser,
  } = req;

  Evaluation.saveEvaluation(body, currentUser)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  saveEvaluation,
};
