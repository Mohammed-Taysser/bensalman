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

export { isUserAuth, isRouteAUth };
