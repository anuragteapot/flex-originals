import AXIOS_API from './../api/axios';
import AXIOS_API_SERVER from './../api/axiosServer';
import handleError from './../api/handleError';
import * as types from './../store/mutation-types';

export default {
  UPLOAD_FILE: async (
    { commit, dispatch, state },
    { userId, uploadType, formData },
  ) => {
    try {
      return await AXIOS_API.post(
        `/api/actions/upload/${uploadType}/${userId}`,
        formData,
        {
          retry: 3,
          retryDelay: 1000,
          onUploadProgress: e => {
            state.uploadPercent = Math.round((e.loaded * 100) / e.total);
          },
        },
      );
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  GENERATE_THUMBNAILS: async ({ commit, dispatch, state }, { id }) => {
    try {
      return await AXIOS_API.get(`/api/actions/genrateThumbnail/${id}`);
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  GET_VIDEO: async ({ commit, dispatch, state }, { id }) => {
    try {
      return await AXIOS_API.get(`/api/actions/getVideo/${id}`);
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  GET_AUDIO: async ({ commit, dispatch, state }, { id }) => {
    try {
      return await AXIOS_API.get(`/api/actions/getAudio/${id}`);
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  GET_VIDEO_INFO: async ({ commit, dispatch, state }, { id }) => {
    try {
      return await AXIOS_API.get(`/api/videos/getVideoInfo/${id}`);
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  ADD_VIDEO_COMMENT: async (
    { commit, dispatch, state },
    { userId, replyId, message },
  ) => {
    try {
      return await AXIOS_API.post(`/api/videoComments/comment`, {
        userId,
        replyId,
        message,
      });
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  GET_VIDEO_COMMENT: async ({ commit, dispatch, state }, { id, limit }) => {
    try {
      return await AXIOS_API.get(
        `/api/videoComments/getComments/${id}/${limit}`,
      );
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  EDIT_VIDEO_COMMENT: async (
    { commit, dispatch, state },
    { id, userId, replyId, message },
  ) => {
    try {
      return await AXIOS_API.put(`/api/videoComments/editComments`, {
        id,
        userId,
        replyId,
        message,
      });
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  UPDATE_VIDEO_VIEWS: async ({ commit, dispatch, state }, { id }) => {
    try {
      return await AXIOS_API.post(`/api/videoAnalytics/updateViews`, {
        id,
      });
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  PUBLISH_VIDEO: async ({ commit, dispatch, state }, { id, videoData }) => {
    try {
      return await AXIOS_API.post(
        `/api/videos/publish`,
        { id, videoData },
        {
          retry: 3,
          retryDelay: 1000,
        },
      );
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  PUBLISH_AUDIO: async ({ commit, dispatch, state }, { id, audioData }) => {
    try {
      return await AXIOS_API.post(
        `/api/audios/publish`,
        { id, audioData },
        {
          retry: 3,
          retryDelay: 1000,
        },
      );
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  IS_LOGGED: async ({ commit, dispatch, state }, { userId }) => {
    try {
      return await AXIOS_API.get(`/api/users/${userId}`);
    } catch (error) {
      return new handleError(commit, dispatch, state)._handleError(error);
    }
  },

  GET_CONTENT: async (
    { commit, dispatch, state },
    { userId, limit, isServer },
  ) => {
    try {
      let content = undefined;

      if (isServer) {
        content = await AXIOS_API_SERVER.get(
          `/api/actions/getContent/${limit || 30}/${userId ? userId : ''}`,
        );
      } else {
        content = await AXIOS_API.get(
          `/api/actions/getContent/${limit || 30}/${userId ? userId : ''}`,
        );
      }

      commit(types.SET_CONTENT, content.data);

      if (userId && content.data.user && content.data.settings) {
        commit(types.SET_CONTENT_USER, {
          user: content.data.user,
          settings: content.data.settings,
        });
      }
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

  FIND_SETTINGS: async ({ commit, dispatch, state }, { uid, isServer }) => {
    try {
      let settings = undefined;
      
      
      if (isServer) {
        settings = await AXIOS_API_SERVER.get(`/api/users/findSetting/${uid}`);
      } else {
        settings = await AXIOS_API.get(`/api/users/findSetting/${uid}`);
      }
      
      commit(types.SET_SETTINGS, settings);
      return settings;
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
