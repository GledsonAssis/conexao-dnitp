import HttpStatus from 'http-status-codes';
import Attachments from '../../services/projectAction/Attachments';

import {
  dbErrorHandler,
} from '../../middlewares';

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
      idProjectAction,
    },
    files,
  } = req;
  const attachments = files
    .map(parseFileBinary({ idProjectAction }));

  Promise.all(attachments)
    .then(attachmentsResult => Attachments
      .create(attachmentsResult)
      .then(() => res.sendStatus(HttpStatus.CREATED))
      .catch(dbErrorHandler(req, res)))
    .catch(dbErrorHandler(req, res));
};

/**
* Delete the Attachment of an action by Id
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const deleteAttachment = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  Attachments.deleteAttachment(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find all the project action attachments by idProjectAction
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  const {
    params: {
      idProjectAction,
    },
  } = req;

  Attachments.findAll(idProjectAction)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find the project action attachment by id
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findById = (req, res) => {
  const {
    params: {
      idProjectAction,
    },
  } = req;

  Attachments.findById(idProjectAction)
    .then(dbFileHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 *  Update Action Attachment by id
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

  Attachments.update(body)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  create,
  deleteAttachment,
  findAll,
  findById,
  update,
};
