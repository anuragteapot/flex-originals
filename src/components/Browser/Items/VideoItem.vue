<template>
  <div class="content-v-thumb">
    <div class="video__thumbnail" @click="$router.push(`/app/@watch?v=${item.id}`)">
      <lazy-image :src="src" :lazySrc="lazySrc" hover></lazy-image>
      <i class="fas fa-play fa-2x file-icon" aria-hidden="true"></i>
      <div class="video__info">
        <p class="title">{{item.name}}</p>
        <p class="views">Alenter</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "videoThumbs",
  data() {
    return {};
  },
  props: {
    alt: String,
    contain: Boolean,
    src: {
      type: [String, Object],
      default: ""
    },
    gradient: String,
    lazySrc: String,
    srcset: String,
    item: Object
  }
};
</script>
