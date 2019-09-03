<template>
  <div class="v-thumb">
    <div class="video__thumbnail" @click="$router.push(`/app/@watch?v=${item.id}`)">
      <lazy-image :src="src" :lazySrc="lazySrc"></lazy-image>
    </div>
    <div class="video__info">
      <p class="title">{{ item.title }}</p>
        <p class="views">
          {{ item.user.username }}
          <img src="/public/verified.svg" width="10" height="10" />
          <br />
          {{ item.videoAnalytics.views }} views <br/>  {{ $api.time_ago(new Date(item.published)) }}
        </p>
    </div>
  </div>
</template> 

<script>
export default {
  name: "videoViewerSuggestions",
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
