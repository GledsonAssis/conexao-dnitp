import HttpStatus from 'http-status-codes';

import {
  dbErrorHandler,
} from '../../middlewares';

import Audio from '../../services/initiative/Audio';

import {
  dbDataHandler,
} from '../../utils/http';
import {
  parseFileBinary,
} from '../../utils/FileUtils';

/**
 * Create new Audio
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const create = (req, res) => {
  const {
    body: {
      idInitiative,
    },
    files,
  } = req;

  const parsedAttachments = files
    .map(parseFileBinary({
      idInitiative,
    }));

  Promise.all(parsedAttachments)
    .then(audioResult => Audio
      .create(audioResult[0])
      .then(() => res.sendStatus(HttpStatus.CREATED))
      .catch(dbErrorHandler(req, res)))
    .catch(dbErrorHandler(req, res));
};

/**
 * Find all the Audio
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const findAll = (req, res) => {
  const {
    currentUser,
  } = req;

  Audio.findAll(currentUser)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Find the Audio by id
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

  Audio.findByPk(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  create,
  findAll,
  findById,
};
