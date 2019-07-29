<template>
  <div class="media-content-grid">
    <div class="grid_section files">
      <h1>Recents</h1>
      <div class="fo-content__container">
        <music-thumb :src="src" :lazySrc="lazySrc" :item="ritem"></music-thumb>
        <music-thumb :src="src" :lazySrc="lazySrc" :item="ritem"></music-thumb>
      </div>
      <h1 v-if="content.video.length > 0">Videos</h1>
      <div class="fo-content__container" v-if="content.video.length > 0">
        <video-thumb
          v-for="item in content.video"
          :key="item.id"
          :src="'/' + item.thumbImage || src"
          :lazySrc="lazySrc"
          :item="item"
          hover
        ></video-thumb>
      </div>
      <h1 v-if="content.audio.length > 0">Music</h1>
      <div class="fo-content__container" v-if="content.audio.length > 0">
        <music-thumb
          v-for="item in content.audio"
          :key="item.id"
          :src="item.thumbImage || src"
          :lazySrc="lazySrc"
          :item="item"
          hover
        ></music-thumb>
      </div>
    </div>
  </div>
</template>

<script>
// import * as types from "./../../../../store/mutation-types";
import musicThumb from "./../../Items/MusicItem";
import videoThumb from "./../../Items/VideoItem";

export default {
  name: "media-content-grid",
  data: () => ({
    src: "/public/icons/logo.png",
    lazySrc: "/public/icons/logo.png"
  }),
  computed: {
    content() {
      return this.$store.state.content;
    },
    ritem(){
      return {
        id:'2mxmd2msk3',
        title:'Recent'
      }
    }
  },
  components: {
    videoThumb,
    musicThumb
  }
};
</script>
