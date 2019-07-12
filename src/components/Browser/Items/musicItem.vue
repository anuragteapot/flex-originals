<template>
  <div class="content-m-thumb">
    <div class="music__thumbnail">
      <lazy-image :src="src" :lazySrc="lazySrc" hover></lazy-image>
      <i class="fas fa-play fa-3x file-icon" aria-hidden="true"></i>
      <p>Christian</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "music-thumnail",
  data() {
    return {};
  },
  props: {
    alt: String,
    circle: Boolean,
    contain: Boolean,
    src: {
      type: [String, Object],
      default: ""
    },
    gradient: String,
    lazySrc: String,
    srcset: String,
    sizes: String
  }
};
</script>
