import Joi from 'joi';

const State = Joi
  .object()
  .keys({
    code: Joi.number().required(),
    initials: Joi.string().max(2),
    name: Joi.string().max(50),
  });

export default State;
