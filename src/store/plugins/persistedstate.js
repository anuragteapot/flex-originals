// The options for persisting state
export const persistedStateOptions = {
  key: 'creater',
  paths: [
    'token',
    'appDrawer',
    'isAuthenticated',
  ],
  storage: window.sessionStorage
}
