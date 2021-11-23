import axios, { AxiosRequestConfig } from 'axios';
import { EnvsConfig } from '@/infra/config/envs.config';
import Storage from '@/utils/Storage';

const baseURL = EnvsConfig.getAuthUrl();

const api = axios.create({
  baseURL,
  timeout: 1000,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const params = new URLSearchParams();
    const bodyJson = {
      ...config.data,
      client_id: 'portal-front',
      client_secret: 'secret',
      grant_type: 'password',
      scope: 'api-data',
    };

    Object.entries(bodyJson).forEach(([key, value]) => {
      params.append(key, String(value));
    });

    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.data = params;
    return config;
  },
  (error: any) => Promise.reject(error),
);

api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response && error.response.status === 400) {
      Storage.clear();
      window.location.href = EnvsConfig.getPortalFrontAddress();
    } else {
      Promise.reject({ error });
    }
  }
);

export default api;
