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
        <!-- <div class="settings">
          <emoji></emoji>
        </div> -->
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
                    <div
                      :class="`channel__name ${item.special ? 'special' : ''}`"
                    >
                      {{ item.name }}
                    </div>
                    <p class="message">
                      {{ item.message }}
                    </p>
                  </div>
                </div>
                <div class="right">
                  <!-- <emoji-like
                    width="20px"
                    height="20px"
                    cursor="pointer"
                  ></emoji-like> -->
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
      <div class="video__comment__box__settings">
        <div class="left"></div>
        <div class="right">
          <span class="chat__type">{{
            chatType ? 'Live Chat' : 'Top Chat'
          }}</span>
          <label class="switch">
            <input name="autoplay" v-model="chatType" type="checkbox" />
            <div></div>
          </label>
        </div>
      </div>
      <div class="video__comment__box">
        <div class="left">
          <textarea
            v-model="comment"
            @input="startComment"
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
// import emoji from './Emoji';
export default {
  name: 'video-comment',
  components: {
    // emoji,
  },
  data: () => ({
    chatType: true,
    comment: '',
    id: 7,
    comments: [
      {
        id: '1',
        special: true,
        name: 'Anurag Kumar Creator',
        message:
          'Flex Originals is an opensource project. Contributions are welcome. Just fork and start Thanks.',
      },
      {
        id: '2',
        special: false,
        name: 'Anurag Kumar',
        message: 'Hi',
      },
      {
        id: '3',
        special: true,
        name: 'Amit',
        message: 'Hello',
      },
      {
        id: '4',
        special: false,
        name: 'Rajeev',
        message: 'Nice Video keep it up',
      },
      {
        id: '5',
        special: false,
        name: 'Anurag',
        message: 'hello',
      },

      {
        id: '6',
        special: false,
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
    startComment() {
      this.$emit('comment', this.comment);
    },
    addComment() {
      if (this.comment == '') return 0;
      this.comments.push({
        id: this.id++,
        name: 'Anonymous',
        special: false,
        message: this.comment,
      });
      this.comment = '';

      let messageDiv = this.$refs.messageDiv;
      messageDiv.scrollTop = messageDiv.scrollHeight;
    },
  },
};
</script>
