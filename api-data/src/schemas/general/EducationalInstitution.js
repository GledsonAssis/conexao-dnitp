import Joi from 'joi';

const EducationalInstitution = Joi
  .object()
  .keys({
    idDnit: Joi.number().required(),
    idInep: Joi.number().required(),
    idTeachingNetwork: Joi.number().required(),
    name: Joi.string().required().max(50),
  });

export default EducationalInstitution;
