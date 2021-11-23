import HttpStatus from 'http-status-codes';

import Attachment from '../../services/project/Attachment';

import {
  dbDataHandler,
  dbFileHandler,
} from '../../utils/http';
import {
  parseFileBinary,
} from '../../utils/FileUtils';

import {
  dbErrorHandler,
} from '../../middlewares';


/**
* Add some Attachments to project
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const create = (req, res) => {
  const {
    body: {
      idProject,
    },
    files,
  } = req;

  if (!files || !files.length) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY);
    res.json({
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Files not loaded',
      message_token: 'files_not_loaded',
    });
  }

  const parsedAttachments = files
    .map(parseFileBinary({
      idProject,
    }));

  Promise.all(parsedAttachments)
    .then(attachments => Attachment
      .create(attachments)
      .then(() => res.sendStatus(HttpStatus.CREATED))
      .catch(dbErrorHandler(req, res)))
    .catch(dbErrorHandler(req, res));
};

/**
* Remove a Attachments  from project
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const deleteAttachment = (req, res) => {
  const {
    params: {
      id,
      idProject,
    },
  } = req;

  Attachment.deleteAttachment({ id, idProject })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};


/**
* Find all the Attachments by projectId
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  const {
    params: {
      id: idProject,
    },
  } = req;

  Attachment.findAll(idProject)
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

export default {
  create,
  deleteAttachment,
  findAll,
  findById,
};
