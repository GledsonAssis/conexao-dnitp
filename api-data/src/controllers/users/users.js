import HttpStatus, { USE_PROXY } from 'http-status-codes';
import moment from 'moment';

import Error from '../../models/general/Error';
import Terms from '../../services/general/Terms';
import User from '../../services/user/User';
import Attachments from '../../services/user/Attachment';
import SendMail from '../../services/sendmail';
import NormalizeCPF from '../../utils/normalize/normalizeCPF';
import normalizeDividePhone from '../../utils/normalize/normalizeDividePhone';
import onlyNumbers from '../../utils/formatters/onlyNumbers';

import { avatarType } from '../../constants/userAttachmentsType';

import { dbErrorHandler, genericErrorHandler } from '../../middlewares';

import {
  dbDataHandler,
  mapCSVFile,
  dbFileHandler,
} from '../../utils/http';
import { parseFileBinary } from '../../utils/FileUtils';

import compareObject from '../../utils/compare/object';
import IdentityServer from '../../utils/http/IdentityServer';
import parseUser from '../../utils/parsers/parseUser';
import { currentUserCanViewUser } from '../../utils/validators/roleValidator';
import { visitante, naoConfirmado, infantil, professor } from '../../constants/Role';

/**
 * cms create user
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const create = (req, res) => {
  const { body: newUser } = req;

  User.findExistsByCPF(newUser.cpf)
    .then((found) => {
      if (found) {
        return Promise.reject(
          new Error(
            HttpStatus.CONFLICT,
            'The CPF provided is already in use',
            newUser.cpf,
            'ConflictedCPF',
          ),
        );
      }
      return found;
    })
    .then(User.create({ newUser, idRole: naoConfirmado }))
    .then(() => res.sendStatus(HttpStatus.CREATED))
    .catch((error) => {
      if (error.code === HttpStatus.CONFLICT) {
        return genericErrorHandler(error, req, res);
      }

      return dbErrorHandler(req, res)(error);
    });
};

/**
 * Delete a user by id
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const activate = (req, res) => {
  const {
    body: { id, situation },
  } = req;

  User.activateUser({ id, situation })
    .then(() => res.sendStatus(HttpStatus.OK))
    .catch(dbErrorHandler(req, res));
};

/**
 * Get user info
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const profile = async (req, res) => {
  const {
    currentUser,
  } = req;

  if (currentUser.active) {
    const { user } = await IdentityServer.userInfo(req.headers.authorization);
    const maskaredCpf = NormalizeCPF(user.sub.replace(/[^\d]/g, ''));
    const existsUser = await User.findExistsByCPF(maskaredCpf)
    const newDataUser = {
      email: user.email,
      name: user.name,
      cpf: maskaredCpf,
      ativo: 1,
    }
    const NewPhone = !existsUser.phones
      .map(item => onlyNumbers((item.dataValues.DDD + item.dataValues.number).toString()))
      .includes(onlyNumbers((user.phone_number).toString())) ? { phones: [normalizeDividePhone(user.phone_number)] } : {}
    const params = {
      id: existsUser.id,
      ...newDataUser,
      ...NewPhone
    }
    await User.updateGovbrData(params)

    User.findById(currentUser.id)
      .then(userProfile => parseUser(userProfile.toJSON()))
      .then(dbDataHandler(req, res))
      .catch(dbErrorHandler(req, res));
  } else {
    const error = {
      code: HttpStatus.UNAUTHORIZED,
      message: 'Usuário inativo ou não autorizado.',
      messageToken: 'User.Inactive',
    };
    genericErrorHandler(error, req, res);
  }
};

/**
 * Get user info
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const getById = (req, res) => {
  const {
    params: { id },
    currentUser,
  } = req;

  User.findById(id)
    .then((user) => {
      if (!currentUserCanViewUser(currentUser, user)) {
        return Promise.reject(
          new Error(HttpStatus.METHOD_NOT_ALLOWED, 'Você não possui permissão para visualizar este usuário.', null, 'NotAllowed'),
        );
      }
      return user;
    })
    .then(userProfile => parseUser(userProfile.toJSON()))
    .then(dbDataHandler(req, res))
    .catch((error) => {
      if (error.code === HttpStatus.FORBIDDEN) {
        return genericErrorHandler(error, req, res);
      }
      return dbErrorHandler(req, res)(error);
    });
};

/**
 * Sign up
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const signUp = (req, res) => {
  const {
    body: {
      idCity,
      idDnitUnit,
      idRole,
      idSchoolBonds,
      idState,
      idUserTerms,
      acceptedTerms: userAcceptedTerms,
      address,
      birthDate,
      confirmPassword,
      cpf,
      email,
      instituitions,
      name,
      password,
      phones,
    },
    files,
  } = req;

  const newUser = {
    idCity,
    idDnitUnit,
    idRole,
    idSchoolBonds,
    idState,
    idUserTerms,
    address,
    birthDate,
    confirmPassword,
    cpf,
    email,
    instituitions,
    name,
    password,
    phones,
  };

  if (!userAcceptedTerms) {
    const error = {
      code: HttpStatus.FORBIDDEN,
      details: 'userNeedsToAcceptTerms',
      message: 'userNeedsToAcceptTerms',
      messageToken: 'userNeedsToAcceptTerms',
    };
    genericErrorHandler(error, req, res);
  } else {
    Terms.findById(idUserTerms)
      .then((term) => {
        if (!term || !term.active || new Date() > term.endDate) {
          Promise.reject(
            new Error(
              HttpStatus.FORBIDDEN,
              'termsNotValid',
              'termsNotValid',
              'termsNotValid',
            ),
          );
        }
      })
      .then(() => Promise.all([
        User.findExistsByCPF(newUser.cpf),
        User.findExistsByEmail(newUser.email),
      ]))
      .then(([foundCpf, foundEmail]) => {
        if (foundCpf) {
          return Promise.reject(
            new Error(HttpStatus.CONFLICT, 'The CPF provided is already in use',
              newUser.cpf, 'ConflictedCPF'),
          );
        }
        if (foundEmail) {
          return Promise.reject(
            new Error(HttpStatus.CONFLICT, 'The Email provided is already in use',
              newUser.email, 'ConflictedEmail'),
          );
        }
        return true;
      })
      .then(() => IdentityServer.createUser(newUser))
      .then(identityUser => User.signUp(newUser)(identityUser))
      .then(async (user) => {
        if (files) {
          const newAvatar = await parseFileBinary({
            idUser: user.id,
            idAttachmentType: avatarType,
          })(files[0]);
          await Attachments.createOrUpdate(newAvatar);
        }
        return user;
      })
      .then((result) => {
        res.status(HttpStatus.CREATED);
        res.json(result);
      })
      .catch((error) => {
        if (error.code === HttpStatus.CONFLICT) {
          return genericErrorHandler(error, req, res);
        }
        return dbErrorHandler(req, res)(error);
      });
  }
};

/**
 * Self update profile
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const update = (req, res) => {
  const {
    body: {
      id,
      idCity,
      idDnitUnit,
      idRole,
      idSchoolBonds,
      idState,
      birthDate,
      email,
      instituitions,
      name,
      phones,
    },
    currentUser: {
      idCity: currentCity,
      idSchoolBonds: currentIdSchoolBonds,
      idDnitUnit: currentIdDnitUnit,
      email: currentEmail,
      name: currentName,
      phones: currentPhone,
      idRole: currentIdRole,
      idState: currentIdState,
      birthDate: currentBirthDate,
    },
  } = req;

  const userUpdated = {
    id,
    idCity,
    idDnitUnit,
    idRole: idRole === naoConfirmado ? visitante : idRole,
    idState,
    birthDate,
    idSchoolBonds: idSchoolBonds === '' ? null : idSchoolBonds,
    email,
    name,
    phones,
    instituitions,
  };

  if (moment().diff(birthDate, 'years') <= +process.env.INFANTIL_YEARS_OLD_REGISTER) {
    userUpdated.idRole = infantil
  }

  const shouldUpdate = !compareObject(
    {
      id,
      idCity: currentCity,
      idSchoolBonds: currentIdSchoolBonds,
      idDnitUnit: currentIdDnitUnit,
      email: currentEmail,
      name: currentName,
      phones: currentPhone,
      idRole: currentIdRole,
      idState: currentIdState,
      birthDate: currentBirthDate,
      instituitions: [],
    },
    userUpdated,
  );

  if (shouldUpdate) {
    User.update(userUpdated)
      .then(() => {
        if (idRole !== currentIdRole && idRole === professor) {
          const message = {
            destinatarios: [email],
            assunto: 'Alteração para perfil professor',
            name,
            template: 'teacherProfileChange',
            url: `${process.env.PORTAL__URL}/#/`,
          };

          SendMail.sendMail(message);
        }
        return true;
      })
      .then(() => {
        if (idRole !== currentIdRole && idRole === naoConfirmado) {
          const message = {
            destinatarios: [email],
            assunto: '[Conexão DNIT] Confirmação de conta',
            name,
            template: 'AccountConfirmation',
            url: `${process.env.PORTAL__URL}/#/`,
          };
          SendMail.sendMail(message)
        }
        return true;
      })
      .then(() => User.findById(id))
      .then(dbDataHandler(req, res))
      .catch(dbErrorHandler(req, res));
  } else {
    res.sendStatus(HttpStatus.NOT_MODIFIED);
  }
};

const findListUsers = (req, res) => {
  const {
    params: { search },
  } = req;

  User.findList(search)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

/**
 * Verify email
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findEmailExist = (req, res) => {
  const {
    query: { email },
  } = req;

  return User.findExistsByEmail(email)
    .then(x => {
      if (x) {
        res.sendStatus(HttpStatus.OK)
      } else {
        res.sendStatus(HttpStatus.BAD_REQUEST)
      }

    })
    .catch(dbErrorHandler(req, res));
};


const searchAndListUsersCMS = (req, res) => {
  const {
    query: {
      keyword,
      order,
      page = 1,
      limit = 0,
      roleId,
      idDnitUnit,
    },
    currentUser,
  } = req;

  const offset = parseInt(page, 10) < 1 ? 0 : (parseInt(page, 10) - 1) * parseInt(limit, 10);
  User.searchUsers({
    idDnitUnit,
    keyword,
    limit: parseInt(limit, 10),
    offset,
    order,
    roleId,
    currentUser,
  })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const downloadCSV = (req, res) => {
  const {
    query: { keyword, order },
  } = req;
  User.searchUsers({
    keyword,
    order,
  })
    .then(result => result.rows)
    .then(list => list.map((row) => ({
      Id: row.id,
      Nome: row.name,
      CPF: row.cpf,
      Email: row.email,
      Perfil: row.role ? row.role.name : '',
      UF: row.city && row.city.state ? row.city.state.name : row.address && row.address.city ? row.address.city.state.initials : '',
      Município: row.city ? row.city.name : row.address && row.address.city ? row.address.city.name || '' : '',
      Fone: row.phones.map(phone => `(${phone.DDD}) ${phone.number}`).join(', '),
      "Data de cadastro": moment.utc(row.registerDate).format("DD/MM/YYYY"),
      "Último acesso": moment.utc(row.dataUltimoAcesso).format("DD/MM/YYYY"),
      "Concluiu cadastro complementar": row.primeiroAcessoGovbr ? 'sim' : 'não',
      Ativo: JSON.parse(JSON.stringify(row)).ativo ? 'sim' : 'não',
    })))
    .then(file => mapCSVFile(file, 'lista_usuarios'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

const findCPFAndEmail = (req, res) => {
  const { cpf, email } = req.body;
  User.findCPFAndEmail({ cpf, email })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const isModerator = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .then((data) => {
      const role = data.dataValues.idRole;
      const moderator = [5, 6, 7, 10, 11, 12, 13, 14, 15, 16].includes(role);
      return ({ isModerator: moderator });
    })
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
  return user;
};

const updateLastAccess = (req, res) => {
  const { currentUser } = req;

  return User.updateLastAccess(currentUser.id)
    .then(x => {
      if (x) {
        res.sendStatus(HttpStatus.OK)
      } else {
        res.sendStatus(HttpStatus.BAD_REQUEST)
      }
    })
    .catch(dbErrorHandler(req, res));
}

const releaseAccess = (req, res) => {
  const {
    body: { id },
  } = req;

  User.releaseAccess(id)
    .then(() => res.sendStatus(HttpStatus.OK))
    .catch(dbErrorHandler(req, res));
};

export default {
  activate,
  create,
  downloadCSV,
  getById,
  findListUsers,
  profile,
  searchAndListUsersCMS,
  signUp,
  update,
  findCPFAndEmail,
  isModerator,
  findEmailExist,
  updateLastAccess,
  releaseAccess,
};
