import { sync } from 'vuex-router-sync';
import Vue from 'vue';
import App from './App.vue';
import createStore from '@/store';
import createRouter from '@/router';
import Api from './api';
// import Snackbar from '@/components/Tool/SnackBar';
// import Model from '@/components/Model/Model';
// import AudioPlayer from '@/components/Audio/Audio';
// import VideoPlayer from '@/components/Video/Video';
// import lazyImage from '@/components/LazyImage/LazyImage';

import './styles/creator.scss';
import './styles/vendor/nprogress/nprogress.css';

// Load components
// Vue.component('lazySnackBar', Snackbar);
// Vue.component('lazyModel', Model);
// Vue.component('lazyAudioPlayer', AudioPlayer);
// Vue.component('foVideoPlayer', VideoPlayer);
// Vue.component('lazyImage', lazyImage);

export default function createApp() {
  // create store and router instances
  const store = createStore();
  const router = createRouter();
  Vue.use(Api, { store, router });

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  return { app, router, store };
}
