import Joi from 'joi';

const Message = Joi
  .object()
  .keys({
    idMessage: Joi.number(),
    message: Joi.string().max(1000).required(),
    messageType: Joi.number(),
    recipients: Joi.array().items(Joi.number()),
    subject: Joi.string().max(150),
  });

export default Message;
