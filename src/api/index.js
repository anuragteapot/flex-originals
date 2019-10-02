import api from './Api';

export default {
  install: function(Vue) {
    Vue.prototype.$api = new api();
  },
};
