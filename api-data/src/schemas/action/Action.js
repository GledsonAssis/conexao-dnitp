import Joi from 'joi';

const Action = Joi
  .object()
  .keys({
    description: Joi.string().required(),
    isCover: Joi.bool().default(false),
    summary: Joi.string().max(300).required(),
    title: Joi.string().max(100).required(),
  });

export default Action;
