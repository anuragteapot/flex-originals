<template>
  <div class="music_player">
    <div class="inner">
      <p>{{musicPlaylist[currentSong].title}}</p>
      <br />
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
        <div class="slider" ref="progress" @mousedown="scrub" data-direction="horizontal">
          <div class="buffer" :style="`width:${bufferPercent}%`">
            <div class="audio-progress" :style="`width:${currentProgressBar}%`">
              <div class="circle"></div>
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
        <input v-model="volume" type="range" min="0" max="10" class="slider audio" />
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
      const files = [
        {
          title: "rockstar",
          artist: "Post Malone, 21 Savage",
          cover:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/rockstar-album-cover.jpg",
          audioFile:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Post%20Malone%20-%20rockstar%20ft.%2021%20Savage%20(1).mp3",
          color: "#c3af50"
        },
        {
          title: "Let You Down",
          artist: "NF",
          cover:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/perception-album-cover.png",
          audioFile:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/NF%20-%20Let%20You%20Down.mp3",
          color: "#25323b"
        },
        {
          title: "Silence",
          artist: "Marshmello, Khalid",
          cover:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/silence-album-cover.jpg",
          audioFile:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Marshmello%20-%20Silence%20ft.%20Khalid.mp3",
          color: "#c1c1c1"
        },
        {
          title: "I Fall Apart",
          artist: "Post Malone",
          cover:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/stoney-cover-album.jpg",
          audioFile:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Post%20Malone%20-%20I%20Fall%20Apart.mp3",
          color: "#cd4829"
        },
        {
          title: "Fireproof",
          artist: "VAX, Teddy Sky",
          cover:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/fireproof-album-cover.jpeg",
          audioFile:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/VAX%20-%20Fireproof%20Feat%20Teddy%20Sky.mp3",
          color: "#5d0126"
        }
      ];
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
    scrub(event) {
      const scrubTime =
        (event.offsetX / this.progress.offsetWidth) * this.audio.duration;
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
      const wasPlaying = this.currentlyPlaying;
      this.coverLoaded = false;
      if (index !== undefined) {
        this.stopAudio();
        this.currentSong = index;
      }
      this.audioFile = this.musicPlaylist[this.currentSong].audioFile;
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
      return this.musicPlaylist[currentSong].audioFile;
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
      let curmins = Math.floor(this.audio.currentTime / 60);
      let cursecs = Math.floor(this.audio.currentTime - curmins * 60);

      if (cursecs < 10) {
        cursecs = "0" + cursecs;
      }

      if (curmins < 10) {
        curmins = "0" + curmins;
      }

      this.currentTime = curmins + ":" + cursecs;
    },
    loadedmetadata() {
      let durmins = Math.floor(this.audio.duration / 60);
      let dursecs = Math.floor(this.audio.duration - durmins * 60);

      if (dursecs < 10) {
        dursecs = "0" + dursecs;
      }
      if (durmins < 10) {
        durmins = "0" + durmins;
      }
      this.trackDuration = durmins + ":" + dursecs;
    },
    handleProgress() {
      const percent = (this.audio.currentTime / this.audio.duration) * 100;
      this.currentProgressBar = parseInt(percent);
    },
    detectKeypress(event) {
      if (event.keyCode == 32) {
        event.preventDefault();
        this.playAudio();
      } else if (event.keyCode == 39) {
        event.preventDefault();
        this.nextSong();
      } else if (event.keyCode == 37) {
        event.preventDefault();
        this.prevSong();
      }
    }
  },
  mounted: function() {
    this.changeSong();
    this.audio.loop = false;
    // window.addEventListener("mousedown", function(event) {
    //   if (!isDraggable(event.target)) return false;

    //   currentlyDragged = event.target;
    //   let handleMethod = currentlyDragged.dataset.method;

    //   this.addEventListener("mousemove", window[handleMethod], false);

    //   window.addEventListener(
    //     "mouseup",
    //     () => {
    //       currentlyDragged = false;
    //       window.removeEventListener("mousemove", window[handleMethod], false);
    //     },
    //     false
    //   );
    // });
    window.addEventListener("keydown", this.detectKeypress);
    this.audio.addEventListener("ended", this.handleEnded);
    this.audio.addEventListener("timeupdate", this.currTime);
    this.audio.addEventListener("progress", this.updateBuffer);
    this.audio.addEventListener("loadedmetadata", this.loadedmetadata);
    this.audio.addEventListener("timeupdate", this.handleProgress);
  },
  filters: {
    fancyTimeFormat: function(s) {
      return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
    }
  },
  beforeDestroy: function() {
    this.stopAudio();
    window.removeEventListener("keydown", this.detectKeypress);
    this.audio.removeEventListener("ended", this.handleEnded);
    this.audio.removeEventListener("timeupdate", this.currTime);
    this.audio.removeEventListener("progress", this.updateBuffer);
    this.audio.removeEventListener("loadedmetadata", this.loadedmetadata);
    this.audio.removeEventListener("timeupdate", this.handleProgress);
    clearTimeout(this.checkingCurrentPositionInTrack);
  }
};
</script>
