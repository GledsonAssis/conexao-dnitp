import Joi from 'joi';

const ActionImageCarousel = Joi
  .object()
  .keys({
    isPrincipal: Joi.bool().default(false),
    file: Joi.binary().required(),
    idAction: Joi.number().required(),
    name: Joi.string().max(50).required(),
  });

export default ActionImageCarousel;
