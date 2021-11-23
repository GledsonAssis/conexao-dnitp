import Joi from 'joi';

const CourseAttachment = Joi
  .object()
  .keys({
    file: Joi.binary().required(),
    idCourse: Joi.number().required(),
    name: Joi.string().max(50).required(),
  });

export default CourseAttachment;
