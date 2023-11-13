import axios, { AxiosInstance } from 'axios';
import { LocalStorage } from './localStorage';
import routes from './routes';

const API_ENDPOINT = 'http://192.168.1.64:8002/api/method';

class AxiosAPI {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_ENDPOINT,
    });

    this.axiosInstance.interceptors.request.use(
      async (request) => {
        const userInfo = LocalStorage.get<AuthUser>('authUser');

        if (request.url !== 'alhoda.alhoda.auth.login') {
          request.headers.authorization = `token ${userInfo?.api_key}:${userInfo?.api_secret}`;
        }

        request.headers['Content-Type'] = 'application/json';

        return request;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      async (error) => {
        const userInfo = LocalStorage.get<AuthUser>('authUser');

        if (userInfo && (!userInfo.api_key || !userInfo.api_secret)) {
          routes.navigate('/login');
        }

        return Promise.reject(error);
      }
    );
  }

  login(body = {}) {
    return this.axiosInstance.post('alhoda.alhoda.auth.login', body);
  }
}

const API = new AxiosAPI();

export { API };
