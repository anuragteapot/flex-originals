import { api } from "./Api";

export default {
  install: function(Vue, clientConfig) {
    if (process.env.NODE_ENV !== "production") {
      console.log(clientConfig);
      console.log("App installed");
    }
    Vue.prototype.$api = api;
  }
};
