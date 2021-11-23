import Joi from 'joi';

const ActivitySubTheme = Joi
  .object()
  .keys({
    idActivityTheme: Joi.number().required(),
    name: Joi.string().max(100).required(),
  });

export default ActivitySubTheme;
