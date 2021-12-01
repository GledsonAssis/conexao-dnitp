import GeneralSearch from '../../services/general/GeneralSearch';

import {
  naoConfirmado,
} from '../../constants/Role';

import {
  dbErrorHandler,
} from '../../middlewares';

import {
  dbDataHandler,
} from '../../utils/http';
import generalSearchProcedureParser from '../../utils/parsers/generalSearchProcedureParser';
import categoriesParser from '../../utils/parsers/categoriesParser';

/**
 * Find all the GeneralSearch
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {*}
 */
const find = (req, res) => {
  const {
    body: {
      categories: searchCategories,
      ...rest
    },
    currentUser,
  } = req;

  const idRole = currentUser
    ? currentUser.role.id
    : naoConfirmado;

  const categories = categoriesParser(searchCategories, idRole);

  GeneralSearch.find({
    categories,
    ...rest,
  }, idRole)
    .then(resultSet => resultSet.map(generalSearchProcedureParser))
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

export default {
  find,
};
