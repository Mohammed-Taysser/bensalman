import axios, { AxiosInstance } from 'axios';
import { LocalStorage } from './localStorage';
import routes from './routes';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const API_ENDPOINT = SERVER_URL + '/api/method';

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
          request.headers[
            'Authorization'
          ] = `token ${userInfo?.api_key}:${userInfo?.api_secret}`;
        }

        request.headers['Accept-Language'] = 'ar';
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
    return this.axiosInstance.post<AxiosLoginResponse>(
      'alhoda.alhoda.auth.login',
      body
    );
  }

  welcome() {
    return this.axiosInstance.get<AxiosWelcomeResponse>(
      'alhoda.alhoda.apis.home'
    );
  }

  getChairs() {
    return this.axiosInstance.get<AxiosChairResponse>(
      'alhoda.alhoda.apis.get_all_chairs'
    );
  }

  reserveChair(body = {}) {
    return this.axiosInstance.post<AxiosChairReservationResponse>(
      'alhoda.alhoda.apis.create_chair_Reservation',
      body
    );
  }

  getProducts(params?: Record<string, string | null>) {
    return this.axiosInstance.get<AxiosProductsResponse>(
      'alhoda.alhoda.apis.get_item_data',
      {
        params,
      }
    );
  }

  getCategories() {
    return this.axiosInstance.get<AxiosCategoriesResponse>(
      'alhoda.alhoda.apis.get_item_groups'
    );
  }

  getCartItems() {
    return this.axiosInstance.get<AxiosCartDetailsResponse>(
      'alhoda.alhoda.cart.get_cart_details'
    );
  }

  modifyCartQuantity(body = {}) {
    return this.axiosInstance.post<AxiosCartModifyResponse>(
      'alhoda.alhoda.cart.cart_item',
      body
    );
  }

  checkout() {
    return this.axiosInstance.post<AxiosCheckoutResponse>(
      'alhoda.alhoda.cart.submit_cart'
    );
  }
}

const API = new AxiosAPI();

export { API, SERVER_URL };
