<template>
  <div class="default-video-player">
    <video
      :src="src"
      class="default-video-player__media"
      ref="media"
      controls
      controlslist="nodownload"
    ></video>
  </div>
</template>
<script>
export default {
  metaInfo() {
    return {
      title: this.videoInfo.title,
      titleTemplate: '%s - Flex Originals!',
      htmlAttrs: {
        lang: 'en',
        amp: true,
      },
      meta: [
        { name: 'description', content: this.videoInfo.description },
        {
          name: 'url',
          content: typeof window != 'undefined' ? window.location.href : '',
        },
        { name: 'og:title', content: this.videoInfo.title },
        { name: 'og:type', content: 'Video' },
        {
          name: 'og:url',
          content: typeof window != 'undefined' ? window.location.href : '',
        },
        { name: 'og:site_name', content: 'Flex Originals' },
        { name: 'og:image', content: '/' + this.videoInfo.thumbImage },
        { name: 'og:description', content: this.videoInfo.description },
        { name: 'og:video', content: '/' + this.videoInfo.videoFile },
        { name: 'og:video:type', content: 'video/mp4' },
        { name: 'og:video:height', content: '400' },
        { name: 'og:video:width', content: '600' },
      ],
    };
  },
  data() {
    return {};
  },
  props: {
    src: String,
    disablekey: {
      type: Boolean,
      default: false,
    },
    videoInfo: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  watch: {
    src(val) {
      if (this.error || !val) return 0;
      this.loading = true;
      this.isPlaying = false;
      this.media.src = val;
      if (this.$route.query.t) {
        this.media.currentTime = this.$route.query.t;
      }
      this.media.load();
    },
  },
  computed: {
    media: function() {
      return this.$refs.media;
    },
  },
  methods: {
    handleProgress() {
      if (
        Math.floor(this.media.currentTime) >=
          Math.floor(this.media.duration / 2) - 5 &&
        Math.floor(this.media.currentTime) <=
          Math.ceil(this.media.duration / 2) + 5
      ) {
        if (Math.floor(this.media.currentTime) != 0) {
          this.$emit('halfTime');
        }
      }
    },
  },
  mounted: function() {
    this.media.addEventListener('timeupdate', this.handleProgress);
  },
  beforeDestroy() {
    this.media.pause();
    this.media.removeEventListener('timeupdate', this.handleProgress);
  },
};
</script>


<style scoped>
.default-video-player {
  width: 100%;
  position: relative;
  display: block;
  overflow: hidden;
  height: 100%;
  color: #fff !important;
}

.default-video-player__media {
  display: block;
  width: 100%;
  height: 100%;
  margin: auto;
  background: #000;
  overflow: hidden;
}
</style>