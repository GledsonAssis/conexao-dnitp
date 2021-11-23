import Joi from 'joi';

const CourseUserComment = Joi
  .object()
  .keys({
    comment: Joi.string().max(500).required(),
    idParent: Joi.number().allow(null),
    idCourse: Joi.number().required(),
  });

export default CourseUserComment;
