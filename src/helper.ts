import axios, { AxiosError } from 'axios';
import { BiHome } from 'react-icons/bi';
import { LuExternalLink } from 'react-icons/lu';
import { MdManageHistory, MdOutlineMenuBook } from 'react-icons/md';
import { PiShoppingCartDuotone } from 'react-icons/pi';
import { TbReportSearch } from 'react-icons/tb';
import { SERVER_URL } from './core/config';
import i18n from './core/i18n';
import store from './redux/store';

/**
 * The function checks if the user is authenticated by verifying if the API key and
 * API secret are present in the store's auth data.
 * @returns a boolean value. It returns true if both `auth.data.api_key` and
 * `auth.data.api_secret` are truthy values, otherwise it returns false.
 */
function isUserAuth() {
  const { auth } = store.getState();

  if (auth.data.api_key && auth.data.api_secret) {
    return true;
  }

  return false;
}

/**
 * The function checks if a given route requires authentication based on the routes
 * stored in the application's state.
 * @param {string} path - A string representing the route path that needs to be
 * checked for authentication.
 * @returns The function isRouteAuth is returning a boolean value. It returns true
 * if the given path is included in the routes array stored in the auth.data
 * object, and false otherwise.
 */
function isRouteAUth(path: string) {
  const { auth } = store.getState();

  if (auth.data.routes.includes(path)) {
    return true;
  }

  return false;
}

/**
 * The function `getErrorMessage` returns an error message based on the given Axios
 * error object.
 * @param error - The `error` parameter is an AxiosError object, which is an error
 * object specific to the Axios library. It contains information about the error
 * that occurred during an HTTP request, such as the error message, status code,
 * and response data.
 * @returns an error message based on the provided AxiosError object. If the error
 * object has a response data with a message property, that message is returned. If
 * the error message is "Network Error", it returns a specific error message
 * related to internet connection. If the error message is "Request aborted", it
 * returns a specific error message related to a canceled request. If none of these
 * conditions are met
 */
function getErrorMessage(err: unknown) {
  const error = err as AxiosError<ResponseError>;

  if (!error) {
    return null;
  }

  if (axios.isAxiosError(error)) {
    if (error?.message === 'Network Error') {
      return i18n.t('please-check-your-internet-connection-and-try-again');
    }

    if (error?.message === 'Request aborted') {
      return i18n.t('request-had-been-canceled');
    }

    if (error?.response?.data?.message) {
      return error?.response?.data?.message;
    }
  }

  return i18n.t('error-has-occurred');
}

const getIcon = (path: string) => {
  switch (path) {
    case '/':
      return BiHome;
    case '/menu':
      return MdOutlineMenuBook;

    case '/cart':
      return PiShoppingCartDuotone;

    case '/reservation':
      return TbReportSearch;

    case '/orders':
      return MdManageHistory;

    default:
      return LuExternalLink;
  }
};

function getImageUrl(slug: string) {
  return SERVER_URL + slug;
}

function getOrderStatusIndex(status: CartStatus) {
  switch (status) {
    case 'Ordered':
      return 0;
    case 'Prepare':
      return 1;
    case 'Completed':
      return 2;
    case 'On Table':
      return 3;
    default:
      return 0;
  }
}

export {
  getErrorMessage,
  getIcon,
  getImageUrl,
  getOrderStatusIndex,
  isRouteAUth,
  isUserAuth
};

