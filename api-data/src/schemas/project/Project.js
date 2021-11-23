import Joi from 'joi';

const Project = Joi
  .object()
  .keys({
    description: Joi.string().required(),
    endDate: Joi.date().greater('now').default(null),
    isCover: Joi.bool().default(false),
    isPublished: Joi.bool().default(false),
    summary: Joi.string().max(200).required(),
    title: Joi.string().max(100).required(),
  });

export default Project;
