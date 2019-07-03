import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "./registerServiceWorker";
import Snackbar from "@/components/Tool/SnackBar";
import Model from "@/components/Model/Model";
import AudioPlayer from "@/components/Audio/Audio";
import VideoPlayer from "@/components/Video/Video";
import app from "./app";

import "./styles/creator.scss";

Vue.use(app);

// Load components
Vue.component("lazySnackBar", Snackbar);
Vue.component("lazyModel", Model);
Vue.component("lazyAudioPlayer", AudioPlayer);
Vue.component("lazyVideoPlayer", VideoPlayer);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
