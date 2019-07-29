<template>
  <div class="content-m-thumb">
    <div class="music__thumbnail" @click="$router.push(`/app/@song?a=${item.id}`)"> 
      <lazy-image :src="src" :lazySrc="lazySrc" hover :active="item.id == $route.query.a"></lazy-image>
      <!-- <i class="fas fa-pause-circle fa-3x file-icon-play" ></i> -->
      <i class="fas fa-play fa-3x file-icon" v-if="item.id !== $route.query.a" aria-hidden="true"></i>
      <div class="audio__info">
        <p class="title">{{item.title}}</p>
        <p class="views">alenter</p>
      </div>
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
    sizes: String,
    item: Object
  }
};
</script>
