import { sync } from 'vuex-router-sync';
import Vue from 'vue';
import App from './App.vue';
import createStore from '@/store';
import createRouter from '@/router';
import Api from './api';
import Snackbar from '@/components/Tool/SnackBar';
import Model from '@/components/Model/Model';
import AudioPlayer from '@/components/Audio/Audio';
import VideoPlayer from '@/components/Video/Video';
import lazyImage from '@/components/LazyImage/LazyImage';
import emojiLike from './components/Emoji/Like';
import emojiLaughing from './components/Emoji/Laughing';
import emojiLove from './components/Emoji/Love';
import emojiSad from './components/Emoji/Sad';
import emojiThinking from './components/Emoji/Thinking';
import emojiAngry from './components/Emoji/Angry';
import emojiNoLike from './components/Emoji/noLike';

import './styles/creator.scss';
import './styles/vendor/nprogress/nprogress.css';

Vue.use(Api);

// Load components
Vue.component('lazySnackBar', Snackbar);
Vue.component('lazyModel', Model);
Vue.component('lazyAudioPlayer', AudioPlayer);
Vue.component('foVideoPlayer', VideoPlayer);
Vue.component('lazyImage', lazyImage);
Vue.component('emojiLike', emojiLike);
Vue.component('emojiLaughing', emojiLaughing);
Vue.component('emojiLove', emojiLove);
Vue.component('emojiSad', emojiSad);
Vue.component('emojiThinking', emojiThinking);
Vue.component('emojiAngry', emojiAngry);
Vue.component('emojiNoLike', emojiNoLike);

export default function createApp() {
  // create store and router instances
  const store = createStore();
  const router = createRouter();

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
