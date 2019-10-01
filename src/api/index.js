import api from './Api';

export default {
  install: function(Vue, options) {
    Vue.prototype.$api = new api(options.store, options.router);
  },
};
