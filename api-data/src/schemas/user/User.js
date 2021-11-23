import Joi from 'joi';

const SimpleUser = Joi
  .object()
  .keys({
    id: Joi.number(),
    idCity: Joi.number().allow(null),
    idDnitUnit: Joi.number().allow(null),
    idRole: Joi.number().required(),
    idState: Joi.number().allow(null),
    idSchoolBonds: Joi.number()
      .allow(null)
      .valid([
        1,
        2,
        3,
        4,
        5,
      ]),
    address: Joi.object({
      cep: Joi.number(),
      street: Joi.string(),
      city: Joi.object({
        id: Joi.number().required(),
      }),
    }),
    birthDate: Joi.date().allow(null),
    email: Joi.string().max(320).email({ minDomainAtoms: 2 }).required(),
    instituitions: Joi.array().items(Joi.number()),
    name: Joi.string().max(100).required(),
    phones: Joi.array().items(Joi.object({
      id: Joi.number(),
      idPhoneType: Joi.number().required(),
      DDD: Joi.string().required(),
      number: Joi.number().required(),
    })).max(2),
  });

const UserSignup = SimpleUser
  .keys({
    idState: Joi.number().allow(null),
    idUserTerms: Joi.number().required(),
    acceptedTerms: Joi.boolean().valid([true]).required(),
    confirmPassword: [
      Joi.string().valid(
        Joi.ref('password'),
      ),
      Joi.number().valid(
        Joi.ref('password'),
      ),
    ],
    cpf: Joi.string().length(14).required(),
    password: [Joi.string().min(4), Joi.number()],
  });

export {
  UserSignup,
  SimpleUser,
};
