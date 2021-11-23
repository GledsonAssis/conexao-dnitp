import HttpStatus from 'http-status-codes';

import Messages from '../../services/message/Messages';
import { sendMails } from '../../services/cronJob';
import User from '../../services/user/User';

import {
  dbErrorHandler,
  genericErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
} from '../../utils/http';

import MessageTypes from '../../constants/MessageTypes';

const getRecipients = async (req) => {
  const {
    body: {
      messageType,
      recipients,
    },
  } = req;


  const redirectRecipients = MessageTypes.find(({ id }) => id === messageType);
  if (redirectRecipients) {
    const newRecipients = User.findByProfile(redirectRecipients.profile);
    return newRecipients.map(({ id }) => id);
  }
  return recipients;
};

/**
* Find all the Messages from user's inbox
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAllInbox = (req, res) => {
  const {
    currentUser,
  } = req;

  Messages.findAllInbox(currentUser)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find all the Messages from user's send
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAllSend = (req, res) => {
  const {
    currentUser,
  } = req;

  Messages.findAllSend(currentUser)
    .then(list => list.map(message => message.get({ plain: true })))
    .then(list => list.map((message) => {
      const {
        type: {
          id: messageTypeId,
          name,
        },
      } = message;

      const redirectRecipients = MessageTypes.find(({ id: typeId }) => typeId === messageTypeId);

      if (redirectRecipients) {
        return {
          ...message,
          recipient: [{
            email: name,
            name,
          }],
        };
      }
      return ({
        ...message,
        recipient: [message.recipient],
      });
    }))
    .then((list) => {
      const result = list.filter(item => !item.idParentMessage);
      return list.reduce((acc, obj) => {
        if (obj.idParentMessage && obj.idParentMessage !== null) {
          const contained = acc.find(item => (item.id == obj.idParentMessage));
          const recipient = obj.recipient.pop();
          if (contained && contained.recipient.find(({ name }) => name === recipient.name) < 0) {
            contained.recipient.push(recipient);
          }
        }
        return acc;
      }, result);
    })
    .then(list => list.sort((cur, next) => next.dateTimeLastResponse - cur.dateTimeLastResponse))
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find all Message's type
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAllMessagesTypes = (req, res) => {
  const {
    currentUser,
  } = req;

  Messages.findAllMessagesTypes(currentUser)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find all Message's status
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAllMessagesStatus = (req, res) => {
  Messages.findAllMessagesStatus()
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find all recipients for current user
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findAllRecipients = (req, res) => {
  const {
    body: filters,
    currentUser
  } = req;


  Messages
    .findAllRecipients({ id: currentUser.id, filters, currentUser })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Find a Message by it's Id
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const findById = (req, res) => {
  const {
    currentUser,
    params: {
      id,
    },
  } = req;

  Messages.findByPk(currentUser, id)
    .then(message => message.get())
    .then((message) => {
      const {
        type: {
          id: messageTypeId,
          name,
        },
      } = message;

      const redirectRecipients = MessageTypes.find(({ id: typeId }) => typeId === messageTypeId);

      if (redirectRecipients) {
        return {
          ...message,
          recipient: {
            email: name,
            name,
          },
        };
      }
      return message;
    })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
* Mark as Read
* updates a reply to readed state
* @param {object} req
* @param {object} res
* @returns {*}
*/
const markAsRead = (req, res) => {
  const {
    body: {
      idMessage,
    },
    currentUser,
  } = req;

  return Messages.markAsRead(idMessage, currentUser)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};


/**
* Send a Message
*
* @param {object} req
* @param {object} res
* @returns {*}
*/

const sendMessage = async (req, res) => {
  const {
    body: {
      idMessage,
      messageType: idMessageType,
      subject,
      message: text,
      recipients: recipientsList,
    },
    currentUser,
  } = req;

  const recipients = idMessageType && idMessageType.toString() !== process.env.EVALUATION_MESSAGE_TYPE.toString()
    ? await getRecipients(req)
    : recipientsList;

  if (recipients.length > 0) {
    Messages.createFindMessage(currentUser, {
      idMessage,
      idMessageType,
      recipients,
      subject,
      text,
    }).then(dbDataHandler(req, res));
  } else {
    const err = {
      code: HttpStatus.NOT_ACCEPTABLE,
      message: 'É necessário informar ao menos um destinatário',
      messageToken: 'empty_recipient_list',
    };
    genericErrorHandler(err, req, res);
  }
};

/**
* Find all Message's type
*
* @param {object} req
* @param {object} res
* @returns {*}
*/
const startCron = (req, res) => {
  const {
    currentUser,
  } = req;

  const cr = sendMails();

  res.status(HttpStatus.OK);
  res.json({});
};

const deleteMessage = (req, res) => {
  const {
    params: {
      id,
    },
    currentUser,
  } = req;

  return Messages.deleteMessage(id, currentUser)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
}

export default {
  findAllInbox,
  findAllMessagesTypes,
  findAllMessagesStatus,
  findAllRecipients,
  findAllSend,
  findById,
  markAsRead,
  sendMessage,
  startCron,
  deleteMessage,
};
