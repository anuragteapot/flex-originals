<template>
  <div class="video-player">
    <video @click="togglePlay" ref="videoViewer" class="player__video viewer" :src="src"></video>
    <div class="player__controls">
      <div class="progress" ref="progress" @click="scrub">
        <div class="progress__filled" :style="`flexBasis:${progressBar}`"></div>
      </div>
      <button class="player__button" title="Toggle Play" @click="togglePlay">
        <i v-show="!isPlaying" class="fa fa-play" aria-hidden="true"></i>
        <i v-show="isPlaying" class="fa fa-pause" aria-hidden="true"></i>
      </button>
      <input type="range" class="player__slider" v-model="volume" min="0" max="1" step="0.05">
      <input
        v-model="playbackRate"
        type="range"
        class="player__slider"
        min="0.5"
        max="2"
        step="0.1"
      >
      <span class="current">{{curTime}}</span> /
      <span class="duration">{{durTime}}</span>
      <button @click="skipBack" class="player__button">
        <i class="fa fa-backward" aria-hidden="true"></i>10s
      </button>
      <button @click="skipForward" class="player__button">
        20s
        <i class="fa fa-forward" aria-hidden="true"></i>
      </button>
      <button class="fullscreen-btn" @click="toggleFullscreen">
        <i class="fa fa-square-o" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "lazy-video",
  data() {
    return {
      isPlaying: false,
      mousedown: false,
      curTime: "00:00",
      durTime: "00:00",
      volume: 0.5,
      progressBar: "0%",
      playbackRate: 1
    };
  },
  props: ["src"],
  watch: {
    volume(val) {
      this.video.volume = val;
    },
    playbackRate(val) {
      this.video.playbackRate = val;
    },
    src(val) {
      this.video.src = val;
      this.video.load();
    }
  },
  computed: {
    video() {
      return this.$refs.videoViewer;
    },
    progress() {
      return this.$refs.progress;
    }
  },
  methods: {
    togglePlay() {
      if (this.video.paused) {
        this.video.play();
        this.isPlaying = true;
      } else {
        this.video.pause();
        this.isPlaying = false;
      }
    },
    scrub(e) {
      const scrubTime =
        (e.offsetX / this.progress.offsetWidth) * this.video.duration;
      this.video.currentTime = scrubTime;
    },
    toggleFullscreen() {
      if (this.video.requestFullScreen) {
        this.video.requestFullScreen();
      } else if (this.video.webkitRequestFullScreen) {
        this.video.webkitRequestFullScreen();
      } else if (this.video.mozRequestFullScreen) {
        this.video.mozRequestFullScreen();
      }
    },
    currentTime() {
      var curmins = Math.floor(this.video.currentTime / 60);
      var cursecs = Math.floor(this.video.currentTime - curmins * 60);
      var durmins = Math.floor(this.video.duration / 60);
      var dursecs = Math.floor(this.video.duration - durmins * 60);
      if (cursecs < 10) {
        cursecs = "0" + cursecs;
      }
      if (dursecs < 10) {
        dursecs = "0" + dursecs;
      }
      if (curmins < 10) {
        curmins = "0" + curmins;
      }
      if (durmins < 10) {
        durmins = "0" + durmins;
      }
      this.curTime = curmins + ":" + cursecs;
      this.durTime = durmins + ":" + dursecs;
    },
    handleProgress() {
      const percent = (this.video.currentTime / this.video.duration) * 100;
      this.progressBar = `${percent}%`;
    },
    detectKeypress(event) {
      if (event.keyCode == 32) {
        this.togglePlay();
      }
    },
    skipBack() {
      this.video.currentTime += parseFloat(-10);
    },
    skipForward() {
      this.video.currentTime += parseFloat(+10);
    }
  },
  mounted() {
    window.addEventListener("keydown", this.detectKeypress);
    this.video.addEventListener("timeupdate", this.currentTime);
    this.video.addEventListener("timeupdate", this.handleProgress);
  },
  destroyed() {
    window.removeEventListener("keydown", this.detectKeypress);
  }
};
</script>
