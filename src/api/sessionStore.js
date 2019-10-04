import * as webStorage from './storage';

export default class sessionStore {
  set(key, value) {
    webStorage.local.set(`$store.${key}`, value);
  }

  get(key) {
    return webStorage.local.get(key);
  }
}
