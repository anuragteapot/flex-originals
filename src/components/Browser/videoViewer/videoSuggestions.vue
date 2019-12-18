<template>
  <div class="container">
    Suggestions
  </div>
</template>

<script>
// import musicThumb from './../Items/MusicItem';
// import videoThumb from './../Items/VideoItem';

export default {
  name: 'videoViewerSuggestions',
  data() {
    return {};
  },
  components: {
    // videoThumb,
    // musicThumb,
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
