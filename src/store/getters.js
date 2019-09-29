export default {
  /**
   * Get the mobile or not ?
   * @param state
   * @returns {*}
   */
  isMobile: state => {
    return state.isMobile;
  },

  /**
   * Get the is loading.
   * @param state
   * @returns {*}
   */
  isLoading: state => {
    return state.isLoading;
  },

  /**
   * Get the is loading.
   * @param state
   * @returns {*}
   */
  theme: state => {
    return state.theme;
  },

  /**
   * Get the is loading.
   * @param state
   * @returns {*}
   */
  appDrawer: state => {
    return state.appDrawer;
  },

  /**
   * Get the is loading.
   * @param state
   * @returns {*}
   */
  isAuthenticated: state => {
    return state.isAuthenticated;
  },
};
