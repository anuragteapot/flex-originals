<template>
  <div class="embed__video">
    <fo-video-player :error="error" :src="videoSource" v-if="!videoUnavaliable" :autoPlay="false"></fo-video-player>
  </div>
</template>

<script>
import * as types from "@/store/mutation-types";
export default {
  name: "fo-embed-video",
  data: () => ({
    autoPlay: false,
    error: false,
    src: "/public/qq.webp",
    lazySrc: "/public/icons/music.svg",
    videoSource: "",
    videoId: "",
    analytic: "",
    user: {},
    settings: {},
    video: {},
    videoUnavaliable: false
  }),
  watch: {
    $route() {
      this.init();
    }
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    }
  },
  methods: {
    async init() {
      if (this.$route.params.v) {
        this.$api.Nprogress.start();
        this.$store.commit(types.SET_IS_LOADING, true);
        let currentVideo = {};
        try {
          currentVideo = await this.$api
            .axios()
            .get(`/api/actions/getVideo/${this.$route.params.v}`);
          this.$store.commit(types.SET_IS_LOADING, false);
          this.$api.Nprogress.done();
        } catch (err) {
          this.videoUnavaliable = true;
          this.$store.commit(types.SET_IS_LOADING, false);
          this.$api.Nprogress.done();
        }

        if (!currentVideo.data) {
          this.videoUnavaliable = true;
          return 0;
        }
        if (currentVideo.data.video.videoFile.includes("https")) {
          this.videoSource = currentVideo.data.video.videoFile;
        } else {
          this.videoSource = "/" + currentVideo.data.video.videoFile;
        }
        this.analytic = currentVideo.data.analytic;
        this.user = currentVideo.data.user;
        this.settings = currentVideo.data.settings;
        this.video = currentVideo.data.video;
      } else {
        this.error = true;
      }
    }
  },
  async beforeMount() {
    this.init();
  }
};
</script>
