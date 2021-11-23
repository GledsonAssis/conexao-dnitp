import HttpStatus from 'http-status-codes';
import Attachment from '../../services/action/Attachment';

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
      idAction,
    },
    files,
  } = req;
  const attachments = files
    .map(parseFileBinary({ idAction }));

  Promise.all(attachments)
    .then(attachmentsResult => Attachment
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

  Attachment.deleteAttachment(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};


/**
* Find all the Attachment of an action by actionId
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  const {
    params: {
      id: idAction,
    },
  } = req;

  Attachment.findAll(idAction)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find the Attachment of an action by id
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

  Attachment.findById(id)
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

  Attachment.update(body)
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
