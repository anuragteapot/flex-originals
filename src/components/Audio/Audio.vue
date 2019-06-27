<template>
  <div class="music_player">
    <div class="inner">
      <!-- <img
        @load="onImageLoaded()"
        :src="musicPlaylist[currentSong].image"
        :key="currentSong"
        class="albumImage"
      >-->
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
        <span class="time">{{ currentTime | fancyTimeFormat }}</span>
        <input v-model="currentProgressBar" type="range" min="0" max="100" class="slider time">
        <span class="time">{{ trackDuration | fancyTimeFormat }}</span>
        <i class="audio-icon fa fa-volume-up"></i>
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
      audio: "",
      imgLoaded: false,
      currentlyPlaying: false,
      currentlyStopped: false,
      currentTime: 0,
      checkingCurrentPositionInTrack: "",
      trackDuration: 0,
      currentProgressBar: 0,
      volume: 7,
      isPlaylistActive: false,
      currentSong: 0,
      debug: false,
      audioFile: "",
      audioExt: ["mp3", "webm"]
    };
  },
  mounted: function() {
    this.changeSong();
    this.audio.loop = false;
  },
  filters: {
    fancyTimeFormat: function(s) {
      return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
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
      return files;
    }
  },
  methods: {
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
      this.audio = new Audio(this.audioFile);
      this.audio.volume = this.volume / 10;
      var localThis = this;
      this.audio.addEventListener("loadedmetadata", function() {
        localThis.trackDuration = Math.round(this.duration);
      });
      this.audio.addEventListener("ended", this.handleEnded);
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
        this.getCurrentTimeEverySecond(true);
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
    getCurrentTimeEverySecond: function() {
      var localThis = this;
      this.checkingCurrentPositionInTrack = setTimeout(
        function() {
          localThis.currentTime = localThis.audio.currentTime;
          localThis.currentProgressBar =
            (localThis.audio.currentTime / localThis.trackDuration) * 100;
          localThis.getCurrentTimeEverySecond(true);
        }.bind(this),
        1000
      );
    },
    pausedMusic: function() {
      clearTimeout(this.checkingCurrentPositionInTrack);
    }
  },
  watch: {
    currentTime: function() {
      this.currentTime = Math.round(this.currentTime);
    },
    volume: function(val) {
      this.audio.volume = val / 10;
    }
  },
  beforeDestroy: function() {
    this.audio.removeEventListener("ended", this.handleEnded);
    this.audio.removeEventListener("loadedmetadata", this.handleEnded);
    clearTimeout(this.checkingCurrentPositionInTrack);
  }
};
</script>
