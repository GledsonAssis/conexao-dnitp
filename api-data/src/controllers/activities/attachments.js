import HttpStatus from 'http-status-codes';
import Attachment from '../../services/activity/Attachment';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
  dbDeleteHandler,
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
const create = async (req, res) => {
  const {
    body: {
      idActivity,
      idFileType = 2,
    },
    files,
  } = req;

  const parsedAttachments = await files
    .map(parseFileBinary({
      idActivity,
      idFileType,
    }));

  Promise.all(parsedAttachments)
    .then(attachments => Attachment
      .create(attachments)
      .then(() => res.sendStatus(HttpStatus.CREATED))
      .catch(dbErrorHandler(req, res)))
    .catch(dbErrorHandler(req, res));
};

/**
* Find all the Attachment
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  const {
    params: {
      id: idActivity,
    },
  } = req;

  Attachment.findAll(idActivity)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find the Attachment by id
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
    currentUser,
  } = req;

  Attachment.download({ id, currentUser })
    .then(dbFileHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find the Attachment by id
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const remove = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  Attachment.remove(id)
    .then(dbDeleteHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  create,
  download,
  findAll,
  remove,
};
