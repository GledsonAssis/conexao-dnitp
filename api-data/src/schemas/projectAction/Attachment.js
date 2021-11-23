import Joi from 'joi';

const ProjectActionAttachment = Joi
  .object()
  .keys({
    idProjectAction: Joi.number().required(),
    file: Joi.binary().required(),
    name: Joi.string().max(50).required(),
  });

export default ProjectActionAttachment;
