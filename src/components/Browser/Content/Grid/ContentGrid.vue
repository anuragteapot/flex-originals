<template>
  <div class="media-content-grid">
    <div
      class="home__advertisement__video"
      v-if="!isMobile && $route.name == '@home'"
    >
      <div class="feature__text">
        <p>INTRODUCING</p>
        <h1>Flex Originals</h1>
        <button class="fo-button">Learn More</button>
      </div>
      <video
        ref="featureVideo"
        class="feature__video"
        controlslist="nodownload"
        crossorigin="anonymous"
        loop
        playsinline
        preload="metadata"
        style="object-fit: cover;"
        src="/public/320_feature_video.mp4"
        muted
      ></video>
    </div>
    <div
      class="loading--media"
      v-show="content.audio.length == 0 && content.video.length == 0"
    >
      <div class="spinner">
        <div class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="grid_section files">
      <h1 v-if="content.audio.length > 0">
        Recommended
      </h1>
      <div
        class="fo-content__container"
        v-if="content.audio.length > 0"
      >
        <music-thumb
          v-for="item in content.audio"
          :key="item.id"
          :src="$utils.getUrl(item.thumbImage, 'image')"
          :item="item"
          hover
        ></music-thumb>
      </div>
      <h1 v-if="content.video.length > 0">Videos</h1>
      <div class="fo-content__container" v-if="content.video.length > 0">
        <video-thumb
          v-for="item in content.video"
          :key="item.id"
          :src="$utils.getUrl(item.thumbImage, 'image')"
          :item="item"
          hover
        ></video-thumb>
      </div>
      <!-- <h1 v-if="content.audio.length > 0">Music</h1>
      <div class="fo-content__container" v-if="content.audio.length > 0">
        <music-thumb
          v-for="item in content.audio"
          :key="item.id"
          :src="$utils.getUrl(item.thumbImage, 'image')"
          :item="item"
          hover
        ></music-thumb>
      </div> -->
    </div>
  </div>
</template>

<script>
// import * as types from "./../../../../store/mutation-types";
import musicThumb from './../../Items/MusicItem';
import videoThumb from './../../Items/VideoItem';
import { mapGetters } from 'vuex';

export default {
  name: 'media-content-grid',
  data: () => ({
    src: './../../../../assets/musicLoading.png',
  }),
  computed: {
    ...mapGetters(['isMobile', 'isAuthenticated']),
    layout() {
      const name = this.$route.name;
      if (name.split('@')[1]) {
        return name.split('@')[1];
      } else {
        return null;
      }
    },
    content() {
      return this.$store.state.content;
    },
    ritem() {
      return {
        id: '2mxmd2msk3',
        title: 'Recent',
      };
    },
  },
  components: {
    videoThumb,
    musicThumb,
  },
  methods: {
    getUrl(path) {
      if (path == '') {
        return path;
      } else {
        return `http://localhost:3355/f.img?mimetype=image/png&media=${path}`;
      }
    },
    loadeddata() {
      setTimeout(() => {
        this.$refs.featureVideo.play();
      }, 5000);
    },
  },
  mounted() {
  if(this.$refs.featureVideo) {
    this.$refs.featureVideo.load();
    this.$refs.featureVideo.addEventListener('loadeddata', this.loadeddata);
    }
  },

  beforeDestroy() {
   if(this.$refs.featureVideo) {
      this.$refs.featureVideo.removeEventListener('loadeddata', this.loadeddata);
    }
  },
};
</script>
