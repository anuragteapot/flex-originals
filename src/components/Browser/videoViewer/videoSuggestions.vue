<template>
  <div class="v-thumb">
    <div class="video__thumbnail">
      <router-link :to="`/app/@watch?v=${item.id}`">
        <lazy-image :src="src" :lazySrc="lazySrc" :alt="item.title"></lazy-image>
      </router-link>
    </div>
    <div class="video__info">
      <p class="title">{{ item.title }}</p>
      <p class="views">
        {{ item.user.username }}
        <img
          src="/public/verified.svg"
          width="10"
          height="10"
          alt="verified"
        />
        <br />
        {{ item.videoAnalytics.views }} views
        <br />
        {{ $utils.time_ago(new Date(item.published)) }}
      </p>
    </div>
  </div>
</template> 

<script>
export default {
  name: 'videoViewerSuggestions',
  data() {
    return {};
  },
  props: {
    alt: String,
    contain: Boolean,
    src: {
      type: [String, Object],
      default: '',
    },
    gradient: String,
    lazySrc: String,
    srcset: String,
    item: Object,
  },
};
</script>
