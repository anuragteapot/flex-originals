<template>
  <div
    :class="`video ${videoActive || !isPlaying ? 'active' : ''}`"
    ref="player"
    @mouseover="videoActive = true"
    @mouseleave="videoActive = false"
  >
    <video
      :src="src"
      :style="`${loading ? 'opacity: 0.1!important;' : ''}`"
      class="visible"
      ref="videoViewer"
      @click="togglePlay"
    ></video>
    <span :class="`large-play ${!isPlaying && !loading ? '' : 'hidden'}`">
      <i @click="togglePlay" class="fa fa-play" aria-hidden="true"></i>
    </span>
    <div v-show="loading" class="loader-2 center">
      <span></span>
    </div>
    <div :class="`control-bar ${videoActive || !isPlaying ? 'active' : ''}`">
      <div class="button-bar">
        <i v-show="!isPlaying" @click="togglePlay" class="fa fa-play" aria-hidden="true"></i>
        <i v-show="isPlaying" @click="togglePlay" class="fa fa-pause" aria-hidden="true"></i>
        <div
          :class="`volume ${audioActive ? 'shift' : ''}`"
          @mouseover="audioActive = true"
          @mouseleave="audioActive = false"
        >
          <i class="fa fa-volume-up toggle" aria-hidden="true"></i>
          <div class="rail" ref="rail" @click="findVolume">
            <div ref="inaudible" class="inaudible"></div>
            <div ref="audible" class="audible"></div>
            <div ref="grip" class="grip"></div>
          </div>
        </div>
        <span :class="`time ${audioActive ? 'shift' : ''}`">
          <span>{{curTime}}</span>
          &nbsp;
          <span>/</span>
          &nbsp;
          <span>{{durTime}}</span>
        </span>

        <div class="dropup">
          <button
            class="dropbtn"
            @click="changePlayBack = !changePlayBack"
          >{{currentPlayBackRates == 1 ? 'Normal' : currentPlayBackRates + 'x'}}</button>
          <div :class="`dropup-content ${changePlayBack ? 'open' : ''}`">
            <a
              v-for="speed in playbackRates"
              :key="speed"
              @click="setPlayBackRates(speed); changePlayBack = !changePlayBack"
            >{{ speed == 1 ? 'Normal' : speed + 'x' }}</a>
          </div>
        </div>

        <i class="fa fa-expand fullscreen" @click="toggleFullscreen"></i>
      </div>
      <div class="seek" ref="progress" @mousedown="scrub">
        <div class="buffer" :style="`width:${bufferPercent}%`"></div>
        <div class="watched" :style="`width: ${progressBar};`">
          <i class="handle"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "lazy-video",
  data() {
    return {
      audioActive: false,
      videoActive: false,
      loading: true,
      changePlayBack: false,
      playbackRates: [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75],
      currentPlayBackRates: 1.0,
      isPlaying: false,
      mousedown: false,
      curTime: "00:00",
      durTime: "00:00",
      volume: 0.5,
      hasEnded: false,
      bufferPercent: 0,
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
    },
    videoActive() {
      this.reset();
    }
  },
  computed: {
    video() {
      return this.$refs.videoViewer;
    },
    progress() {
      return this.$refs.progress;
    },
    player() {
      return this.$refs.player;
    }
  },
  methods: {
    reset() {
      this.changePlayBack = false;
    },
    togglePlay() {
      if (this.video.paused) {
        this.video.play();
        this.isPlaying = true;
      } else {
        this.video.pause();
        this.isPlaying = false;
      }
    },
    findVolume(event) {
      var perc = Math.floor(
        (event.offsetX / this.$refs.rail.offsetWidth) * 100
      );
      this.$refs.grip.style.left = `${perc}%`;

      var vol = this.video.volume;
      if (perc > 1 && perc < 99) {
        vol = perc / 100;
      }
      this.video.volume = vol;
    },
    scrub(e) {
      const scrubTime =
        (e.offsetX / this.progress.offsetWidth) * this.video.duration;
      this.video.currentTime = scrubTime;
    },
    toggleFullscreen() {
      if (this.player.requestFullScreen) {
        this.player.requestFullScreen();
      } else if (this.player.webkitRequestFullScreen) {
        this.player.webkitRequestFullScreen();
      } else if (this.player.mozRequestFullScreen) {
        this.player.mozRequestFullScreen();
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
      this.loadeddata();
      const percent = (this.video.currentTime / this.video.duration) * 100;
      this.progressBar = `${percent}%`;
    },
    detectKeypress(event) {
      if (event.keyCode == 32) {
        event.preventDefault();
        this.togglePlay();
      }
    },
    skipBack() {
      this.video.currentTime += parseFloat(-10);
    },
    skipForward() {
      this.video.currentTime += parseFloat(+10);
    },
    handleEnded() {
      this.hasEnded = true;
    },
    loadeddata() {
      this.loading = false;
    },
    stalled() {
      this.loading = true;
    },
    setPlayBackRates(val) {
      this.video.playbackRate = val;
    },
    updateBuffer() {
      if (
        this.video &&
        this.video.buffered &&
        this.video.buffered.length > 0 &&
        this.video.buffered.end &&
        this.video.duration
      ) {
        this.bufferPercent = this.video.buffered.end(0) / this.video.duration;
      }
      // Some browsers (e.g., FF3.6 and Safari 5) cannot calculate target.bufferered.end()
      // to be anything other than 0. If the byte count is available we use this instead.
      // Browsers that support the else if do not seem to have the bufferedBytes value and
      // should skip to there. Tested in Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8.
      else if (
        this.video &&
        this.video.bytesTotal != undefined &&
        this.video.bytesTotal > 0 &&
        this.video.bufferedBytes != undefined
      ) {
        this.bufferPercent = this.video.bufferedBytes / this.video.bytesTotal;
      }

      if (this.bufferPercent) {
        this.bufferPercent = 100 * Math.min(1, Math.max(0, this.bufferPercent));
      } else {
        this.bufferPercent = 100;
      }
    }
  },
  mounted() {
    window.addEventListener("keydown", this.detectKeypress);
    this.video.addEventListener("timeupdate", this.currentTime);
    this.video.addEventListener("timeupdate", this.handleProgress);
    this.video.addEventListener("ended", this.handleEnded);
    this.video.addEventListener("loadeddata", this.loadeddata);
    this.video.addEventListener("progress", this.updateBuffer);
    this.video.addEventListener("stalled", this.stalled);
  },
  destroyed() {
    window.removeEventListener("keydown", this.detectKeypress);
    this.video.removeEventListener("timeupdate", this.currentTime);
    this.video.removeEventListener("timeupdate", this.handleProgress);
    this.video.removeEventListener("ended", this.handleEnded);
    this.video.removeEventListener("loadeddata", this.loadeddata);
    this.video.removeEventListener("progress", this.updateBuffer);
    this.video.removeEventListener("stalled", this.stalled);
  }
};
</script>
