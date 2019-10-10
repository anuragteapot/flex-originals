<template>
  <div class="feed">
    <button class="like-btn fo-button">
      <emoji-like v-show="like-1 == 0"></emoji-like>
      <emoji-love v-show="like-1 == 1"></emoji-love>
      <emoji-laughing v-show="like-1 == 2"></emoji-laughing>
      <emoji-thinking v-show="like-1 == 3"></emoji-thinking>
      <emoji-sad v-show="like-1 == 4"></emoji-sad>
      <emoji-angry v-show="like-1 == 5"></emoji-angry>
      <emoji-no-like v-show="like -1 == -1"></emoji-no-like>
      <div class="reaction-box">
        <div class="reaction-icon show">
          <label>Like</label>
          <emoji-like></emoji-like>
        </div>
        <div class="reaction-icon show">
          <label>Love</label>
          <emoji-love></emoji-love>
        </div>
        <div class="reaction-icon show">
          <label>Haha</label>
          <emoji-laughing></emoji-laughing>
        </div>
        <div class="reaction-icon show">
          <label>Thinking</label>
          <emoji-thinking></emoji-thinking>
        </div>
        <div class="reaction-icon show">
          <label>Sad</label>
          <emoji-sad></emoji-sad>
        </div>
        <div class="reaction-icon show">
          <label>Angry</label>
          <emoji-angry></emoji-angry>
        </div>
      </div>
    </button>
  </div>
</template>
<script>
export default {
  name: 'video-reaction',
  data() {
    return {
      like: 0,
      likeMap: [
        '/public/emoji/002-heart.svg',
        '/public/emoji//002-in-love.svg',
        '/public/emoji/happy.svg',
        '/public/emoji/001-thinking.svg',
        '/public/emoji/004-sad.svg',
        '/public/emoji/005-angry.svg',
      ],
    };
  },
  props: {
    video: {
      type: Object,
      default: null,
    },
  },
  computed: {
    loggedUser() {
      return this.$user.getUser();
    },
  },
  $watch: {
    video(val) {
      console.log(val);
      this.getLike();
    },
  },
  methods: {
    async reaction(react) {
      const like = await this.$store.dispatch('LIKE_END_POINT', {
        userId: this.loggedUser.id,
        videoId: this.video.id,
        reaction: react,
      });

      this.like = like.data.REACTION;
    },
    async getLike() {
      if (this.loggedUser.id && this.video.id) {
        const like = await this.$store.dispatch('GET_LIKE', {
          userId: this.loggedUser.id,
          videoId: this.video.id,
        });

        this.like = like.data.REACTION;
      }
    },
  },
};
</script>