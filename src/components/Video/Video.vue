<template>
  <div
    :class="`fo-video-player ${!active || error ? 'no-cursor' : ''}`"
    id="video-player"
    ref="player"
    @mousemove="makeActive(); active = true; "
  >
    <div :class="`fo-video-loader`" v-show="loading && !error">
      <svg
        version="1.1"
        id="L9"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enable-background="new 0 0 0 0"
        xml:space="preserve"
      >
        <path
          fill="white"
          d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
    <video v-if="!error" :src="src" class="fo-video-player__media" ref="media" @click="playOrPause"></video>
    <img v-if="error" class="video__error" src="/public/videoerror.gif" />
    <div :class="`fo-video-player-menu volume ${volumesettings ? 'active' : ''}`">
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
      :class="`fo-video-player-menu settings ${opensettingspb || opensettings || opensettingsq ? 'active' : ''}`"
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
    <div :class="`fo-video-player__control-panel ${active ? '' : 'show'}`">
      <div></div>
      <div
        :class="`fo-video-player__seekbar-wrap ${active ? '' : 'show'}`"
        id="video-player-media"
        @mousedown="grabSeekbar"
        @touchstart="grabSeekbar"
        @touchmove="moveSeekbar"
        @touchend="releaseSeekbar"
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
      <div class="fo-video-player__control-wrap" v-show="active">
        <div class="fo-video-player__left">
          <i class="fas fa-step-backward"></i>
          <i v-if="!isPlaying" class="fa fa-play" @click="playOrPause"></i>
          <i v-else class="fa fa-pause" @click="playOrPause"></i>
          <i class="fas fa-step-forward"></i>
          <span class="fo-video-player__time-current">{{ getCurrentTime }} / {{getDuration}}</span>
        </div>
        <div class="fo-video-player__right">
          <i class="far fa-closed-captioning"></i>
          <i class="fas fa-volume-up" @click="volumesettings = !volumesettings"></i>
          <i
            :class="`fas fa-cog ${opensettings ? 'rotate-45' : '' }`"
            @click="opensettings = !opensettings"
          ></i>
          <i class="far fa-clone" @click="pip"></i>
          <i v-if="!fullscreen" class="fas fa-expand" @click="openFullscreen"></i>
          <i v-else class="fas fa-compress" @click="closeFullscreen"></i>
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
  data() {
    return {
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
      duration: 0,
      loading: false,
      bufferPercent: 0,
      isPlaying: false,
      isGrabbingSeekbar: false
    };
  },
  props: {
    src: String,
    disablekey: {
      type: Boolean,
      default: false
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    playbackRates: {
      type: Array,
      default: function() {
        return [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75];
      }
    },
    videoQuality: {
      type: Array,
      default: function() {
        return [
          {
            name: "1080p",
            src:
              "https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"
          }
        ];
      }
    }
  },
  watch: {
    volume(val) {
      this.media.volume = val;
    },
    playbackRate(val) {
      this.media.playbackRate = val;
    },
    src(val) {
      if (this.error) return 0;
      this.loading = true;
      this.media.src = val;
      this.media.load();
    }
  },
  computed: {
    getProgressRate: function() {
      return this.time / this.duration;
    },
    autoPlayNext: {
      get() {
        return this.$store.state.autoplay;
      },
      set(val) {
        this.$store.state.autoplay = val;
      }
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
    }
  },
  methods: {
    async pip() {
      try {
        if (this.media !== document.pictureInPictureElement)
          await this.media.requestPictureInPicture();
        else await document.exitPictureInPicture();
      } catch (error) {
      } finally {
      }
    },
    reset() {
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
      this.media.play();
      this.isPlaying = true;
      this.loop();
    },
    pause: function() {
      this.media.pause();
      this.isPlaying = false;
    },
    playOrPause: function() {
      this.opensettingsq = false;
      this.opensettingspb = false;
      this.opensettings = false;
      this.volumesettings = false;
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
      if (seconds < 10) seconds = "0" + seconds;
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
      // this.loading = false;
      this.time = this.media.currentTime;
    },
    seeking() {
      // this.loading = true;
    },
    skipBack() {
      this.media.currentTime += parseFloat(-5);
    },
    skipForward() {
      this.media.currentTime += parseFloat(+5);
    },
    handleEnded() {
      this.loading = false;
      this.$emit("handleEnded");
    },
    handleProgress() {
      this.loading = false;
    },
    detectKeypress(event) {
      if (this.disablekey) {
        return;
      }
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
    }
  },
  mounted: function() {
    if (this.error) return 0;
    this.reLayoutSeekbar();
    window.addEventListener("resize", debounce(this.reLayoutSeekbar, 100));
    window.addEventListener("click", debounce(this.reLayoutSeekbar, 100));
    window.addEventListener("mousemove", debounce(this.reLayoutSeekbar, 200));
    document.addEventListener("mousemove", event => {
      this.moveSeekbar(event);
    });
    document.addEventListener("mouseup", event => {
      this.releaseSeekbar(event);
    });
    this.media.addEventListener("loadedmetadata", () => {
      this.duration = this.media.duration;
    });
    this.media.addEventListener("ended", () => {
      this.media.currentTime = 0;
      this.isPlaying = false;
    });

    window.addEventListener("keydown", this.detectKeypress);
    this.media.addEventListener("timeupdate", this.handleProgress);
    this.media.addEventListener("ended", this.handleEnded);
    this.media.addEventListener("error", this.handleError);
    this.media.addEventListener("loadeddata", this.loadeddata);
    this.media.addEventListener("loadedmetadata", this.loadedmetadata);
    this.media.addEventListener("progress", this.updateBuffer);
    this.media.addEventListener("stalled", this.stalled);
    this.media.addEventListener("seeking", this.seeking);
    this.media.addEventListener("seeked", this.seeked);
  },
  beforeDestroy() {
    this.pause();
    window.removeEventListener(
      "mousemove",
      debounce(this.reLayoutSeekbar, 200)
    );
    window.removeEventListener("resize", debounce(this.reLayoutSeekbar, 100));
    window.removeEventListener("click", debounce(this.reLayoutSeekbar, 100));
    window.removeEventListener("keydown", this.detectKeypress);
    this.media.removeEventListener("timeupdate", this.currentTime);
    this.media.removeEventListener("timeupdate", this.handleProgress);
    this.media.removeEventListener("ended", this.handleEnded);
    this.media.removeEventListener("error", this.handleError);
    this.media.removeEventListener("loadeddata", this.loadeddata);
    this.media.removeEventListener("loadedmetadata", this.loadedmetadata);
    this.media.removeEventListener("progress", this.updateBuffer);
    this.media.removeEventListener("stalled", this.stalled);
    this.media.removeEventListener("seeking", this.seeking);
    this.media.removeEventListener("seeked", this.seeked);
  }
};
</script>
