/* eslint-disable no-useless-escape */
import utils from './utils';
import createApp from './../main'; 
import * as types from './../store/mutation-types';
// import * as webStorage from './Storage';
// import AXIOS_API from './axios';
// import handleError from './handleError';

const { store, router } = createApp();
export default class Api {
  /**
   * Store constructor
   */
  constructor() {
    this.utils = new utils();

    const cssRule =
      'color: red;' +
      'font-size: 60px;' +
      'font-weight: bold;' +
      'text-shadow: 1px 1px 5px rgb(249, 162, 34);' +
      'filter: dropshadow(color=rgb(249, 162, 34), offx=1, offy=1);';
    setTimeout(console.log.bind(console, '%cStop!', cssRule), 0);

    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.updateOnlineStatus);
      window.addEventListener('offline', this.updateOnlineStatus);

      if (!('Notification' in window)) {
        console.log('This browser does not support notifications!');
        return;
      }

      if (
        window.location.host == 'localhost' ||
        window.location.host == 'flexoriginals.ml'
      ) {
        setTimeout(() => {
          Notification.requestPermission(status => {
            console.log('Notification permission status:', status);
          });
        }, 3000);
      }

      if (
        (window.sessionStorage &&
          !window.sessionStorage.getItem('sessionId')) ||
        window.sessionStorage.getItem('sessionId').indexOf('session') === -1
      ) {
        window.sessionStorage.setItem(
          'sessionId',
          `session-${new Date().getTime()}-${this.utils.randomChars()}`,
        );
      }
    }
  }

  updateOnlineStatus() {
    const state = navigator.onLine || false;

    if (state == true) {
      const data = {
        data: 'You are online',
        color: 'success',
      };

      store.commit(types.SHOW_SNACKBAR, data);
    } else {
      const data = {
        data: 'You are offline',
        color: 'info',
      };

      store.commit(types.SHOW_SNACKBAR, data);
    }
  }

  /**
   * Check for logged in.
   *
   */
  async isLogged() {
    if (
      webStorage.local.get('$accessToken') &&
      webStorage.local.get('$userId')
    ) {
      const userId = webStorage.local.get('$userId');

      if (userId) {
        try {
          const user = await AXIOS_API.get(`/api/users/${userId}`, {
            retry: 50,
            retryDelay: 1000,
          });
          store.commit(types.SET_USER, user.data);
          return true;
        } catch (err) {
          this._handleError(err);
        }
      }
    }

    return false;
  }

  /**
   * Logout
   *
   */
  async logout() {
    try {
      await this.axios().post('/api/users/logout');
    } catch (err) {
      console.log(err);
    }
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
