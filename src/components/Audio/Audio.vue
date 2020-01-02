<template>
  <div class="music_player">
    <div class="inner">
      <p>
        {{
          this.currentSong.audio
            ? this.currentSong.audio.audioMeta.originalname
            : 'Loading...'
        }}
      </p>
      <br />
      <i @click="prevSong()" class="fa fa-step-backward" aria-hidden="true"></i>
      <i
        @click="playOrPauseAudio()"
        v-show="isPlaying"
        class="fa fa-pause"
        aria-hidden="true"
      ></i>
      <i
        @click="playOrPauseAudio()"
        v-show="!isPlaying"
        class="fa fa-play"
        aria-hidden="true"
      ></i>
      <i @click="nextSong()" class="fa fa-step-forward" aria-hidden="true"></i>
      <div class="slider_container">
        <span class="time">{{ currentTime }}</span>
        <div
          class="slider"
          ref="progress"
          @mousedown="scrub"
          data-direction="horizontal"
        >
          <div class="audio-progress" :style="`width:${currentProgressBar}%`">
            <div class="circle"></div>
          </div>
          <!-- <div class="buffer" :style="`width:${bufferPercent}%`"> -->
          <!-- </div> -->
        </div>
        <span class="time">{{ trackDuration }}</span>
        <i
          v-show="volume"
          class="audio-icon fa fa-volume-up"
          @click="volume = 0"
        ></i>
        <i
          v-show="!volume"
          class="audio-icon fa fa-volume-off"
          aria-hidden="true"
          @click="volume = 6"
        ></i>
        <input
          v-model="volume"
          type="range"
          min="0"
          max="10"
          class="slider audio"
        />
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
      currentTime: '00:00',
      trackDuration: '00:00',
      currentProgressBar: 0,
      isPlaying: false,
      isLoading: true,
      volume: 10,
      bufferPercent: 0,
      isPlaylistActive: false,
      currentSong: {},
    };
  },
  watch: {
    volume: function(val) {
      this.audio.volume = val / 10;
    },
    $route() {
      this.loadSong();
    },
  },
  computed: {
    search() {
      return this.$store.state.search;
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
      } else if (
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
    nextSong: function() {
      this.$emit('nextSong');
    },
    prevSong: function() {
      this.$emit('prevSong');
    },
    loadSong: async function() {
      this.audio.pause();
      const audio = await this.$store.dispatch('GET_AUDIO', {
        id: this.$route.query.a,
      });

      this.currentSong = audio.data;
      this.audio.src = this.$utils.getUrl(
        this.currentSong.audio.audioFile,
        'audio',
      );

      this.audio.volume = this.volume / 10;
    },
    playOrPauseAudio: function() {
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    },
    handleEnded: function() {
      this.audio.pause();
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
        this.currentSong.audio.id,
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
        this.playOrPauseAudio();
      } else if (event.keyCode == 39) {
        event.preventDefault();
        this.nextSong();
      } else if (event.keyCode == 37) {
        event.preventDefault();
        this.prevSong();
      }
    },
    handlePlay() {
      this.isPlaying = true;
    },
    handlePause() {
      this.isPlaying = false;
    },
    handleCanPlay() {
      if (this.audio.paused) {
        this.audio.play();
      }
    },
  },
  async mounted() {
    if (!this.$route.query.a) {
      this.$router.push('/app/@error');
    }

    this.loadSong();

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.detectKeypress);
    }
    this.audio.addEventListener('ended', this.handleEnded);
    this.audio.addEventListener('timeupdate', this.currTime);
    this.audio.addEventListener('progress', this.updateBuffer);
    this.audio.addEventListener('play', this.handlePlay);
    this.audio.addEventListener('pause', this.handlePause);
    this.audio.addEventListener('canplay', this.handleCanPlay);
    this.audio.addEventListener('loadedmetadata', this.loadedmetadata);
    this.audio.addEventListener('timeupdate', this.handleProgress);
  },
  filters: {
    fancyTimeFormat: function(s) {
      return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
    },
  },
  beforeDestroy: function() {
    this.audio.pause();
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.detectKeypress);
    }
    this.audio.removeEventListener('ended', this.handleEnded);
    this.audio.removeEventListener('pause', this.handlePause);
    this.audio.removeEventListener('play', this.handlePlay);
    this.audio.removeEventListener('timeupdate', this.currTime);
    this.audio.removeEventListener('progress', this.updateBuffer);
    this.audio.removeEventListener('canplay', this.handleCanPlay);
    this.audio.removeEventListener('loadedmetadata', this.loadedmetadata);
    this.audio.removeEventListener('timeupdate', this.handleProgress);
  },
};
</script>
