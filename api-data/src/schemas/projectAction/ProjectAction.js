import Joi from 'joi';

const ProjectAction = Joi
  .object()
  .keys({
    idProject: Joi.number().required(),
    description: Joi.string().required(),
    summary: Joi.string().max(200).required(),
    title: Joi.string().max(100).required(),
  });

export default ProjectAction;
