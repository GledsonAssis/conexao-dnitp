import Joi from 'joi';

const ProjectUserRating = Joi
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

export default ProjectUserRating;
