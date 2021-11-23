import Joi from 'joi';

const ProjectImageCarousel = Joi
  .object()
  .keys({
    default: Joi.bool().default(false),
    file: Joi.binary().required(),
    idProject: Joi.number().required(),
    name: Joi.string().max(50).required(),
  });

export default ProjectImageCarousel;
