import Joi from 'joi';

const ProjectActionUserComment = Joi
  .object()
  .keys({
    comment: Joi.string().max(500).required(),
    idParent: Joi.number().allow(null),
    idProject: Joi.number().required(),
  });

export default ProjectActionUserComment;
