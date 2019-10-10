<template>
  <div :class="`music_player ${theme}`">
    <div :class="`inner ${theme}`">
      <p>{{musicPlaylist[currentSong] ? musicPlaylist[currentSong].title : 'Loading...'}}</p>
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
          <div class="audio-progress" :style="`width:${currentProgressBar}%`">
            <div class="circle"></div>
          </div>
          <!-- <div class="buffer" :style="`width:${bufferPercent}%`"> -->
          <!-- </div> -->
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
import utils from '../../api/utils';

export default {
  name: 'lazy-audio-player',
  data() {
    return {
      imgLoaded: false,
      currentlyPlaying: false,
      currentlyStopped: false,
      currentTime: '00:00',
      checkingCurrentPositionInTrack: '',
      trackDuration: '00:00',
      currentProgressBar: 0,
      volume: 10,
      bufferPercent: 0,
      isPlaylistActive: false,
      currentSong: 0,
      audioFile: '',
    };
  },
  watch: {
    volume: function(val) {
      this.audio.volume = val / 10;
    },
    $route() {
      this.changeSong();
    },
    musicPlaylist(val) {
      if (val.length > 0) {
        this.changeSong();
        this.audio.loop = false;
      }
    },
  },
  computed: {
    search() {
      return this.$store.state.search;
    },
    musicPlaylist: function() {
      return this.$store.state.content.audio.filter(
        item => item.id == this.$route.query.a,
      );
    },
    theme() {
      return this.$store.state.theme;
    },
    audio() {
      return new Audio();
    },
    progress() {
      return this.$refs.progress;
    },
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
      this.audioFile = '/' + this.musicPlaylist[this.currentSong].audioFile;
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
      return '/' + this.musicPlaylist[currentSong].audioFile;
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
        cursecs = '0' + cursecs;
      }

      if (curmins < 10) {
        curmins = '0' + curmins;
      }

      this.currentTime = curmins + ':' + cursecs;
    },
    loadedmetadata() {
      this.currentlyPlaying = true;
      this.audio.play();
      let durmins = Math.floor(this.audio.duration / 60);
      let dursecs = Math.floor(this.audio.duration - durmins * 60);

      if (dursecs < 10) {
        dursecs = '0' + dursecs;
      }
      if (durmins < 10) {
        durmins = '0' + durmins;
      }
      this.trackDuration = durmins + ':' + dursecs;
    },
    halfTime: new utils().debounce(async function() {
      await this.$store.dispatch(
        'UPDATE_VIEWS_AUDIO',
        this.musicPlaylist[this.currentSong].id,
      );
    }, 2000),
    handleProgress() {
      if (
        Math.floor(this.audio.currentTime) >=
          Math.floor(this.audio.duration / 2) - 5 &&
        Math.floor(this.audio.currentTime) <=
          Math.ceil(this.audio.duration / 2) + 5
      ) {
        if (Math.floor(this.audio.currentTime) != 0) {
          this.halfTime();
        }
      }

      const percent = (this.audio.currentTime / this.audio.duration) * 100;
      this.currentProgressBar = parseInt(percent);
    },
    detectKeypress(event) {
      if (this.search != '') return false;
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
    },
  },
  async mounted() {
    if (!this.$route.query.a) {
      this.$router.push('/app/@error');
    }

    // this.changeSong();

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.detectKeypress);
    }
    this.audio.addEventListener('ended', this.handleEnded);
    this.audio.addEventListener('timeupdate', this.currTime);
    this.audio.addEventListener('progress', this.updateBuffer);
    this.audio.addEventListener('loadedmetadata', this.loadedmetadata);
    this.audio.addEventListener('timeupdate', this.handleProgress);
  },
  filters: {
    fancyTimeFormat: function(s) {
      return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
    },
  },
  beforeDestroy: function() {
    this.stopAudio();
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.detectKeypress);
    }
    this.audio.removeEventListener('ended', this.handleEnded);
    this.audio.removeEventListener('timeupdate', this.currTime);
    this.audio.removeEventListener('progress', this.updateBuffer);
    this.audio.removeEventListener('loadedmetadata', this.loadedmetadata);
    this.audio.removeEventListener('timeupdate', this.handleProgress);
    clearTimeout(this.checkingCurrentPositionInTrack);
  },
};
</script>
