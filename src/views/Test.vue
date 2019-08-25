<template>
  <div
    :class="`p-video-player ${!active ? 'no-cursor' : ''}`"
    id="video-player"
    ref="player"
    @mousemove="makeActive(); active = true; "
  >
    <div :class="`p-video-loader`" v-show="loading">
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
    <video class="p-video-player__media" ref="media" @click="playOrPause">
      <source
        src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"
      />
    </video>
    <div class="p-video-player-menu">
      <nav :class="`${active && opensettings ? 'menu-active' : ''}`">
        <ul v-if="!opensettingspb && !opensettingsq">
          <li>
            <a href="#">
              Auto Play
              <span class="right">
                <label class="switch">
                  <input type="checkbox" />
                  <div></div>
                </label>
              </span>
            </a>
          </li>
          <li>
            <a href="#" @click="opensettingspb = !  opensettingspb">
              Playback Speed
              <span class="right">Normal</span>
            </a>
          </li>
          <li>
            <a href="#" @click="opensettingsq = !opensettingsq">
              Quality
              <span class="right">1080p</span>
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
          <li>
            <a href="#">0.5</a>
          </li>
          <li>
            <a href="#">0.75</a>
          </li>
          <li>
            <a href="#">Normal</a>
          </li>
          <li>
            <a href="#">1.25</a>
          </li>
          <li>
            <a href="#">1.5</a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
        </ul>
      </nav>
    </div>
    <div :class="`p-video-player__control-panel ${active ? '' : 'show'}`">
      <div></div>
      <div
        :class="`p-video-player__seekbar-wrap ${active ? '' : 'show'}`"
        id="video-player-media"
        @mousedown="grabSeekbar"
        @touchstart="grabSeekbar"
        @touchmove="moveSeekbar"
        @touchend="releaseSeekbar"
        ref="seekbar"
      >
        <div
          class="p-video-player__seekbar-current"
          :style="{ transform: &quot;scaleX(&quot; + getProgressRate + &quot;)&quot; }"
        ></div>
        <div class="p-video-player__seekbar-back"></div>
        <div
          class="p-video-player__buffer-back"
          :style="{ transform: &quot;scaleX(&quot; + bufferPercent + &quot;)&quot; }"
        ></div>
      </div>
      <div class="p-video-player__control-wrap" v-show="active">
        <div class="left">
          <i class="fas fa-step-backward"></i>
          <i v-if="!isPlaying" class="fa fa-play" @click="playOrPause"></i>
          <i v-else class="fa fa-pause" @click="playOrPause"></i>
          <i class="fas fa-step-forward"></i>
          <span class="p-video-player__time-current">{{ getCurrentTime }} / {{getDuration}}</span>
        </div>
        <div class="right">
          <i class="fas fa-volume-up" @click="volumesettings = !volumesettings"></i>
          <i
            :class="`fas fa-cog ${opensettings ? 'rotate-45' : '' }`"
            @click="opensettings = !opensettings"
          ></i>
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
      volumesettings: false,
      opensettingsq: false,
      opensettingspb: false,
      opensettings: false,
      fullscreen: false,
      active: true,
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
  computed: {
    getProgressRate: function() {
      return this.time / this.duration;
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
    makeActive: debounce(function() {
      if (this.isPlaying) {
        this.opensettingsq = false;
        this.opensettingspb = false;
        this.opensettings = false;
        this.active = false;
      }
    }, 3000),
    closeFullscreen() {
      this.fullscreen = false;
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
      this.fullscreen = true;
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
    }
  },
  mounted: function() {
    this.reLayoutSeekbar();

    // addEventListener
    window.addEventListener(
      "resize",
      debounce(() => {
        this.reLayoutSeekbar();
      }, 100),
      100
    );
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
  }
};
</script>

<style lang="scss" scoped>
.p-video-player {
  width: 100%;
  position: relative;
  display: block;
  height: 100%;
  cursor: pointer;
  color: white !important;

  &.no-cursor {
    cursor: none;
  }

  .p-video-loader {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 5;
    position: absolute;
    display: inline-block;
    margin: auto;
    height: 100px;
    width: 100px;
  }

  .p-video-player__media {
    display: block;
    width: 100%;
    height: 100%;
    margin: auto;
    background: #000;
    overflow: hidden;
  }

  .p-video-player__seekbar-wrap {
    cursor: pointer;
    position: relative;
    padding: 7px 0;
    top: -10px;

    &.show {
      padding: 0;
    }
  }

  .p-video-player__seekbar-current,
  .p-video-player__seekbar-back,
  .p-video-player__buffer-back {
    height: 3px;
    position: absolute;
    top: 10px;
    right: 0;
    left: 0;
  }

  .p-video-player__buffer-back {
    z-index: 1;
    background-color: rgb(255, 0, 0);
    transform: scaleX(0);
    transform-origin: left;
    background-color: rgba(221, 221, 221, 0.8);
  }
  .p-video-player__seekbar-current {
    z-index: 2;
    background-color: rgb(255, 0, 0);
    transform: scaleX(0);
    transform-origin: left;
  }

  .p-video-player__seekbar-back {
    background-color: rgba(221, 221, 221, 0.4);
  }

  .p-video-player__control-panel {
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px 20px;
    position: absolute;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );

    &.show {
      padding: 3px 0;
      background: transparent;
      transition: bottom 0.5s ease-in-out;
    }
  }

  .p-video-player__control-wrap {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;

    .rotate-45 {
      -webkit-transform: rotate(-90deg);
      -moz-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
      -o-transform: rotate(-90deg);
      transform: rotate(-90deg);
    }

    i {
      margin: 0 10px;
    }
  }

  .p-video-player__time-current {
    margin: 0 0.5em;
  }

  .p-video-player-menu {
    position: absolute;
    bottom: 60px;
    right: 10px;

    .range-slider {
      // Slider
      .input-range {
        -webkit-appearance: none;
        height: 200px;
        border-radius: 5px;
        background: #ccc;
        outline: none;
        writing-mode: bt-lr; /* IE */
        -webkit-appearance: slider-vertical; /* WebKit */
      }
    }

    // Firefox Overrides
    ::-moz-range-track {
      background: #ccc;
      border: 0;
    }

    input::-moz-focus-inner {
      border: 0;
    }

    .switch {
      display: inline-block;
      cursor: pointer;
      font-size: 20px;
      height: 1em;
      width: 2em;
      background: rgb(224, 222, 222);
      border-radius: 1em;

      input {
        position: absolute;
        opacity: 0;
      }

      div {
        height: 1em;
        width: 1em;
        border-radius: 1em;
        background: #fff;
        box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.5);
        -webkit-transition: all 300ms;
        -moz-transition: all 300ms;
        transition: all 300ms;
      }

      input:checked + div {
        -webkit-transform: translate3d(100%, 0, 0);
        -moz-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
        background-color: red;
      }
    }

    nav {
      opacity: 0;
      z-index: -1;
      visibility: hidden;
      background: rgba(32, 32, 32, 1);
      transition: 0.2s ease-out;
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25);
      transform: translateY(50px) scale(0.5);
      transition: 0.2s;
      & a {
        text-decoration: none;
        color: #fff;
        display: block;
        font-size: 12px;
        padding: 10px;
        text-align: left;

        .right {
          float: right;
        }

        &:hover {
          background: darken(#414040, 6%);
          transition: 0.2s ease;
        }
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 220px;
      }
    }

    .menu-active {
      opacity: 1;
      z-index: 6;
      visibility: visible;
      transform: translateY(0);
      transform: translateY(0) scale(1);
      transition: 0.2s;
    }
  }
}
</style>