import {
  admin,
  cadastrador,
  gestorEscolar,
  gestorEstratLocal,
  gestorEstratNacional,
  gestorEstratRegional,
  gestorOpLocal,
  gestorOpNacional,
  gestorOpRegional,
  gestorTatLocal,
  gestorTatNacional,
  gestorTatRegional,
  professor,
  publicador,
  suportePedagogico,
  suporteTecnico,
  visitante,
} from '../../constants/Role';

const validateRole = (allowedRoles, role) => allowedRoles.includes(role);

export const isGestorLocal = idRole => validateRole(
  [gestorOpLocal, gestorTatLocal, gestorEstratLocal],
  idRole,
);

export const isGestorRegional = idRole => validateRole(
  [gestorOpRegional, gestorTatRegional, gestorEstratRegional],
  idRole,
);

export const isGestorNacional = idRole => validateRole(
  [gestorOpNacional, gestorTatNacional, gestorEstratNacional],
  idRole,
);

export const isNacional = idRole => validateRole(
  [publicador, admin, gestorOpNacional, gestorTatNacional,
    gestorEstratNacional, suporteTecnico, suportePedagogico],
  idRole,
);

export const canViewActivationAction = idRole => validateRole(
  [admin, publicador, cadastrador, suportePedagogico, suporteTecnico,
    gestorEstratLocal, gestorOpLocal, gestorTatLocal,
    gestorEstratRegional, gestorOpRegional, gestorTatRegional,
    gestorEstratNacional, gestorOpNacional, gestorTatNacional],
  idRole,
);

export const isGestor = idRole => validateRole(
  [gestorEstratLocal, gestorOpLocal, gestorTatLocal,
    gestorEstratRegional, gestorOpRegional, gestorTatRegional,
    gestorEstratNacional, gestorOpNacional, gestorTatNacional],
  idRole,
);

export const isSuporte = idRole => validateRole(
  [suportePedagogico, suporteTecnico],
  idRole,
);

export const currentUserCanViewUser = (currentUser, user) => {
  if (currentUser && user) {
    if (isGestorLocal(currentUser.role.id)) {
      return validateRole([visitante], user.role.id)
          || (validateRole([professor, gestorEscolar], user.role.id)
              && user.DnitUnit.id === currentUser.idDnitUnit);
    }
    if (isGestorRegional(currentUser.role.id)) {
      return validateRole([visitante], user.role.id)
          || (validateRole([professor, gestorEscolar], user.role.id)
              && (user.DnitUnit.id === currentUser.idDnitUnit
                  || user.DnitUnit.RegionalSuperintendence.id === currentUser.idDnitUnit));
    }
    if (isGestorNacional(currentUser.role.id)) {
      return validateRole([visitante, professor, gestorEscolar], user.role.id);
    }
    if (isSuporte(currentUser.role.id)) {
      return validateRole(
        [visitante, professor, gestorEscolar,
          gestorEstratLocal, gestorEstratNacional, gestorEstratRegional,
          gestorOpLocal, gestorOpNacional, gestorOpRegional,
          gestorTatLocal, gestorTatNacional, gestorTatRegional,
        ],
        user.role.id,
      );
    }
  }
  return true;
};
