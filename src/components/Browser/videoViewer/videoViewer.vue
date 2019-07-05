<template>
  <div class="video-viewer content">
    <div class="inner">
      <div class="video-viewer__wrapper">
        <div class="card">
          <div class="card__body">
            <div class="container">
              <div class="grid grid--half left">
                <lazy-video-player
                  src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"
                ></lazy-video-player>
                <div class="video_actions">
                  <p>Anurag</p>
                  <span>111111views</span>
                </div>
              </div>
              <div class="grid grid--half right">
                <lazy-file :src="src" :lazySrc="lazySrc"></lazy-file>
                <lazy-file :src="src" :lazySrc="lazySrc"></lazy-file>
                <lazy-file :src="src" :lazySrc="lazySrc"></lazy-file>
                <lazy-file :src="src" :lazySrc="lazySrc"></lazy-file>
                <lazy-file :src="src" :lazySrc="lazySrc"></lazy-file>
                <lazy-file :src="src" :lazySrc="lazySrc"></lazy-file>

                <lazy-file :src="src" :lazySrc="lazySrc"></lazy-file>
                <lazy-file :src="src" :lazySrc="lazySrc"></lazy-file>
                <lazy-file :src="src" :lazySrc="lazySrc"></lazy-file>
                <lazy-file :src="src" :lazySrc="lazySrc"></lazy-file>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import itemFile from "./../Items/videoItem";

export default {
  name: "media-settings",
  data: () => ({
    src: "/public/sample.jpeg",
    lazySrc: "/public/icons/music.svg"
  }),
  components: {
    "lazy-file": itemFile
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$router.push("/app/@home?u=logout");
        this.$api.auth.logout();
      } catch (err) {
        this.$router.push("/app/@home?u=logout");
        this.$api.auth.logout();
      }
    }
  }
};
</script>
