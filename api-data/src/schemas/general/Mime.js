import Joi from 'joi';

const Mime = Joi
  .object()
  .keys({
    media: Joi.string().max(100).required(),
    suffix: Joi.string().max(10).required(),
  });

export default Mime;
