import HttpStatus from 'http-status-codes';

import {
  dbErrorHandler,
} from '../../middlewares';

import ImageCarousel from '../../services/project/ImageCarousel';

import {
  dbDataHandler,
  dbFileHandler,
} from '../../utils/http';
import {
  parseFileBinary,
} from '../../utils/FileUtils';

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
      default: isDefault,
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

  const attachments = files
    .map(parseFileBinary({
      idProject,
      default: isDefault || false,
    }));

  Promise.all(attachments)
    .then(imagesResult => ImageCarousel
      .create(imagesResult)
      .then(() => ImageCarousel.findAll(idProject))
      .then(dbDataHandler(req, res))
      .catch(dbErrorHandler(req, res)))
    .catch(dbErrorHandler(req, res));
};

/**
* Remove a Image  from project
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const deleteImage = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  return ImageCarousel.deleteImage(id)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find all the ProjectImages by idProject
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

  return ImageCarousel.findAll(idProject)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find the ProjectImage by id
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

  ImageCarousel.findById(id)
    .then(dbFileHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const setDefault = (req, res) => {
  const {
    body,
  } = req;

  return ImageCarousel.setDefault(body)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  create,
  deleteImage,
  findAll,
  findById,
  setDefault,
};
