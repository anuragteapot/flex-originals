import * as types from './../store/mutation-types';

export default class handleError {
  constructor(commit, dispatch, state) {
    this.commit = commit;
    this.dispatch = dispatch;
    this.state = state;
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
    let statusCode = 500;

    try {
      errorData = {
        data: error.response.data.error.message,
        color: 'error',
      };
      statusCode = error.response.status;
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
      case 401:
        break;
      case 500:
        break;
    }
    this.commit(types.SHOW_SNACKBAR, errorData);
    throw error;
  }
}
