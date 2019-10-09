<template>
  <div class="embed__video">
    <fo-video-player  :embed="true" :videoInfo="video" :error="error" :src="videoSource" v-if="!videoUnavaliable" :autoPlay="false"></fo-video-player>
  </div>
</template>

<script>
export default {
  name: 'fo-embed-video',
  data: () => ({
    autoPlay: false,
    error: false,
    src: '/public/qq.webp',
    lazySrc: '/public/icons/music.svg',
    videoSource: '',
    videoId: '',
    analytic: '',
    user: {},
    settings: {},
    video: {},
    videoUnavaliable: false,
  }),
  watch: {
    $route() {
      this.init();
    },
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
  methods: {
    async init() {
      if (this.$route.params.v) {
        let currentVideo = {};
        
        try {
          currentVideo = await this.$store.dispatch('GET_VIDEO', {
            id: this.$route.params.v,
          });
        } catch (err) {
          this.videoUnavaliable = true;
        }

        if (!currentVideo.data) {
          this.videoUnavaliable = true;
          return 0;
        }
        if (currentVideo.data.video.videoFile.includes('https')) {
          this.videoSource = currentVideo.data.video.videoFile;
        } else {
          this.videoSource = '/' + currentVideo.data.video.videoFile;
        }
        this.analytic = currentVideo.data.analytic;
        this.user = currentVideo.data.user;
        this.settings = currentVideo.data.settings;
        this.video = currentVideo.data.video;
      } else {
        this.error = true;
      }
    },
  },
  async beforeMount() {
    this.init();
  },
};
</script>
