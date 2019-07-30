/** @format */

import { api } from '../app/Api';
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
 * Get contents
 * @param commit
 * @param payload
 */
export const getUserStorage = async (context, payload) => {
  try {
    return await api.axios().get(`/api/actions/getUserStorage/${payload}`);
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
export const deleteItem = async (context, payload) => {
  if (payload.type == 'audio') {
    try {
      return await api
        .axios()
        .post(`/api/audios/deleteItem`, { id: payload.id });
    } catch (err) {
      api._handleError(err);
      return err;
    }
  } else if (payload.type == 'video') {
    try {
      return await api
        .axios()
        .post(`/api/videos/deleteItem`, { id: payload.id });
    } catch (err) {
      api._handleError(err);
      return err;
    }
  }
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
