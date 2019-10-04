import * as webStorage from './webStorage';

export default class sessionStore {
  set(key, value) {
    webStorage.local.set(`$store.${key}`, value);
  }

  get(key) {
    return webStorage.local.get(key);
  }
}
