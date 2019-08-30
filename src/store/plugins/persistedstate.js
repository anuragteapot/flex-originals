// The options for persisting state
export const persistedStateOptions = {
  key: 'flexoriginals',
  paths: [
    'token',
    'appDrawer',
    'isAuthenticated',
    'user',
    'theme',
    'autoplay'
  ],
  storage: window.localStorage
}
