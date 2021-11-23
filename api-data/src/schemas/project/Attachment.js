import Joi from 'joi';

const ProjectAttachment = Joi
  .object()
  .keys({
    file: Joi.binary().required(),
    idProject: Joi.number().required(),
    name: Joi.string().max(50).required(),
  });

export default ProjectAttachment;
