<template>
  <div
    :class="`fo-video-player ${!active || error ? 'no-cursor' : ''}`"
    ref="player"
    @mousemove="makeActive(); active = true; "
  >
    <div class="fo-video-top">
      <div
        v-show="fullscreen && active"
        class="fo-video__info__fullscreen__title"
      >{{ videoInfo.title}}</div>
      <div class="fo-video-watch-later">
        <img src="/public/tool_svg/018-clock.svg" width="30" />
      </div>
    </div>
    <!-- <div class="fo-video-player-overlay" v-show="!isPlaying && !loading" @click="playOrPause"></div> -->
    <div class="fo-video-player-load-play" v-show="!isPlaying && !loading">
      <a class="video-play-button" @click="playOrPause">
        <span></span>
      </a>
    </div>
    <div :class="`fo-video-loader`" v-show="loading && !error">
      <svg id="catchup-spinner" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" />
      </svg>
    </div>
    <video
      @contextmenu.prevent="openContext"
      v-if="!error"
      :src="src"
      class="fo-video-player__media"
      ref="media"
      @click="playOrPause"
      controlslist="nodownload"
    ></video>
    <img v-if="error" class="video__error" src="/public/videoerror.gif" alt="videoerror" />
    <div
      :class="`fo-video-player-menu context ${opencontextmenu ? 'vactive' : ''}`"
      :style="`top: ${menuTop}px; left: ${menuLeft}px;` "
    >
      <nav :class="`${active && opencontextmenu ? 'menu-active' : ''}`">
        <ul>
          <li>
            <a href="#" @click.prevent="copy('URL')">Copy video URL</a>
          </li>
          <li>
            <a href="#" @click.prevent="copy('URL_TIME')">Copy video URL at current time</a>
          </li>
          <li>
            <a href="#" @click.prevent="copy('EMBED')">Copy embed code</a>
          </li>
        </ul>
      </nav>
    </div>

    <div
      :class="`fo-video-player-menu no__animation seektime ${seekTime ? 'vactive' : ''}`"
      ref="seekTimeLeft"
    >
      <nav :class="`no__animation ${active && seekTime ? 'menu-active' : ''}`">
        <div class="time__preview" :style="`background-image: url('/${videoInfo.thumbImage}')`">
          <div class="time_preview_div">
            <span>{{ seekTime }}</span>
          </div>
        </div>
      </nav>
    </div>
    <div :class="`fo-video-player-menu volume ${volumesettings ? 'vactive' : ''}`">
      <input
        v-model="volume"
        min="0"
        max="1"
        step="0.1"
        class="volumeslider"
        type="range"
        orient="vertical"
      />
    </div>
    <div
      :class="`fo-video-player-menu settings ${opensettingspb || opensettings || opensettingsq ? 'vactive' : ''}`"
    >
      <nav :class="`${active && opensettings ? 'menu-active' : ''}`">
        <ul v-if="!opensettingspb && !opensettingsq">
          <li>
            <a href="#">
              Auto Play
              <span class="fo-video-player__right">
                <label class="switch">
                  <input name="autoplay" v-model="autoPlayNext" type="checkbox" />
                  <div></div>
                </label>
              </span>
            </a>
          </li>
          <li>
            <a @click="opensettingspb = !  opensettingspb">
              Playback Speed
              <span
                class="fo-video-player__right"
              >{{playbackRate == 1 ? 'Normal' : playbackRate + 'x' }}</span>
            </a>
          </li>
          <li>
            <a href="#" @click="opensettingsq = !opensettingsq">
              Quality
              <span class="fo-video-player__right">1080p</span>
            </a>
          </li>
        </ul>
        <ul v-else-if="opensettingsq">
          <li>
            <a href="#" @click="opensettingsq = !  opensettingsq">
              <i class="fas fa-chevron-left"></i> Quality
            </a>
          </li>
          <li>
            <a href="#">1080p</a>
          </li>
          <li>
            <a href="#">720p</a>
          </li>
          <li>
            <a href="#">440p</a>
          </li>
          <li>
            <a href="#">114p</a>
          </li>
        </ul>
        <ul v-else>
          <li>
            <a href="#" @click="opensettingspb = !  opensettingspb">
              <i class="fas fa-chevron-left"></i> Playback Speed
            </a>
          </li>
          <li v-for="rate in playbackRates" :key="rate">
            <a
              @click="playbackRate = rate; opensettingspb = !  opensettingspb;"
            >{{rate == 1 ? 'Normal' : rate + 'x' }}</a>
          </li>
        </ul>
      </nav>
    </div>
    <div :class="`fo-video-player__control-panel`" v-show="active">
      <h1 class="fo-video-player__watch__on" v-show="embed">
        <a
          :href="`https://flexoriginals.ml/app/@watch?v=${videoInfo.id}`"
          target="_blank"
        >Flex Originals</a>
      </h1>
      <div
        :class="`fo-video-player__seekbar-wrap`"
        @mousedown="grabSeekbar"
        @touchstart="grabSeekbar"
        @touchmove="moveSeekbar"
        @touchend="releaseSeekbar"
        @mousemove="getSeekTime"
        @mouseleave="seekTime = null"
        ref="seekbar"
      >
        <div
          class="fo-video-player__seekbar-current"
          :style="{ transform: &quot;scaleX(&quot; + getProgressRate + &quot;)&quot; }"
        ></div>
        <div class="fo-video-player__seekbar-back"></div>
        <div
          class="fo-video-player__buffer-back"
          :style="{ transform: &quot;scaleX(&quot; + bufferPercent + &quot;)&quot; }"
        ></div>
      </div>
      <div class="fo-video-player__control-wrap">
        <div class="fo-video-player__left">
          <fo-backward width="36px" height="36px"></fo-backward>
          <fo-play v-if="!isPlaying" width="36px" height="36px" @click="playOrPause"></fo-play>
          <fo-pause v-else width="36px" height="36px" @click="playOrPause"></fo-pause>
          <fo-forward width="36px" height="36px"></fo-forward>

          <div class="fo-time-display">
            <span class="fo-time-current">{{ getCurrentTime }}</span>
            <span class="fo-time-separator">&nbsp;/&nbsp;</span>
            <span class="fo-time-duration">{{ getDuration }}</span>
          </div>
        </div>
        <div class="fo-video-player__right">
          <fo-subtitle width="36px" height="36px"></fo-subtitle>
          <fo-volume width="36px" height="36px" @click="volumesettings = !volumesettings"></fo-volume>
          <!-- <i
            :class="`fas fa-cog ${opensettings ? 'rotate-45' : '' }`"
            @click="opensettings = !opensettings"
          ></i>-->
          <fo-settings width="36px" height="36px" @click="opensettings = !opensettings"></fo-settings>
          <fo-mini-player width="36px" height="36px" @click="pip"></fo-mini-player>
          <fo-screen v-if="!fullscreen" width="36px" height="36px" @click="openFullscreen"></fo-screen>
          <fo-full-screen v-else width="36px" height="36px" @click="closeFullscreen"></fo-full-screen>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
