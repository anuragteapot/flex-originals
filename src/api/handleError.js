import * as types from './../store/mutation-types';
import * as webStorage from './webStorage';
export default class handleError {
  constructor(commit, dispatch, state) {
    this.commit = commit;
    this.dispatch = dispatch;
    this.state = state;
  }

  /**
   *
   */
  setUser(userInfo) {
    webStorage.local.set('userInfo', JSON.stringify(userInfo));
  }

  /**
   * Handle errors
   * @param error
   */
  _handleError(error) {
    if (!error) {
      console.warn('Error object not defined');
      throw new Error('Error object not defined');
    }

    let errorData = {};
    let statusCode = error.response.status;;

    try {
      errorData = {
        data: error.response.data.error.message,
        color: 'error',
      };
    } catch (err) {
      errorData = {
        data: 'Something went wrong please try again.',
        color: 'error',
      };
    }

    switch (statusCode) {
      case 400:
        break;
      case 404:
        break;
      case 504:
        errorData.data = 'Please wait.'
        errorData.color = null;
        break;
      case 401:
      //  this.commit(types.SHOW_MODAL, { state: true, type: 'MLogin' });
        this.commit(types.SET_USER, {});
        this.setUser({});
        break;
      case 500:
        break;
    }
    this.commit(types.SHOW_SNACKBAR, errorData);
    throw error;
  }
}
