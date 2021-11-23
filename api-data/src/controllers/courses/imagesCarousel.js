import HttpStatus from 'http-status-codes';

import {
  dbErrorHandler,
} from '../../middlewares';

import ImageCarousel from '../../services/course/ImageCarousel';

import {
  dbDataHandler,
  dbFileHandler,
  dbDeleteHandler,
} from '../../utils/http';

import {
  parseFileBinary,
} from '../../utils/FileUtils';

/**
* Create new CourseImages
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const create = (req, res) => {
  const {
    body: {
      idCourse,
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
      idCourse,
      default: isDefault || false,
    }));

  Promise.all(attachments)
    .then(imagesResult => ImageCarousel
      .create(imagesResult)
      .then(() => ImageCarousel.findAll(idCourse))
      .then(dbDataHandler(req, res))
      .catch(dbErrorHandler(req, res)))
    .catch(dbErrorHandler(req, res));
};


const deleteImage = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  ImageCarousel.deleteImage(id).then(
    dbDeleteHandler(req, res),
  ).catch(
    dbErrorHandler(req, res),
  );
};


/**
* Find all the CourseImages by courseId
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

  return ImageCarousel.findAll(idCourse)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find the CourseImage by id
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
