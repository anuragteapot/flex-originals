<template>
  <div
    :class="`video ${videoActive || !isPlaying ? 'active' : ''}`"
    ref="player"
    @mouseover="videoActive = true"
    @mouseleave="videoActive = false"
  >
    <video
      @contextmenu.prevent
      :src="src"
      :style="`${loading ? 'opacity: 0.1!important;' : ''}`"
      class="visible"
      controlslist="nodownload"
      ref="videoViewer"
      @click="togglePlay"
    ></video>
    <span :class="`large-play ${!isPlaying && !loading ? '' : 'hidden'}`">
      <i @click="togglePlay" class="fas fa-play" aria-hidden="true"></i>
    </span>
    <div v-show="loading" class="loader-3 center">
      <span></span>
    </div>
    <div :class="`control-bar ${videoActive || !isPlaying ? 'active' : ''}`">
      <div class="button-bar">
        <i v-if="hasEnded" @click="togglePlay" class="fas fa-redo" aria-hidden="true"></i>
        <i v-else-if="!isPlaying" @click="togglePlay" class="fas fa-play" aria-hidden="true"></i>
        <i v-else-if="isPlaying" @click="togglePlay" class="fas fa-pause" aria-hidden="true"></i>
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

        <div class="dropup v-quality">
          <button class="dropbtn" @click="changeQuality = !changeQuality">{{videoQualityName}}</button>
          <div :class="`dropup-content ${changeQuality ? 'open' : ''}`">
            <a
              v-for="quality in videoQuality"
              :key="quality.name"
              @click="setQuality(quality); changeQuality = !changeQuality"
            >{{ quality.name }}</a>
          </div>
        </div>

        <div class="dropup">
          <button
            class="dropbtn"
            @click="changePlayBack = !changePlayBack"
          >{{playbackRate == 1 ? 'Normal' : playbackRate + 'x'}}</button>
          <div :class="`dropup-content ${changePlayBack ? 'open' : ''}`">
            <a
              v-for="speed in playbackRates"
              :key="speed"
              @click="setPlayBackRates(speed); changePlayBack = !changePlayBack"
            >{{ speed == 1 ? 'Normal' : speed + 'x' }}</a>
          </div>
        </div>
        <div class="full">
          <i class="fas fa-expand fullscreen" @click="toggleFullscreen"></i>
        </div>
      </div>
      <div class="seek tooltip" ref="progress" @mousedown="scrub" @mousemove="scrubForTime">
        <span class="tooltiptext" :style="`left:${tooltipPercent}`">{{tooltipTime}}</span>
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
      videoQualityName: "Auto",
      audioActive: false,
      videoActive: false,
      loading: true,
      errorOccured: false,
      changePlayBack: false,
      changeQuality: false,
      playbackRate: 1.0,
      isPlaying: false,
      mousedown: false,
      curTime: "00:00",
      durTime: "00:00",
      volume: 0.5,
      hasEnded: false,
      bufferPercent: 0,
      progressBar: "0%",
      tooltipTime: "0%",
      tooltipPercent: "3%"
    };
  },
  props: {
    src: String,
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
      this.changeQuality = false;
    },
    handleError() {
      this.errorOccured = true;
    },
    togglePlay() {
      if (this.video.paused) {
        this.video.play();
        this.hasEnded = false;
        this.videoActive = false;
        this.isPlaying = true;
      } else {
        this.video.pause();
        this.hasEnded = false;
        this.isPlaying = false;
      }
    },
    setQuality(quality) {
      const storeTime = this.video.currentTime;
      this.video.src = quality.src;
      this.video.currentTime = storeTime;
      this.videoQualityName = quality.name;
      this.video.load();
      this.togglePlay();
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
    scrubForTime(e) {
      const scrubTime =
        (e.offsetX / this.progress.offsetWidth) * this.video.duration;
      const percent = (scrubTime / this.video.duration) * 100;

      let curmins = Math.floor(scrubTime / 60);
      let cursecs = Math.floor(scrubTime - curmins * 60);

      if (cursecs < 10) {
        cursecs = "0" + cursecs;
      }

      if (curmins < 10) {
        curmins = "0" + curmins;
      }
      this.tooltipTime = curmins + ":" + cursecs;
      this.tooltipPercent = `${percent - 1.7}%`;
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

      if (cursecs < 10) {
        cursecs = "0" + cursecs;
      }

      if (curmins < 10) {
        curmins = "0" + curmins;
      }
      this.curTime = curmins + ":" + cursecs;
    },
    handleProgress() {
      const percent = (this.video.currentTime / this.video.duration) * 100;
      this.progressBar = `${percent}%`;
      if (this.errorOccured) {
        this.loading = true;
      } else {
        this.loading = false;
      }
    },
    detectKeypress(event) {
      if (event.keyCode == 32) {
        event.preventDefault();
        this.togglePlay();
      } else if (event.keyCode == 39) {
        event.preventDefault();
        this.skipForward();
      } else if (event.keyCode == 37) {
        event.preventDefault();
        this.skipBack();
      }
    },
    skipBack() {
      this.video.currentTime += parseFloat(-5);
    },
    skipForward() {
      this.video.currentTime += parseFloat(+5);
    },
    handleEnded() {
      this.hasEnded = true;
      this.isPlaying = false;
    },
    loadeddata() {
      this.loading = false;
    },
    loadedmetadata() {
      var durmins = Math.floor(this.video.duration / 60);
      var dursecs = Math.floor(this.video.duration - durmins * 60);
      if (dursecs < 10) {
        dursecs = "0" + dursecs;
      }
      if (durmins < 10) {
        durmins = "0" + durmins;
      }
      this.durTime = durmins + ":" + dursecs;
    },
    stalled() {
      this.loading = true;
    },
    setPlayBackRates(val) {
      this.video.playbackRate = val;
      this.playbackRate = val;
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
      } else if (
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
    },
    seeked() {
      this.loading = false;
    },
    seeking() {
      this.loading = true;
    }
  },
  mounted() {
    window.addEventListener("keydown", this.detectKeypress);
    this.video.addEventListener("timeupdate", this.currentTime);
    this.video.addEventListener("timeupdate", this.handleProgress);
    this.video.addEventListener("ended", this.handleEnded);
    this.video.addEventListener("error", this.handleError);
    this.video.addEventListener("loadeddata", this.loadeddata);
    this.video.addEventListener("loadedmetadata", this.loadedmetadata);
    this.video.addEventListener("progress", this.updateBuffer);
    this.video.addEventListener("stalled", this.stalled);
    this.video.addEventListener("seeking", this.seeking);
    this.video.addEventListener("seeked", this.seeked);
  },
  destroyed() {
    window.removeEventListener("keydown", this.detectKeypress);
    this.video.removeEventListener("timeupdate", this.currentTime);
    this.video.removeEventListener("timeupdate", this.handleProgress);
    this.video.removeEventListener("ended", this.handleEnded);
    this.video.removeEventListener("error", this.handleError);
    this.video.removeEventListener("loadeddata", this.loadeddata);
    this.video.removeEventListener("loadedmetadata", this.loadedmetadata);
    this.video.removeEventListener("progress", this.updateBuffer);
    this.video.removeEventListener("stalled", this.stalled);
    this.video.removeEventListener("seeking", this.seeking);
    this.video.removeEventListener("seeked", this.seeked);
  }
};
</script>
