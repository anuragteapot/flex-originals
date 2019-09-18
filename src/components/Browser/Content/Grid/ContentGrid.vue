<template>
  <div class="media-content-grid">
    <div class="grid_section files">
      <h1 v-if="content.audio.length > 0 && layout != 'channel'">Recommended</h1>
      <div class="fo-content__container" v-if="content.audio.length > 0 && layout != 'channel'">
        <music-thumb
          v-for="item in content.audio"
          :key="item.id"
          :src="item.thumbImage || `./../../../../assets/musicLoading.png`"
          lazySrc="./../../../../assets/musicLoading.png"
          :item="item"
          hover
        ></music-thumb>
      </div>
      <h1 v-if="content.video.length > 0">Videos</h1>
      <div class="fo-content__container" v-if="content.video.length > 0">
        <video-thumb
          v-for="item in content.video"
          :key="item.id"
          :src="item.thumbImage || `./../../../../assets/videoLoading.png`"
          lazySrc="./../../../../assets/videoLoading.png"
          :item="item"
          hover
        ></video-thumb>
      </div>
      <h1 v-if="content.audio.length > 0">Music</h1>
      <div class="fo-content__container" v-if="content.audio.length > 0">
        <music-thumb
          v-for="item in content.audio"
          :key="item.id"
          :src="item.thumbImage || `./../../../../assets/musicLoading.png`"
          lazySrc="./../../../../assets/musicLoading.png"
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
    src: "./../../../../assets/musicLoading.png",
    lazySrc: "./../../../../assets/musicLoading.png"
  }),
  computed: {
    layout() {
      const name = this.$route.name;
      if (name.split("@")[1]) {
        return name.split("@")[1];
      } else {
        return null;
      }
    },
    content() {
      return this.$store.state.content;
    },
    ritem() {
      return {
        id: "2mxmd2msk3",
        title: "Recent"
      };
    }
  },
  components: {
    videoThumb,
    musicThumb
  }
};
</script>
