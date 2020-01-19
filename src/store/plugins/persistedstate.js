// The options for persisting state
import * as Cookies from 'js-cookie';

export const persistedStateOptions = {
  key: 'flexoriginals',
  paths: ['authorization', 'theme'],
  storage: {
    getItem: key => Cookies.get(key),
    setItem: (key, value) =>
      Cookies.set(key, value, {
        // eslint-disable-next-line no-undef
        secure: process.env.NODE_ENV === 'production' ? true : false,
      }),
    removeItem: key => Cookies.remove(key),
  },
};
