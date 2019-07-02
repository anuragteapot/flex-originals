import { api } from "./Api";

export default {
  install: function(Vue) {
    if (process.env.NODE_ENV !== "production") {
      console.log("App installed");
    }
    Vue.prototype.$api = api;
  }
};
