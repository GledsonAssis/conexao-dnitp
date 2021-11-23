import HttpStatus from 'http-status-codes';
import Attachment from '../../services/course/Attachment';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
  dbFileHandler,
} from '../../utils/http';
import { parseFileBinary } from '../../utils/FileUtils';

/**
* Find all the Attachments by courseId
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAll = (req, res) => {
  const {
    params: {
      id: idCourse,
    },
  } = req;

  Attachment.findAll(idCourse)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const create = (req, res) => {
  const {
    body: {
      idCourse,
    },
    files,
  } = req;

  const parsedAttachments = files
    .map(parseFileBinary({
      idCourse,
    }));

  Promise.all(parsedAttachments)
    .then(attachments => Attachment
      .create(attachments)
      .then(() => res.sendStatus(HttpStatus.CREATED))
      .catch(dbErrorHandler(req, res)))
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

/**
* CMS - Delete an Attachments by id
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

export default {
  create,
  deleteAttachment,
  findAll,
  findById,
};
