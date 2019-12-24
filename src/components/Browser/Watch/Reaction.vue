<template>
  <div class="feed">
    <div
      class="like-btn fo-button"
      @mouseover="show = true"
      @mouseleave="show = false"
    >
      <emoji-like width="20px" height="20px" cursor="pointer"></emoji-like>
      <!-- <emoji-love v-show="like-1 == 1"></emoji-love> -->
      <!-- <emoji-laughing v-show="like-1 == 2"></emoji-laughing> -->
      <!-- <emoji-thinking v-show="like-1 == 3"></emoji-thinking> -->
      <!-- <emoji-sad v-show="like-1 == 4"></emoji-sad> -->
      <!-- <emoji-angry v-show="like-1 == 5"></emoji-angry> -->
      <!-- <emoji-no-like v-show="like -1 == -1"></emoji-no-like> -->
    </div>
    <div
      :class="`reaction-box ${show ? 'show' : ''}`"
      @mouseover="show = true"
      @mouseleave="show = false"
    >
      <div :class="`reaction-icon ${show ? 'show' : ''}`">
        <label>Like</label>
        <emoji-like cursor="pointer"></emoji-like>
      </div>
      <div :class="`reaction-icon ${show ? 'show' : ''}`">
        <label>Love</label>
        <emoji-love cursor="pointer"></emoji-love>
      </div>
      <div :class="`reaction-icon ${show ? 'show' : ''}`">
        <label>Haha</label>
        <emoji-laughing cursor="pointer"></emoji-laughing>
      </div>
      <div :class="`reaction-icon ${show ? 'show' : ''}`">
        <label>Thinking</label>
        <emoji-thinking cursor="pointer"></emoji-thinking>
      </div>
      <div :class="`reaction-icon ${show ? 'show' : ''}`">
        <label>Sad</label>
        <emoji-sad cursor="pointer"></emoji-sad>
      </div>
      <div :class="`reaction-icon ${show ? 'show' : ''}`">
        <label>Angry</label>
        <emoji-angry cursor="pointer"></emoji-angry>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'video-reaction',
  data() {
    return {
      like: 0,
      show: false,
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
