import Joi from 'joi';

const City = Joi
  .object()
  .keys({
    idState: Joi.number().required(),
    idCity: Joi.number().required(),
    ibgeCode: Joi.number().required(),
    name: Joi.string().max(50).required(),
  });

export default City;
