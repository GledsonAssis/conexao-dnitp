import Joi from 'joi';

const GeneralSearch = Joi
  .object()
  .keys({
    categories: Joi.array()
      .items(
        Joi.string().valid([
          'projects',
          'actions',
          'projectActions',
          'courses',
          'all',
        ]).required(),
      )
      .min(1)
      .max(4)
      .required(),
    endDate: Joi.string().required(),
    keyword: Joi.string().required(),
    startDate: Joi.string().required(),
  });

export default GeneralSearch;
