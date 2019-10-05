import * as webStorage from './webStorage';
import createApp from './../main';
import * as types from './../store/mutation-types';
const { store } = createApp();

export default class user {
  constructor() {}

  /**
   *
   * @param {object} user
   */
  auth(user) {
    webStorage.local.set('created', user.created);
    webStorage.local.set('$accessToken', user.id);
    webStorage.local.set('ttl', user.ttl);
    webStorage.local.set('$userId', user.userId);
    webStorage.local.set('user', JSON.stringify(user));
  }

  setUser(userInfo) {
    webStorage.local.set('userInfo', JSON.stringify(userInfo));
  }

  /**
   *
   */
  getUser() {
    return webStorage.local.get('userInfo')
      ? JSON.parse(webStorage.local.get('userInfo'))
      : {};
  }

  /**
   * Get user Key
   * @param {string} key
   */
  get(key) {
    return webStorage.local.get(key);
  }

  /**
   *
   */
  getSession() {
    return webStorage.session.get('sessionId');
  }

  /**
   * Check for logged in.
   *
   */
  async isLogged() {
    const userId = this.get('$userId');

    if (userId) {
      const user = await store.dispatch('IS_LOGGED', { userId });
      store.commit(types.SET_USER, user.data);
      this.setUser(user.data);
      return true;
    }

    return false;
  }

  /**
   * Logout
   *
   */
  async logout(redirect = '/') {
    try {
      await store.dispatch('LOGOUT');
    } catch (err) {
      window.location.href = redirect;
    }
    webStorage.local.destroy('$accessToken');
    webStorage.local.destroy('$userId');
    webStorage.local.destroy('user');
    webStorage.local.destroy('userInfo');
    webStorage.local.destroy('created');
    webStorage.local.destroy('ttl');
    window.location.href = redirect;
  }
}
