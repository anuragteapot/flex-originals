<template>
  <div class="music_player">
    <div class="inner">
      <i
        :disabled="!currentSong"
        @click="prevSong()"
        class="fa fa-step-backward"
        aria-hidden="true"
      ></i>
      <i @click="playAudio()" v-show="currentlyPlaying" class="fa fa-pause" aria-hidden="true"></i>
      <i @click="playAudio()" v-show="!currentlyPlaying" class="fa fa-play" aria-hidden="true"></i>
      <i
        :disabled="currentSong == musicPlaylist.length-1"
        @click="nextSong()"
        class="fa fa-step-forward"
        aria-hidden="true"
      ></i>
      <div class="slider_container">
        <span class="time">{{ currentTime }}</span>
        <div class="slider" ref="progress" @mousedown="scrub">
          <div class="buffer" :style="`width:${bufferPercent}%`">
            <div class="progress" :style="`width:${currentProgressBar}%`">
              <span class="circle"></span>
            </div>
          </div>
        </div>
        <span class="time">{{ trackDuration }}</span>
        <i v-show="volume" class="audio-icon fa fa-volume-up" @click="volume = 0"></i>
        <i
          v-show="!volume"
          class="audio-icon fa fa-volume-off"
          aria-hidden="true"
          @click="volume = 6"
        ></i>
        <input v-model="volume" type="range" min="0" max="10" class="slider audio">
      </div>
      <i class="fa fa-random" aria-hidden="true"></i>
      <i class="fa fa-retweet" aria-hidden="true"></i>
      <i class="fa fa-list" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "lazy-audio-player",
  data() {
    return {
      imgLoaded: false,
      currentlyPlaying: false,
      currentlyStopped: false,
      currentTime: "00:00",
      checkingCurrentPositionInTrack: "",
      trackDuration: "00:00",
      currentProgressBar: 0,
      volume: 7,
      bufferPercent: 0,
      isPlaylistActive: false,
      currentSong: 0,
      audioFile: ""
    };
  },
  watch: {
    volume: function(val) {
      this.audio.volume = val / 10;
    }
  },
  computed: {
    musicPlaylist: function() {
      var files = [];
      const file = {};
      file.url = "/public/music/Shinchan - Ending Theme(MyMp3Song).mp3";
      file.title = "Anurag";
      file.image = "https://source.unsplash.com/crs2vlkSe98";
      file.artist = "Daniel Simion";
      files.push(file);
      file.url = "/public/music/Luis Fonsi - Despacito ft. Daddy Yankee.mp3";
      files.push(file);
      return files;
    },
    audio() {
      return new Audio();
    },
    progress() {
      return this.$refs.progress;
    }
  },
  methods: {
    scrub(e) {
      const scrubTime =
        (e.offsetX / this.progress.offsetWidth) * this.audio.duration;
      this.audio.currentTime = scrubTime;
    },
    updateBuffer() {
      if (
        this.audio &&
        this.audio.buffered &&
        this.audio.buffered.length > 0 &&
        this.audio.buffered.end &&
        this.audio.duration
      ) {
        this.bufferPercent = this.audio.buffered.end(0) / this.audio.duration;
      }
      // Some browsers (e.g., FF3.6 and Safari 5) cannot calculate target.bufferered.end()
      // to be anything other than 0. If the byte count is available we use this instead.
      // Browsers that support the else if do not seem to have the bufferedBytes value and
      // should skip to there. Tested in Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8.
      else if (
        this.audio &&
        this.audio.bytesTotal != undefined &&
        this.audio.bytesTotal > 0 &&
        this.audio.bufferedBytes != undefined
      ) {
        this.bufferPercent = this.audio.bufferedBytes / this.audio.bytesTotal;
      }

      if (this.bufferPercent) {
        this.bufferPercent = 100 * Math.min(1, Math.max(0, this.bufferPercent));
      } else {
        this.bufferPercent = 100;
      }
    },
    togglePlaylist: function() {
      this.isPlaylistActive = !this.isPlaylistActive;
    },
    nextSong: function() {
      if (this.currentSong < this.musicPlaylist.length - 1)
        this.changeSong(this.currentSong + 1);
    },
    prevSong: function() {
      if (this.currentSong > 0) this.changeSong(this.currentSong - 1);
    },
    changeSong: function(index) {
      var wasPlaying = this.currentlyPlaying;
      this.imageLoaded = false;
      if (index !== undefined) {
        this.stopAudio();
        this.currentSong = index;
      }
      this.audioFile = this.musicPlaylist[this.currentSong].url;
      this.audio.src = this.audioFile;
      this.audio.volume = this.volume / 10;
      if (wasPlaying) {
        this.playAudio();
      }
    },
    isCurrentSong: function(index) {
      if (this.currentSong == index) {
        return true;
      }
      return false;
    },
    getCurrentSong: function(currentSong) {
      return this.musicPlaylist[currentSong].url;
    },
    playAudio: function() {
      if (
        this.currentlyStopped == true &&
        this.currentSong + 1 == this.musicPlaylist.length
      ) {
        this.currentSong = 0;
        this.changeSong();
      }
      if (!this.currentlyPlaying) {
        this.currentlyPlaying = true;
        this.audio.play();
      } else {
        this.stopAudio();
      }
      this.currentlyStopped = false;
    },
    stopAudio: function() {
      this.audio.pause();
      this.currentlyPlaying = false;
      this.pausedMusic();
    },
    handleEnded: function() {
      if (this.currentSong + 1 == this.musicPlaylist.length) {
        this.stopAudio();
        this.currentlyPlaying = false;
        this.currentlyStopped = true;
      } else {
        this.currentlyPlaying = false;
        this.currentSong++;
        this.changeSong();
        this.playAudio();
      }
    },
    onImageLoaded: function() {
      this.imgLoaded = true;
    },
    pausedMusic: function() {
      clearTimeout(this.checkingCurrentPositionInTrack);
    },
    currTime() {
      var curmins = Math.floor(this.audio.currentTime / 60);
      var cursecs = Math.floor(this.audio.currentTime - curmins * 60);
      var durmins = Math.floor(this.audio.duration / 60);
      var dursecs = Math.floor(this.audio.duration - durmins * 60);
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
      this.currentTime = curmins + ":" + cursecs;
      this.trackDuration = durmins + ":" + dursecs;
    },
    handleProgress() {
      const percent = (this.audio.currentTime / this.audio.duration) * 100;
      this.currentProgressBar = parseInt(percent);
    }
  },
  mounted: function() {
    this.changeSong();
    this.audio.loop = false;
    this.audio.addEventListener("ended", this.handleEnded);
    this.audio.addEventListener("timeupdate", this.currTime);
    this.audio.addEventListener("progress", this.updateBuffer);
    this.audio.addEventListener("timeupdate", this.handleProgress);
  },
  filters: {
    fancyTimeFormat: function(s) {
      return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
    }
  },
  beforeDestroy: function() {
    this.audio.removeEventListener("ended", this.handleEnded);
    this.audio.removeEventListener("timeupdate", this.currTime);
    this.audio.removeEventListener("progress", this.updateBuffer);
    this.audio.removeEventListener("timeupdate", this.handleProgress);
    clearTimeout(this.checkingCurrentPositionInTrack);
  }
};
</script>
