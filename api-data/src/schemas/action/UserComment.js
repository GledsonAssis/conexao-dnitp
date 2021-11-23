import Joi from 'joi';

const ActionUserComment = Joi
  .object()
  .keys({
    comment: Joi.string().max(500).required(),
    idAction: Joi.number().required(),
    idParent: Joi.number().allow(null),
  });

export default ActionUserComment;
