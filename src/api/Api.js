/* eslint-disable no-useless-escape */
import utils from './utils';

const helper = new utils();

// const { store } = createApp();
export default class api {
  /**
   * Store constructor
   */
  constructor() {
    const cssRule =
      'color: red;' +
      'font-size: 60px;' +
      'font-weight: bold;' +
      'text-shadow: 1px 1px 5px rgb(249, 162, 34);' +
      'filter: dropshadow(color=rgb(249, 162, 34), offx=1, offy=1);';
    setTimeout(console.log.bind(console, '%cStop!', cssRule), 0);

    if (typeof window !== 'undefined') {
      if (!('Notification' in window)) {
        console.log('This browser does not support notifications!');
        return;
      }

      window.addEventListener('keydown', this.handleFirstTab);

      // if (
      //   window.location.host == 'localhost' ||
      //   window.location.host == 'flexoriginals.ml'
      // ) {
      //   Notification.requestPermission(() => {
      //     //             console.log('Notification permission status:', status);
      //   });
      // }

      if (
        (window.sessionStorage &&
          !window.sessionStorage.getItem('sessionId')) ||
        window.sessionStorage.getItem('sessionId').indexOf('session') === -1
      ) {
        window.sessionStorage.setItem(
          'sessionId',
          `session-${new Date().getTime()}-${helper.randomChars()}`,
        );
      }
    }
  }

  handleFirstTab(e) {
    if (e.keyCode === 9) {
      document.body.classList.add('user-is-tabbing');

      window.removeEventListener('keydown', this.handleFirstTab);
      window.addEventListener('mousedown', this.handleMouseDownOnce);
    }
  }

  handleMouseDownOnce() {
    document.body.classList.remove('user-is-tabbing');

    window.removeEventListener('mousedown', this.handleMouseDownOnce);
    window.addEventListener('keydown', this.handleFirstTab);
  }
}
