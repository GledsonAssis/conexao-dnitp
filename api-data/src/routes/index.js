import express from 'express';

import controllers from '../controllers';
import {
  formData,
  routeAuthorization,
  schemaValidation,
} from '../middlewares';

import routes from './routes';
import routesCMS from './cms/routes';
import routesReport from './reports/routes';

const router = express.Router();

const allRoutes = routes.concat(routesCMS.map(({
  path,
  ...rest
}) => ({
  ...rest,
  path: `/cms${path}`,
})))
  .concat(routesReport.map(({
    path,
    ...rest
  }) => ({
    ...rest,
    path: `/reports${path}`,
  })));


allRoutes.forEach(({
  action,
  controller: controllerName,
  isPrivate,
  method,
  path,
  roles,
}) => {
  const authorization = routeAuthorization(roles, isPrivate);
  const controller = controllers[controllerName][action];

  router.route(path)[method](
    formData,
    authorization,
    schemaValidation,
    controller,
  );
});

export default router;
