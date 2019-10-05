import api from './Api';
import user from './user';
import utils from './utils';
import AXIOS_API from './axios';
import nprogress from './nprogress';
import sessionStore from './sessionStore';

export default {
  install: function(Vue) {
    Vue.prototype.$api = new api();
    Vue.prototype.$user = new user();
    Vue.prototype.$axios = AXIOS_API;
    Vue.prototype.$nprogress = nprogress;
    Vue.prototype.$sessionStore = new sessionStore();
    Vue.prototype.$utils = new utils();
  },
};
