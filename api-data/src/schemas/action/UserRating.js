import Joi from 'joi';

const ActionUserRating = Joi
  .object()
  .keys({
    id: Joi.number().required(),
    rating: Joi.number().valid([
      0,
      1,
      2,
      3,
      4,
      5,
    ]).required(),
  });

export default ActionUserRating;
