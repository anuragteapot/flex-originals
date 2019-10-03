import AXIOS_API from './../api/axios';
import handleError from './../api/handleError';
import * as types from './../store/mutation-types';

export default {
  IS_LOGGED: async ({ commit, dispatch, state }, { userId }) => {
    try {
      return await AXIOS_API.get(`/api/users/${userId}`);
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  GET_CONTENT: async ({ commit, dispatch, state }, payload) => {
    try {
      const content = await AXIOS_API.get(
        `/api/actions/getContent/${payload.limit || 30}/${
          payload.userId ? payload.userId : ''
        }`,
      );

      commit(types.SET_CONTENT, content.data);
      return content;
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  GET_LIKE: async ({ commit, dispatch, state }, payload) => {
    try {
      return await AXIOS_API.get(
        `/api/videoLikes/getLike/${payload.userId}/${payload.videoId}`,
      );
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  LIKE_END_POINT: async ({ commit, dispatch, state }, payload) => {
    try {
      return await AXIOS_API.post(`/api/videoLikes/likeEndPoint`, {
        userId: payload.userId,
        videoId: payload.videoId,
        reaction: payload.reaction,
      });
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  GET_FOLLOWERS: async ({ commit, dispatch, state }, payload) => {
    try {
      return await AXIOS_API.get(
        `/api/follows/getFollowers/${payload.followId}`,
      );
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  UN_FOLLOW: async ({ commit, dispatch, state }, payload) => {
    try {
      return await AXIOS_API.post(`/api/follows/unFollow`, {
        channelId: payload.channelId,
        followId: payload.followId,
      });
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  DO_FOLLOW: async ({ commit, dispatch, state }, payload) => {
    try {
      return await AXIOS_API.post(`/api/follows/doFollow`, {
        channelId: payload.channelId,
        followId: payload.followId,
      });
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  GET_FOLLOW: async ({ commit, dispatch, state }, payload) => {
    try {
      return await AXIOS_API.get(
        `/api/follows/getFollow/${payload.channelId}/${payload.followId}`,
      );
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  GET_USER_STORAGE: async ({ commit, dispatch, state }, payload) => {
    try {
      return await AXIOS_API.get(`/api/actions/getUserStorage/${payload}`);
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  VERIFY: async ({ commit, dispatch, state }, payload) => {
    try {
      return await AXIOS_API.get(
        `/api/users/confirm?uid=${payload.uid}&redirect=${payload.redirect}&token=${payload.token}`,
      );
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  FIND_SETTINGS: async ({ commit, dispatch, state }, payload) => {
    try {
      return await AXIOS_API.get(`/api/users/findSetting/${payload.uid}`);
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  UPDATE_SETTINGS: async ({ commit, dispatch, state }, payload) => {
    try {
      return await AXIOS_API.post(`/api/users/updateSettings`, payload);
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  DELETE_ITEM: async ({ commit, dispatch, state }, payload) => {
    if (payload.type == 'audio') {
      try {
        return await AXIOS_API.post(`/api/audios/deleteItem`, {
          id: payload.id,
        });
      } catch (error) {
        return new handleError(commit, dispatch, state)._handleError(error);
      }
    } else if (payload.type == 'video') {
      try {
        return await AXIOS_API.post(`/api/videos/deleteItem`, {
          id: payload.id,
        });
      } catch (error) {
        return new handleError(commit, dispatch, state)._handleError(error);
      }
    }
  },

  SIGNUP: async ({ commit, dispatch, state }, payload) => {
    try {
      return await AXIOS_API.post('/api/users', payload);
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  UPDATE_VIEWS_AUDIO: async ({ commit, dispatch, state }, payload) => {
    try {
      return await AXIOS_API.post('/api/audioAnalytics/updateViews', {
        id: payload,
      });
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  UPDATE_VIEWS_VIDEO: async ({ commit, dispatch, state }, payload) => {
    try {
      return await AXIOS_API.post('/api/videoAnalytics/updateViews', {
        id: payload,
      });
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  LOGOUT: async ({ commit, dispatch, state }) => {
    try {
      return await AXIOS_API.post('/api/users/logout');
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  LOGIN: async ({ commit, dispatch, state }, payload) => {
    try {
      return await AXIOS_API.post('/api/users/login', payload);
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },
};
