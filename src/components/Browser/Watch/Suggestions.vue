<template>
  <div class="media-content-grid">
    <div class="grid_section files">
      <h1 v-show="content.video.length > 0">For You</h1>
      <div class="fo-content__container" v-if="content.video.length > 0">
        <video-thumb
          v-for="item in content.video"
          :key="item.id"
          :src="$utils.getUrl(item.thumbImage, 'image')"
          :item="item"
          hover
        ></video-thumb>
      </div>
    </div>
  </div>
</template>

<script>
import videoThumb from './../Items/VideoItem';

export default {
  name: 'media-content-grid',
  data: () => ({}),
  computed: {
    content() {
      return this.$store.state.content;
    },
  },
  components: {
    videoThumb,
  },
};
</script>
