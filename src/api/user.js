import * as webStorage from './storage';
import createApp from './../main';
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

  /**
   *
   */
  getUser() {
    return JSON.parse(webStorage.local.get('user'));
  }

  /**
   * Get user Key
   * @param {string} key
   */
  get(key) {
    return JSON.parse(webStorage.local.get(key));
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
    }

    return false;
  }

  /**
   * Logout
   *
   */
  async logout() {
    await store.dispatch('LOGOUT');

    webStorage.local.destroy('$accessToken');
    webStorage.local.destroy('$userId');
    webStorage.local.destroy('user');
    webStorage.local.destroy('created');
    webStorage.local.destroy('ttl');
    store.commit(types.IS_AUTHENTICATED, false);
    store.commit(types.SET_USER, {});
    router.push(redirect);
  }
}
