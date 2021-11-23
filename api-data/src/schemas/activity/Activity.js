import Joi from 'joi';

const Activity = Joi
  .object()
  .keys({
    idDiscipline: Joi.number().required(),
    idTrafficConcept: Joi.number().required(),
    duration: Joi.string().max(50).required(),
    evaluation: Joi.string().max(2000).required(),
    knowledgeObject: Joi.string().max(855).required(),
    reference: Joi.string().max(255).required(),
    resource: Joi.string().max(855).required(),
    teachingArticulation: Joi.string().max(855).required(),
    teachingGuide: Joi.string().max(855).required(),
    title: Joi.string().max(255).required(),
  });

export default Activity;
