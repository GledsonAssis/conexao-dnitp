import Joi from 'joi';

const ActionAttachment = Joi
  .object()
  .keys({
    file: Joi.binary().required(),
    idAction: Joi.number().required(),
    name: Joi.string().max(50).required(),
  });

export default ActionAttachment;
