import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import Snackbar from '@/components/Tool/SnackBar';
import Model from '@/components/Model/Model';
import AudioPlayer from '@/components/Audio/Audio';
import VideoPlayer from '@/components/Video/Video';
import lazyImage from '@/components/LazyImage/LazyImage';
import app from './app/index';
import VueMeta from 'vue-meta';

import './styles/creator.scss';
import './styles/vendor/nprogress/nprogress.css';

Vue.use(app);
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
});

// Load components
Vue.component('lazySnackBar', Snackbar);
Vue.component('lazyModel', Model);
Vue.component('lazyAudioPlayer', AudioPlayer);
Vue.component('foVideoPlayer', VideoPlayer);
Vue.component('lazyImage', lazyImage);

Vue.prototype.$scrollToTop = () => window.scrollTo(0, 0);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
