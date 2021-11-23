import { literal } from 'sequelize';
import {
  gestorEscolar,
  gestorEstratLocal,
  gestorEstratNacional,
  gestorEstratRegional,
  gestorOpLocal,
  gestorOpNacional,
  gestorOpRegional, gestorTatLocal, gestorTatNacional, gestorTatRegional,
  professor,
  visitante,
} from '../../constants/Role';

import {
  isGestorLocal, isGestorRegional, isGestorNacional, isSuporte,
} from './roleValidator';


export default (currentUser, dnitUnit) => {
  let whereClause;

  if (currentUser) {
    if (isGestorLocal(currentUser.role.id)) {
      if (dnitUnit && dnitUnit.RegionalSuperintendence) {
        whereClause = {
          $or: [
            literal(`[role].[id] = ${visitante}`),
            {
              $and: [
                literal(`[DnitUnit].[id] = ${dnitUnit.id}`),
                {
                  $or: [
                    literal(`[role].[id] = ${professor}`),
                    literal(`[role].[id] = ${gestorEscolar}`),
                  ],
                },
              ],
            },
          ],
        };
      } else {
        whereClause = literal(`[role].[id] = ${visitante}`);
      }
    } else if (isGestorRegional(currentUser.role.id)) {
      if (dnitUnit && !dnitUnit.RegionalSuperintendence) {
        whereClause = {
          $or: [
            literal(`[role].[id] = ${visitante}`),
            {
              $and: [
                {
                  $or: [
                    literal(`[DnitUnit].[id] = ${dnitUnit.id}`),
                    literal(`[DnitUnit->RegionalSuperintendence].[id] = ${dnitUnit.id}`),
                  ],
                },
                {
                  $or: [
                    literal(`[role].[id] = ${professor}`),
                    literal(`[role].[id] = ${gestorEscolar}`),
                  ],
                },
              ],
            },
          ],
        };
      } else {
        whereClause = literal(`[role].[id] = ${visitante}`);
      }
    } else if (isGestorNacional(currentUser.role.id)) {
      whereClause = {
        $or: [
          literal(`[role].[id] = ${visitante}`),
          literal(`[role].[id] = ${professor}`),
          literal(`[role].[id] = ${gestorEscolar}`),
        ],
      };
    } else if (isSuporte(currentUser.role.id)) {
      whereClause = {
        $or: [
          literal(`[role].[id] = ${visitante}`),
          literal(`[role].[id] = ${professor}`),
          literal(`[role].[id] = ${gestorEscolar}`),
          literal(`[role].[id] = ${gestorEstratLocal}`),
          literal(`[role].[id] = ${gestorEstratNacional}`),
          literal(`[role].[id] = ${gestorEstratRegional}`),
          literal(`[role].[id] = ${gestorOpLocal}`),
          literal(`[role].[id] = ${gestorOpNacional}`),
          literal(`[role].[id] = ${gestorOpRegional}`),
          literal(`[role].[id] = ${gestorTatLocal}`),
          literal(`[role].[id] = ${gestorTatNacional}`),
          literal(`[role].[id] = ${gestorTatRegional}`),
        ],
      };
    }
  }

  return whereClause;
};
