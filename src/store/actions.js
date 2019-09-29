import AXIOS_API from './../api/axios';

export default {
  GET_CONTENT: async (state, payload) => {
    try {
      return await AXIOS_API.get(
        `/api/actions/getContent/${payload.limit || 30}/${
          payload.userId ? payload.userId : ''
        }`,
      );
    } catch (err) {
      console.log(err);
    }
  },

  GET_LIKE: async (context, payload) => {
    try {
      return await AXIOS_API.get(
        `/api/videoLikes/getLike/${payload.userId}/${payload.videoId}`,
      );
    } catch (err) {
      console.log(err);
    }
  },

  LIKE_END_POINT: async (context, payload) => {
    try {
      return await AXIOS_API.post(`/api/videoLikes/likeEndPoint`, {
        userId: payload.userId,
        videoId: payload.videoId,
        reaction: payload.reaction,
      });
    } catch (err) {
      console.log(err);
    }
  },

  GET_FOLLOWERS: async (context, payload) => {
    try {
      return await AXIOS_API.get(
        `/api/follows/getFollowers/${payload.followId}`,
      );
    } catch (err) {
      console.log(err);
    }
  },

  UN_FOLLOW: async (context, payload) => {
    try {
      return await AXIOS_API.post(`/api/follows/unFollow`, {
        channelId: payload.channelId,
        followId: payload.followId,
      });
    } catch (err) {
      console.log(err);
    }
  },

  DO_FOLLOW: async (context, payload) => {
    try {
      return await AXIOS_API.post(`/api/follows/doFollow`, {
        channelId: payload.channelId,
        followId: payload.followId,
      });
    } catch (err) {
      console.log(err);
    }
  },

  GET_FOLLOW: async (context, payload) => {
    try {
      return await AXIOS_API.get(
        `/api/follows/getFollow/${payload.channelId}/${payload.followId}`,
      );
    } catch (err) {
      console.log(err);
    }
  },

  GET_USER_STORAGE: async (context, payload) => {
    try {
      return await AXIOS_API.get(`/api/actions/getUserStorage/${payload}`);
    } catch (err) {
      console.log(err);
    }
  },

  LOGIN: async (context, payload) => {
    try {
      return await AXIOS_API.post('/api/users/login', payload);
    } catch (err) {
      console.log(err);
    }
  },

  LOGOUT: async () => {
    try {
      return await AXIOS_API.post('/api/users/logout');
    } catch (err) {
      console.log(err);
    }
  },

  VERIFY: async (context, payload) => {
    try {
      return await AXIOS_API.get(
        `/api/users/confirm?uid=${payload.uid}&redirect=${payload.redirect}&token=${payload.token}`,
      );
    } catch (err) {
      console.log(err);
    }
  },

  FIND_SETTINGS: async (context, payload) => {
    try {
      return await AXIOS_API.get(`/api/users/findSetting/${payload.uid}`);
    } catch (err) {
      console.log(err);
    }
  },

  UPDATE_SETTINGS: async (context, payload) => {
    try {
      return await AXIOS_API.post(`/api/users/updateSettings`, payload);
    } catch (err) {
      console.log(err);
    }
  },

  DELETE_ITEM: async (context, payload) => {
    if (payload.type == 'audio') {
      try {
        return await AXIOS_API.post(`/api/audios/deleteItem`, {
          id: payload.id,
        });
      } catch (err) {
        console.log(err);
      }
    } else if (payload.type == 'video') {
      try {
        return await AXIOS_API.post(`/api/videos/deleteItem`, {
          id: payload.id,
        });
      } catch (err) {
        console.log(err);
      }
    }
  },

  SIGNUP: async (context, payload) => {
    try {
      return await AXIOS_API.post('/api/users', payload);
    } catch (err) {
      console.log(err);
    }
  },
};
