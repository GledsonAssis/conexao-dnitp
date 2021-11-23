import HttpStatus from 'http-status-codes';
import Joi from 'joi';

import Schemas from '../schemas';

const supportedMethods = [
  'post',
  'put',
];

const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

const schemaValidation = (req, res, next) => {
  const {
    method,
    route: {
      path: reqRoute,
    },
  } = req;
  const schema = Schemas[reqRoute];
  const supportThisMethod = supportedMethods.includes(method.toLowerCase());

  if (supportThisMethod && schema) {
    return Joi.validate(req.body, schema, validationOptions, (err, data) => {
      console.log('midware de validação')

      if (err) {
        const JoiError = {
          error: {
            // fetch only message and type from each error
            details: err.details.map(({ message, type }) => ({
              message: message.replace(/['"]/g, ''),
              type,
            })),
            original: err,
          },
          status: 'validationFailed',
        };

        // Send back the JSON error response
        res
          .status(HttpStatus.UNPROCESSABLE_ENTITY)
          .json(JoiError);
      } else {
        req.body = data;
        next();
      }
    });
  }
  return next();
};

export default schemaValidation;
