<template>
  <div class="video__comment">
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
      <div class="video__comment__message" ref="messageDiv">
        <ul>
          <transition-group name="list" tag="li">
            <li v-for="item in comments" :key="item.id">
              <div class="video__comment_render">
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
                      {{ item.name }}
                    </div>
                    <p class="message">
                      {{ item.message }}
                    </p>
                  </div>
                </div>
                <div class="right">
                  <fo-svg-three-dot
                    width="20px"
                    height="20px"
                    cursor="pointer"
                  ></fo-svg-three-dot>
                </div>
              </div>
            </li>
          </transition-group>
        </ul>
      </div>
      <div class="video__comment__box">
        <div class="left">
          <textarea
            v-model="comment"
            class="video_comment_input"
            placeholder="Add a comment..."
          ></textarea>
        </div>
        <div class="right">
          <button class="fo-button post" @click="addComment">
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
    id: 7,
    comments: [
      {
        id: '1',
        name: 'Anurag Kumar Creator',
        message:
          'Flex Originals is an opensource project. Contributions are welcome. Just fork and start Thanks.',
      },
      {
        id: '2',
        name: 'Anurag Kumar',
        message: 'Hi',
      },
      {
        id: '3',
        name: 'Amit',
        message: 'Hello',
      },
      {
        id: '4',
        name: 'Rajeev',
        message: 'Nice Video keep it up',
      },
      {
        id: '5',
        name: 'Anurag',
        message: 'hello',
      },

      {
        id: '6',
        name: 'Anurag',
        message: 'hello',
      },
    ],
    user: {
      username: 'Flex Originals',
    },
    settings: {},
  }),
  props: {},
  methods: {
    addComment() {
      this.comments.push({
        id: this.id++,
        name: 'Anonymous',
        message: this.comment,
      });
      this.comment = '';

      let messageDiv = this.$refs.messageDiv;
      messageDiv.scrollTop = messageDiv.scrollHeight;
    },
  },
};
</script>