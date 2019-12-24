import * as types from './mutation-types';

export default {
  /**
   * Show the snackbar
   * @param state
   */
  [types.SHOW_SNACKBAR]: (state, payload) => {
    state.showsnackbar.data = '';
    state.showsnackbar.state = true;
    state.showsnackbar.data = payload.data;

    if (payload.color) {
      state.showsnackbar.color = payload.color;
    }

    if (payload.time == 0) {
      state.showsnackbar.time = payload.time;
    }
  },

  /**
   * Hide the snackbar
   * @param state
   */
  [types.SET_CONTENT_USER]: (state, payload) => {
    state.contentUser = payload;
  },

  /**
   * Hide the snackbar
   * @param state
   */
  [types.HIDE_SNACKBAR]: state => {
    state.showsnackbar.state = false;
  },

  /**
   * Hide the snackbar
   * @param state
   */
  [types.SET_SEARCH_QUERY]: (state, payload) => {
    state.search = payload;
  },

  /**
   * Init
   * @param state
   * @param payload
   */
  [types.INIT]: (state, payload) => {
    state.init = payload;
  },

  /**
   * Show modal
   * @param state
   * @param payload
   */
  [types.SHOW_MODAL]: (state, payload) => {
    state.modal.state = true;
    state.modal.type = payload.type || null;
  },

  /**
   * Hide modal
   * @param state
   * @param payload
   */
  [types.HIDE_MODAL]: state => {
    state.modal.state = false;
    state.modal.type = null;
  },

  /**
   * Select a directory
   * @param state
   * @param payload
   */
  [types.SET_USER]: (state, payload) => {
    state.user = payload;
  },

  /**
   * Select a directory
   * @param state
   * @param payload
   */
  [types.SET_FOLLOWING]: (state, payload) => {
    state.following = payload;
  },

  /**
   * Select a directory
   * @param state
   * @param payload
   */
  [types.SET_EDIT_MODE]: (state, payload) => {
    state.editMode = payload;
  },

  /**
   * Select a directory
   * @param state
   * @param payload
   */
  [types.SET_CONTENT]: (state, payload) => {
    state.content = payload;
  },

  /**
   * Set settings
   * @param state
   * @param payload
   */
  [types.SET_SETTINGS]: (state, payload) => {
    state.settings = payload.data;
    state.theme = payload.data.theme;
  },

  /**
   * Show the menu
   * @param state
   */
  [types.APP_DRAWER]: (state, payload) => {
    state.appDrawer = payload;
  },

  /**
   * Show the info bar
   * @param state
   */
  [types.IS_AUTHENTICATED]: (state, payload) => {
    state.isAuthenticated = payload;
  },

  /**
   * Set is mobile
   * @param state
   */
  [types.IS_MOBILE]: (state, payload) => {
    state.isMobile = payload;
  },

  /**
   * Select a browser item
   * @param state
   * @param payload the item
   */
  [types.SELECT_BROWSER_ITEM]: (state, payload) => {
    if (!payload) {
      state.selectedItems = [];
    } else {
      state.selectedItems.push(payload);
    }
  },

  /**
   * Select browser items
   * @param state
   * @param payload the items
   */
  [types.SELECT_BROWSER_ITEMS]: (state, payload) => {
    state.selectedItems = payload;
  },

  /**
   * Unselect a browser item
   * @param state
   * @param payload the item
   */
  [types.UNSELECT_BROWSER_ITEM]: (state, payload) => {
    const item = payload;
    state.selectedItems.splice(
      state.selectedItems.findIndex(
        selectedItem => selectedItem.id === item.id,
      ),
      1,
    );
  },

  /**
   * Unselect all browser items
   * @param state
   * @param payload the item
   */
  // eslint-disable-next-line
  [types.UNSELECT_ALL_BROWSER_ITEMS]: (state, payload) => {
    state.selectAllFile = false;
    state.selectAllFolder = false;
    if (payload) {
      state.selectedItems.splice(
        state.selectedItems.findIndex(file => file.type === payload.type),
      );
    } else {
      state.selectedItems = [];
    }
  },

  /**
   * Player
   * @param state
   * @param payload the items
   */
  [types.SET_PLAYER]: (state, { type, data }) => {
    if (type == 'audio') {
      state.player.audio.data = data;
    } else if (type == 'video') {
      state.player.video.data = data;
    }
  },

  /**
   * Player
   * @param state
   * @param payload the items
   */
  [types.SET_PLAYER_ACTION]: (state, { type, volume, isPlaying }) => {
    if (type == 'audio') {
      state.player.audio.volume = volume;
      state.player.audio.isPlaying = isPlaying;
    } else if (type == 'video') {
      state.player.video.volume = volume;
      state.player.video.isPlaying = isPlaying;
    }
  },
};
