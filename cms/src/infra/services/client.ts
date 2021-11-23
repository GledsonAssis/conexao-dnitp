import axios from 'axios';
import { EnvsConfig } from '@/infra/config/envs.config';
import Storage from '@/utils/Storage';
import Session from '@/utils/Session';
import privatePaths from '@/infra/services/privatePaths';

const baseURL = EnvsConfig.apiServicoDnit();

const api = axios.create({
  baseURL,
  timeout: 10000000,
});

function authorization(userRole: any, item: any, privatePaths: any) {
  const pathPermissions = privatePaths[item.path];
  const isPathPrivate = pathPermissions !== undefined;
  const rolePermission =
    pathPermissions && pathPermissions.find((permission: { role: any }) => permission.role === userRole.id);
  return rolePermission !== undefined || !isPathPrivate;
}

api.interceptors.request.use(
  (config: any) => {
    const token = Session.getSession();
    const user = Session.getUser();
    const path = window.location.pathname;
    const isAuthorized = authorization(user.role, { path }, privatePaths);
    if (!isAuthorized) {
      window.location.href = EnvsConfig.getPortalFrontAddress();
      return Promise.reject({
        response: {
          data: {
            status: 403,
            data: {
              message: 'not authorized',
            },
          },
        },
      });
    }

    if (token && new Date().getTime() <= +token.expires_in) {
      config.headers.Authorization = `${token.access_token}`;
    } else {
      Session.logout();
    }
    return config;
  },
  (error: any) => Promise.reject(error),
);

api.interceptors.response.use(
  async (response: any) => {
    const token = await Session.getSession()
    if (token && response.headers.access_token) {
      Session.login({
        ...token,
        access_token: response.headers.access_token,
        expires_in: response.headers.expires_in
      })
    }
    return response
  },
  (error: any) => {
    if (error.response && error.response.status === 403) {
      Storage.clear();
      window.location.href = EnvsConfig.getPortalFrontAddress();
    } else {
      return Promise.reject({ error });
    }
  },
);

export default api;
