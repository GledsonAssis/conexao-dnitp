import HttpStatus from 'http-status-codes';

import {
  dbErrorHandler,
} from '../../middlewares';

import Attachments from '../../services/user/Attachment';

import {
  avatarType,
} from '../../constants/userAttachmentsType';

import {
  dbFileHandler,
} from '../../utils/http';
import {
  parseFileBinary,
} from '../../utils/FileUtils';


/**
 * Create new Attachment
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const setAvatar = (req, res) => {
  const {
    currentUser: {
      id: idUser,
    },
    files,
  } = req;

  const parsedAttachments = files
    .map(parseFileBinary({
      idUser,
      idAttachmentType: avatarType,
    }));

  Promise.all(parsedAttachments)
    .then(newAvatar => Attachments
      .createOrUpdate(newAvatar[0])
      .then(() => res.sendStatus(HttpStatus.NO_CONTENT)))
    .catch(dbErrorHandler(req, res));
};

/**
 * Set User avatar from CMS
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const setUserAvatar = (req, res) => {
  const {
    params: {
      idUser,
    },
    files,
  } = req;

  const parsedAttachments = files
    .map(parseFileBinary({
      idUser,
      idAttachmentType: avatarType,
    }));

  Promise.all(parsedAttachments)
    .then(newAvatar => Attachments
      .createOrUpdate(newAvatar[0])
      .then(() => res.sendStatus(HttpStatus.NO_CONTENT)))
    .catch(dbErrorHandler(req, res));
};

/**
 * Return the avatar for the given user
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const getAvatar = (req, res) => {
  const {
    params: {
      id,
    },
  } = req;

  Attachments.findByUserId(id)
    .then(dbFileHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  getAvatar,
  setAvatar,
  setUserAvatar,
};
