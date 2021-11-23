const Joi = require('joi');

export default (input, schema) => (
  new Promise((resolve, reject) => {
    Joi.validate(input, schema, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  })
);
