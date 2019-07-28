/** @format */

import { api } from '../app/Api';
import * as types from './mutation-types';
import * as FileSaver from 'file-saver';

/**
 * Get contents
 * @param commit
 * @param payload
 */
export const getContent = async (context, payload) => {
  try {
    return await api
      .axios()
      .get(
        `/api/actions/getContent/${payload.limit || 30}/${
          payload.userId ? payload.userId : ''
        }`
      );
  } catch (err) {
    api._handleError(err);
  }
};
/**
 * Login
 * @param commit
 * @param payload
 */
export const login = async (context, payload) => {
  try {
    return await api.axios().post('/api/users/login', payload);
  } catch (err) {
    api._handleError(err);
  }
};

/**
 * Logout
 * @param commit
 * @param payload
 */
export const logout = async () => {
  try {
    return await api.axios().post('/api/users/logout');
  } catch (err) {
    api._handleError(err);
  }
};

/**
 * Verify
 * @param commit
 * @param payload
 */
export const verify = async (context, payload) => {
  try {
    return await api
      .axios()
      .get(
        `/api/users/confirm?uid=${payload.uid}&redirect=${payload.redirect}&token=${payload.token}`
      );
  } catch (err) {
    api._handleError(err);
  }
};

/**
 * Get Settings
 * @param commit
 * @param payload
 */
export const findSettings = async (context, payload) => {
  try {
    return await api.axios().get(`/api/users/findSetting/${payload.uid}`);
  } catch (err) {
    api._handleError(err);
  }
};

/**
 * Get Settings
 * @param commit
 * @param payload
 */
export const updateSettings = async (context, payload) => {
  try {
    await api.axios().post(`/api/users/updateSettings`, payload);
  } catch (err) {
    api._handleError(err);
  }
};

/**
 * Delete file
 * @param commit
 * @param payload
 */
export const deleteFile = (context, payload) => {
  const file = payload;
  return new Promise((resolve, reject) => {
    api
      .axios()
      .delete('/api/delete/' + file.path)
      .then(response => {
        context.state.showConfirmDeleteModal = false;
        resolve(response);
      })
      .catch(error => {
        api._handleError(error);
        reject(error);
      });
  });
};

/**
 * Create directory
 * @param commit
 * @param payload
 */
export const createDirectory = (context, payload) => {
  context.commit(types.SET_IS_LOADING, true);
  const path = context.state.selectedDirectory;
  api
    .axios()
    .put(`/api/createDirectory/${path}`, payload)
    .then(response => {
      var data = {
        data: response.data.message,
        color: 'success'
      };
      context.state.showCreateFolderModal = false;
      context.commit(types.SHOW_SNACKBAR, data);
      context.dispatch('update', {
        path: context.state.selectedDirectory
      });
    })
    .catch(error => {
      api._handleError(error);
    });

  context.commit(types.SET_IS_LOADING, false);
};

/**
 * Rename
 * @param commit
 * @param payload
 */
export const rename = (context, payload) => {
  context.commit(types.SET_IS_LOADING, true);
  api
    .axios()
    .put(`/api/rename/${payload.path}`, payload)
    .then(response => {
      var data = {
        data: response.data.message,
        color: 'success'
      };
      context.state.showRenameModal = false;
      context.commit(types.SHOW_SNACKBAR, data);
      context.dispatch('update', {
        path: context.state.selectedDirectory
      });
    })
    .catch(error => {
      api._handleError(error);
    });
  context.commit(types.SET_IS_LOADING, false);
};

/**
 * Signiup
 *
 * @param commit
 * @param payload
 */
export const signup = async (context, payload) => {
  try {
    return await api.axios().post('/api/users', payload);
  } catch (err) {
    api._handleError(err);
  }
};

/**
 * Download a file
 * @param context
 * @param payload
 */
export const download = (context, payload) => {
  var data = {
    data: 'Preparing download.',
    color: 'default',
    time: 0
  };

  context.commit(types.SHOW_SNACKBAR, data);

  if (payload.length == 1) {
    api
      .axios()
      .get(payload[0].filePath, {
        responseType: 'blob'
      })
      .then(response => {
        FileSaver.saveAs(new Blob([response.data]), payload[0].name);
        context.commit(types.HIDE_SNACKBAR);
      })
      .catch(error => {
        api._handleError(error);
      });
  } else {
    const path = context.state.selectedDirectory;

    api
      .axios()
      .post(
        `/api/batch/${path}`,
        {
          files: payload
        },
        {
          responseType: 'blob'
        }
      )
      .then(response => {
        FileSaver.saveAs(
          new Blob([response.data]),
          'Media_Drive_' + new Date() + '.zip'
        );
        context.commit(types.HIDE_SNACKBAR);
      })
      .catch(error => {
        api._handleError(error);
      });
  }
};
