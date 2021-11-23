import HttpStatus from 'http-status-codes';
import Publish from '../../services/initiative/Publish';

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
const save = (req, res) => {
  const {
    body: {
      idInitiative,
      idInitiativeEvaluation,
      accepted,
      comment,
    },
    currentUser,
  } = req;

  if (!idInitiativeEvaluation) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY);
    return res.json({ message_token: 'malformed_payload_miss_evaluation' });
  }

  Publish.save({
    idInitiative,
    idInitiativeEvaluation,
    accepted,
    comment,
  }, currentUser)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  save,
};
