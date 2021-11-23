import Joi from 'joi';

const CourseImageCarousel = Joi
  .object()
  .keys({
    default: Joi.bool().default(false),
    file: Joi.binary().required(),
    idCourse: Joi.number().required(),
    name: Joi.string().max(50).required(),
  });

export default CourseImageCarousel;
