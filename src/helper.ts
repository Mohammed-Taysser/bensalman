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

export { isUserAuth };
