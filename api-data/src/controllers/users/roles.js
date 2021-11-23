import Roles from '../../services/user/Roles';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
} from '../../utils/http';
import {
  isNacional,
  isGestorRegional,
  isGestorLocal,
  isGestor,
  isSuporte,
} from '../../utils/validators/roleValidator';
import {
  gestorEscolar,
  gestorEstratLocal, gestorEstratNacional, gestorEstratRegional,
  gestorOpLocal, gestorOpNacional, gestorOpRegional,
  gestorTatLocal, gestorTatNacional, gestorTatRegional,
  professor,
  visitante
} from '../../constants/Role';


/**
 * List all roles
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const findAll = (req, res) => {
  const {
    query: {
      withAll = false,
      validateRole = false,
      mode = undefined,
    },
    currentUser,
  } = req;


  return Roles.findAll()
    .then(data => {
      if(mode === 'school') {
        data = data.filter(perfil => [3, 4].includes(perfil.id));
      }

      if (validateRole) {
        const { role } = currentUser;

        if (isNacional(role.id)) {
          data = data.filter(perfil => [2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16].includes(perfil.id));
        } else {
          if (isGestorRegional(role.id)) {
            data = data.filter(perfil => [3, 4, 5, 6, 7, 11, 12, 13].includes(perfil.id));
          } else {
            if (isGestorLocal(role.id)) {
              data = data.filter(perfil => [3, 4, 5, 6, 7].includes(perfil.id));
            } else {
              data = [];
            }
          }
        }
      }

      if (data.length > 1 && withAll) {
        let newRows = [{
          "id": -1,
          "name": "TODOS",
        }].concat(data);

        data = newRows;
      }

      return dbDataHandler(req, res)(data)
    })
    .catch(dbErrorHandler(req, res));
};

const findAllCMS = (req, res) => {
  const {
    currentUser,
  } = req;

  return Roles.findAll()
    .then((data) => {
      if (isGestor(currentUser.role.id)) {
        data = data.filter(perfil => [visitante, professor, gestorEscolar].includes(perfil.id));
      } else if (isSuporte(currentUser.role.id)) {
        data = data.filter(perfil => [
          visitante, professor, gestorEscolar,
          gestorEstratLocal, gestorOpLocal, gestorTatLocal,
          gestorEstratRegional, gestorOpRegional, gestorTatRegional,
          gestorEstratNacional, gestorOpNacional, gestorTatNacional,
        ].includes(perfil.id));
      }

      return dbDataHandler(req, res)(data);
    })
    .catch(dbErrorHandler(req, res));
};

export default {
  findAll,
  findAllCMS,
};
