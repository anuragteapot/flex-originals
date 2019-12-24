<template>
  <div :class="`video__comment ${theme}`">
    <div class="video__comment__inner">
      <div class="video__profile__action">
        <div class="left">
          <div class="channel__avater">
            <router-link :to="`/app/@channel/${user.id}`">
              <img
                alt="Avatar"
                :src="settings.profileAvatar || `/public/logo.png`"
                class="avatar"
              />
            </router-link>
            <div class="channel__name">
              {{ user.username }} <fo-svg-verified></fo-svg-verified>
            </div>
          </div>
        </div>
        <div class="right">
          <button class="follow theme">
            Follow
          </button>
        </div>
      </div>
      <div class="video__comment__message"></div>
      <div class="video__comment__box">
        <div class="left">
          <textarea
            v-model="comment"
            class="video_comment_input"
            placeholder="Add a comment..."
          ></textarea>
        </div>
        <div class="right">
          <button class="fo-button post">
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'video-comment',
  data: () => ({
    comment: '',
    user: {
      username: 'Flex Originals',
    },
    settings: {},
  }),
  props: {},
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
};
</script>
