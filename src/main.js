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
import DefaultVideoPlayer from '@/components/Video/DefaultVideoPlayer';
import lazyImage from '@/components/LazyImage/LazyImage';
import emojiLike from './components/Emoji/Like';
import emojiLaughing from './components/Emoji/Laughing';
import emojiLove from './components/Emoji/Love';
import emojiSad from './components/Emoji/Sad';
import emojiThinking from './components/Emoji/Thinking';
import emojiAngry from './components/Emoji/Angry';
import emojiNoLike from './components/Emoji/noLike';
import Play from './components/Svg/Play';
import Forward from './components/Svg/Forward';
import Backward from './components/Svg/Backward';
import Pause from './components/Svg/Pause';
import Screen from './components/Svg/Screen';
import Settings from './components/Svg/Settings';
import Volume from './components/Svg/Volume';
import FullScreen from './components/Svg/FullScreen';
import MiniPlayer from './components/Svg/MiniPlayer';
import Subtitle from './components/Svg/Subtitle';

import './styles/creator.scss';
import './styles/vendor/nprogress/nprogress.css';

Vue.use(Api);

// Load components
Vue.component('foSnackBar', Snackbar);
Vue.component('foModel', Model);
Vue.component('foAudioPlayer', AudioPlayer);
Vue.component('foVideoPlayer', VideoPlayer);
Vue.component('defaultVideoPlayer', DefaultVideoPlayer);
Vue.component('lazyImage', lazyImage);
Vue.component('emojiLike', emojiLike);
Vue.component('emojiLaughing', emojiLaughing);
Vue.component('emojiLove', emojiLove);
Vue.component('emojiSad', emojiSad);
Vue.component('emojiThinking', emojiThinking);
Vue.component('emojiAngry', emojiAngry);
Vue.component('emojiNoLike', emojiNoLike);
Vue.component('foPlay', Play);
Vue.component('foSettings', Settings);
Vue.component('foBackward', Backward);
Vue.component('foSettings', Settings);
Vue.component('foVolume', Volume);
Vue.component('foPause', Pause);
Vue.component('foForward', Forward);
Vue.component('foScreen', Screen);
Vue.component('foFullScreen', FullScreen);
Vue.component('foMiniPlayer', MiniPlayer);
Vue.component('foSubtitle', Subtitle);

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