export default {
  metaInfo() {
    return {
      title: this.videoInfo.title,
      titleTemplate: '%s - Flex Originals!',
      htmlAttrs: {
        lang: 'en',
        amp: true,
      },
      meta: [
        { name: 'description', content: this.videoInfo.description },
        {
          name: 'url',
          content: typeof window != 'undefined' ? window.location.href : '',
        },
        { name: 'og:title', content: this.videoInfo.title },
        { name: 'og:type', content: 'Video' },
        {
          name: 'og:url',
          content: typeof window != 'undefined' ? window.location.href : '',
        },
        { name: 'og:site_name', content: 'Flex Originals' },
        { name: 'og:image', content: '/' + this.videoInfo.thumbImage },
        { name: 'og:description', content: this.videoInfo.description },
        { name: 'og:video', content: '/' + this.videoInfo.videoFile },
        { name: 'og:video:type', content: 'video/mp4' },
        { name: 'og:video:height', content: '400' },
        { name: 'og:video:width', content: '600' },
      ],
    };
  },
  data() {
    return {
      opencontextmenu: false,
      seekTimeLeft: 0,
      menuLeft: 0,
      menuTop: 0,
      volume: 1,
      volumesettings: false,
      opensettingsq: false,
      opensettingspb: false,
      opensettings: false,
      fullscreen: false,
      active: true,
      hasEnded: false,
      playbackRate: 1,
      seekbarWidth: 0,
      seekbarOffsetX: 0,
      time: 0,
      seekTime: null,
      duration: 0,
      loading: true,
      bufferPercent: 0,
      isPlaying: false,
      isGrabbingSeekbar: false,
    };
  },
  props: {
    src: String,
    disablekey: {
      type: Boolean,
      default: false,
    },
    autoPlay: {
      type: Boolean,
      default: false,
    },
    embed: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    playbackRates: {
      type: Array,
      default: function() {
        return [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75];
      },
    },
    videoInfo: {
      type: Object,
      default: function() {
        return {};
      },
    },
    videoQuality: {
      type: Array,
      default: function() {
        return [
          {
            name: '1080p',
            src:
              'https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164',
          },
        ];
      },
    },
  },
  watch: {
    volume(val) {
      this.media.volume = val;
    },
    playbackRate(val) {
      this.media.playbackRate = val;
    },
    src(val) {
      if (this.error || !val) return 0;
      this.loading = true;
      this.isPlaying = false;
      this.media.src = val;
      if (this.$route.query.t) {
        this.media.currentTime = this.$route.query.t;
      }
      this.media.load();
    },
  },
  computed: {
    getProgressRate: function() {
      return this.time / this.duration;
    },
    search() {
      return this.$store.state.search;
    },
    autoPlayNext: {
      get() {
        return this.$store.state.autoplay;
      },
      set(val) {
        this.$store.state.autoplay = val;
      },
    },
    getCurrentTime: function() {
      return this.convertSecondsToTime(this.time);
    },
    getDuration: function() {
      return this.convertSecondsToTime(this.duration);
    },
    media: function() {
      return this.$refs.media;
    },
    seekbar: function() {
      return this.$refs.seekbar;
    },
  },
  methods: {
    getSeekTime(event) {
      const time = (event.layerX / this.seekbarWidth) * this.duration;
      this.seekTime = this.convertSecondsToTime(time);
      this.seekbarOffsetX = this.seekbar.getBoundingClientRect().left;
      const seekbarRight = this.$refs.player.clientWidth;
      const min = 20;
      const max = seekbarRight - 210;
      let value = 0;
      if (event.pageX - this.seekbarOffsetX - 75 < min) value = min;
      else if (event.pageX - this.seekbarOffsetX - 75 > max) value = max;
      else value = event.pageX - this.seekbarOffsetX - 75;
      this.$refs.seekTimeLeft.style.left = value + 'px';
    },
    copy(type) {
      const el = document.createElement('textarea');

      if (type == 'URL') {
        el.value = window.location.href;
      } else if (type == 'URL_TIME') {
        el.value = `${window.location.href}&t=${parseInt(this.time)}`;
      } else if (type == 'EMBED') {
        el.value = `<iframe width="950" height="550" 
        src="https://${window.location.hostname}/embed/${this.$route.query.v}" 
        frameborder="0" allow="accelerometer; autoplay; 
        encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      }

      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false;
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
      this.opencontextmenu = false;
    },
    openContext(event) {
      this.menuTop = event.offsetY;
      this.menuLeft = event.offsetX;
      this.opencontextmenu = true;
    },
    async pip() {
      try {
        if (this.media !== document.pictureInPictureElement)
          await this.media.requestPictureInPicture();
        else await document.exitPictureInPicture();
      } catch (error) {
        console.log(error);
      } finally {
        console.log('Mini Video');
      }
    },
    reset() {
      this.opencontextmenu = false;
      this.opensettingsq = false;
      this.opensettingspb = false;
      this.opensettings = false;
      this.volumesettings = false;
      this.active = false;
    },
    makeActive: debounce(function() {
      if (this.isPlaying) {
        this.reset();
      }
    }, 5000),
    closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
    },
    openFullscreen() {
      if (this.$refs.player.requestFullScreen) {
        this.$refs.player.requestFullScreen();
      } else if (this.$refs.player.webkitRequestFullScreen) {
        this.$refs.player.webkitRequestFullScreen();
      } else if (this.$refs.player.mozRequestFullScreen) {
        this.$refs.player.mozRequestFullScreen();
      }
    },
    play: function() {
      this.media.pause();
      const playPromise = this.media.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Automatic playback started!
            // Show playing UI.
            this.isPlaying = true;
            this.loop();
          })
          .catch(() => {
            // Auto-play was prevented
            // Show paused UI.
          });
      }
    },
    pause: function() {
      this.media.pause();
      this.isPlaying = false;
    },
    playOrPause: function() {
      if (
        this.opensettingsq ||
        this.opensettingspb ||
        this.opensettings ||
        this.volumesettings ||
        this.opencontextmenu
      ) {
        this.opensettingsq = false;
        this.opensettingspb = false;
        this.opensettings = false;
        this.volumesettings = false;
        this.opencontextmenu = false;
        return false;
      }
      if (this.isPlaying) {
        this.active = true;
        this.pause();
      } else {
        this.makeActive();
        this.play();
      }
    },
    loop: function() {
      this.time = this.media.currentTime;
      if (!this.isPlaying) return;
      this.loading = false;
      requestAnimationFrame(() => {
        this.loop();
      });
    },
    grabSeekbar: function(event) {
      event.preventDefault();
      this.isGrabbingSeekbar = true;
      this.time = this.media.currentTime =
        (event.layerX / this.seekbarWidth) * this.duration;
      this.media.pause();
    },
    moveSeekbar: function(event) {
      event.preventDefault();
      if (!this.isGrabbingSeekbar) return;
      this.time = this.media.currentTime =
        ((event.clientX - this.seekbarOffsetX - window.pageXOffset) /
          this.seekbarWidth) *
        this.duration;
    },
    releaseSeekbar: function(event) {
      event.preventDefault();
      this.isGrabbingSeekbar = false;
      if (this.isPlaying) {
        this.media.play();
      }
    },
    reLayoutSeekbar: function() {
      if (window.innerHeight == screen.height) {
        this.fullscreen = true;
      } else {
        this.fullscreen = false;
      }

      this.seekbarWidth = this.seekbar.clientWidth;
      this.seekbarOffsetX = this.seekbar.getBoundingClientRect().left;
    },
    convertSecondsToTime: function(time) {
      let seconds = Math.floor(time % 60);
      if (seconds < 10) seconds = '0' + seconds;
      let minutes = Math.floor((time / 60) % 60);
      return `${minutes}:${seconds}`;
    },
    stalled() {
      this.loading = true;
    },
    setPlayBackRates(val) {
      this.media.playbackRate = val;
      this.playbackRate = val;
    },
    updateBuffer() {
      if (
        this.media &&
        this.media.buffered &&
        this.media.buffered.length > 0 &&
        this.media.buffered.end &&
        this.media.duration
      ) {
        this.bufferPercent =
          this.media.buffered.end(this.media.buffered.length - 1) /
          this.media.duration;
      } else if (
        this.media &&
        this.media.bytesTotal != undefined &&
        this.media.bytesTotal > 0 &&
        this.media.bufferedBytes != undefined
      ) {
        this.bufferPercent = this.media.bufferedBytes / this.media.bytesTotal;
      }
    },
    seeked() {
      this.loading = false;
      this.time = this.media.currentTime;
    },
    seeking() {
      this.loading = true;
    },
    skipBack() {
      this.media.currentTime += parseFloat(-5);
    },
    skipForward() {
      this.media.currentTime += parseFloat(+5);
    },
    handleEnded() {
      this.loading = false;
      this.media.currentTime = 0;
      this.isPlaying = false;
      this.$emit('handleEnded');
    },
    handleError() {
      // this.error = true;
    },
    handleProgress() {
      if (
        Math.floor(this.time) >= Math.floor(this.duration / 2) - 5 &&
        Math.floor(this.time) <= Math.ceil(this.duration / 2) + 5
      ) {
        if (Math.floor(this.time) != 0) {
          this.$emit('halfTime');
        }
      }
    },
    detectKeypress(event) {
      if (this.disablekey) {
        return false;
      }
      if (this.search != '') return false;
      if (event.keyCode == 32) {
        event.preventDefault();
        this.playOrPause();
      } else if (event.keyCode == 39) {
        event.preventDefault();
        this.skipForward();
      } else if (event.keyCode == 37) {
        event.preventDefault();
        this.skipBack();
      }
    },
    loadeddata() {
      if (this.error) return 0;
      if (this.autoPlay) {
        this.makeActive();
        this.play();
      }
    },
    loadedmetadata() {
      this.duration = this.media.duration;
    },
  },
  mounted: function() {
    if (this.error) return 0;
    this.reLayoutSeekbar();

    document.addEventListener('mousemove', event => {
      this.moveSeekbar(event);
    });
    document.addEventListener('mouseup', event => {
      this.releaseSeekbar(event);
    });

    if (typeof window != 'undefined') {
      window.addEventListener('click', debounce(this.reLayoutSeekbar, 100));
      window.addEventListener('mousemove', debounce(this.reLayoutSeekbar, 200));
      window.addEventListener('resize', debounce(this.reLayoutSeekbar, 100));
      window.addEventListener('keydown', this.detectKeypress);
    }
    this.media.addEventListener('timeupdate', this.handleProgress);
    this.media.addEventListener('ended', this.handleEnded);
    this.media.addEventListener('error', this.handleError);
    this.media.addEventListener('loadeddata', this.loadeddata);
    this.media.addEventListener('loadedmetadata', this.loadedmetadata);
    this.media.addEventListener('progress', this.updateBuffer);
    this.media.addEventListener('stalled', this.stalled);
    this.media.addEventListener('seeking', this.seeking);
    this.media.addEventListener('seeked', this.seeked);
  },
  beforeDestroy() {
    this.pause();
    if (typeof window != 'undefined') {
      window.removeEventListener(
        'mousemove',
        debounce(this.reLayoutSeekbar, 200),
      );
      window.removeEventListener('resize', debounce(this.reLayoutSeekbar, 100));
      window.removeEventListener('click', debounce(this.reLayoutSeekbar, 100));
      window.removeEventListener('resize', debounce(this.reLayoutSeekbar, 100));
      window.removeEventListener('keydown', this.detectKeypress);
    }
    this.media.removeEventListener('timeupdate', this.currentTime);
    this.media.removeEventListener('timeupdate', this.handleProgress);
    this.media.removeEventListener('ended', this.handleEnded);
    this.media.removeEventListener('error', this.handleError);
    this.media.removeEventListener('loadeddata', this.loadeddata);
    this.media.removeEventListener('loadedmetadata', this.loadedmetadata);
    this.media.removeEventListener('progress', this.updateBuffer);
    this.media.removeEventListener('stalled', this.stalled);
    this.media.removeEventListener('seeking', this.seeking);
    this.media.removeEventListener('seeked', this.seeked);
  },
};
</script>
