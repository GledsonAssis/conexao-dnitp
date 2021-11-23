import User from '../services/user/User';
import genericErrorHandler from './errors/genericErrorHandler';
import IdentityServer from '../utils/http/IdentityServer';
import NormalizeCPF from '../utils/normalize/normalizeCPF';
import normalizeDividePhone from '../utils/normalize/normalizeDividePhone';
import routes from '../routes/routes';
import routesCms from '../routes/cms/routes';
import routesReports from '../routes/reports/routes';

/**
* Route authentication middleware to verify a token
*
* @param {object} req
* @param {object} res
* @param {function} next
*/
const autenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    next();
    return
  }

  try {
    const userInfo = await IdentityServer.userInfo(token);
    const { user, new_token, expires_in } = userInfo;
    const maskaredCpf = NormalizeCPF(user.sub.replace(/[^\d]/g, ''));
    const existsUser = await User.findExistsByCPF(maskaredCpf)

    if (!existsUser) {
      const newUser = {
        email: user.email,
        name: user.name,
        cpf: maskaredCpf,
        ativo: 1,
        phones: [normalizeDividePhone(user.phone_number)]
      }
      await User.create(newUser)
    }

    const resultUser = await User.findByCpf(maskaredCpf)
    req.currentUser = resultUser;
    const route = routes.find(item => item.path === req.url)
    const routeCms = routesCms.find(item => `/cms${item.path}` === req.url)
    const routeReports = routesReports.find(item => `/reports${item.path}` === req.url)
    if (
      (route && !route.skipNewToken && route.isPrivate) ||
      (routeCms && !routeCms.skipNewToken && routeCms.isPrivate) ||
      (routeReports && !routeReports.skipNewToken && routeReports.isPrivate)
    ) {
      res.set('access_token', new_token);
      res.set('expires_in', expires_in);
    }
    next();
    return
  } catch (error) {
    genericErrorHandler(error, req, res);
  }
};

export default autenticate