import HttpStatus from 'http-status-codes';

import {
  dbErrorHandler,
} from '../../middlewares';

import Attachments from '../../services/message/Attachments';

import {
  dbDataHandler,
  dbFileHandler,
} from '../../utils/http';
import {
  parseFileBinary,
} from '../../utils/FileUtils';

/**
 * Create new Attachments
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const create = (req, res) => {
  const {
    body: {
      idMessage,
    },
    files,
  } = req;

  const parsedAttachments = files
    .map(parseFileBinary({
      idMessage,
    }));

  Promise.all(parsedAttachments)
    .then(attachments => Attachments
      .create(attachments)
      .then(() => res.sendStatus(HttpStatus.CREATED))
      .catch(dbErrorHandler(req, res)))
    .catch(dbErrorHandler(req, res));
};

/**
 * Find all the Attachments
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const findAll = (req, res) => {
  const {
    currentUser,
  } = req;

  Attachments.findAll(currentUser)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Find the Attachments by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const download = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  Attachments.findByPk(id)
    .then(dbFileHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  create,
  download,
  findAll,
};
