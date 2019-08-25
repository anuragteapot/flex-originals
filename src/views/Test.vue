<template>
  <div
    :class="`p-video-player ${!active ? 'no-cursor' : ''}`"
    id="video-player"
    ref="player"
    @mousemove="makeActive(); active = true; "
  >
    <div class="p-video-loader" v-show="loading">
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
    <video class="p-video-player__media" ref="media">
      <source src="http://www.tplh.net/file/sample.mp4" />
    </video>
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
          <i class="fas fa-cog"></i>
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
      if (this.isPlaying) {
        this.active = true;
        this.pause();
      } else {
        this.makeActive();
        this.play();
      }
    },
    stop: function() {
      this.pause();
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
        this.bufferPercent = this.media.buffered.end(0) / this.media.duration;
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
      this.updateBuffer();
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
    handleEnded(){
      
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
      this.$api.debounce(() => {
        this.reLayoutSeekbar();
      }),
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
  height: 100%;
  color: white !important;

  &.no-cursor {
    cursor: none;
  }

  .p-video-loader {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 100px;
    width: 100px;
  }

  .p-video-player__media {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    margin: auto;
    background: #000;
    font-size: 13px;
    overflow: hidden;
    font-family: Arial;
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
    background-color: rgb(112, 110, 110);
  }
  .p-video-player__seekbar-current {
    z-index: 2;
    background-color: rgb(255, 0, 0);
    transform: scaleX(0);
    transform-origin: left;
  }

  .p-video-player__seekbar-back {
    background-color: #ddd;
  }

  .p-video-player__control-panel {
    top: -40px;
    padding: 0 20px;
    position: relative;

    &.show {
      top: -3px;
      padding: 0;
      transition: top 0.3s ease-in-out;
    }
  }

  .p-video-player__control-wrap {
    padding: 0 10px;
    font-size: 15px;
    display: flex;
    justify-content: space-between;

    i {
      margin: 0 10px;
    }
  }

  .p-video-player__time-current {
    margin: 0 0.5em;
  }
}
</style>