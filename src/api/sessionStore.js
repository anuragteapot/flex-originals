import * as webStorage from './storage';

export default class sessionStore {
  set(key, value) {
    webStorage.session.set(`$store.${key}`, value);
  }

  get(key) {
    return webStorage.session.get(key);
  }
}
