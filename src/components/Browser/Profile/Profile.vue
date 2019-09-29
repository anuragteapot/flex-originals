<template>
  <section :class="`content ${theme}`">
    <div class="inner">
      <div class="profile__banner">
        <div class="profile__banner__background">
          <div v-show="channelInfo.profileAvatar" class="profile__avatar">
            <img :src="channelInfo.profileAvatar" alt="logo" />
          </div>
          <div class="social__media">
            <a
              v-show="channelInfo.facebook"
              :href="`https://facebook.com/${channelInfo.facebook}`"
              target="_blank"
              style="color:white"
            >
              <i class="fab fa-facebook-square" style="font-size:20px"></i>
            </a>
            <a
              v-show="channelInfo.instagram"
              :href="`https://www.instagram.com/${channelInfo.instagram}`"
              target="_blank"
              style="color:white"
            >
              <i class="fab fa-instagram" style="font-size:20px"></i>
            </a>
            <a
              v-show="channelInfo.twitter"
              :href="`https://twitter.com/${channelInfo.twitter}`"
              target="_blank"
              style="color:white"
            >
              <i class="fab fa-twitter-square" style="font-size:20px"></i>
            </a>
            <a
              v-show="channelInfo.redit"
              :href="`https://www.reddit.com/r/${channelInfo.redit}`"
              target="_blank"
              style="color:white"
            >
              <i class="fab fa-reddit-square" style="font-size:20px"></i>
            </a>
            <a
              v-show="channelInfo.linkedin"
              :href="`https://www.linkedin.com/in/${channelInfo.linkedin}`"
              target="_blank"
              style="color:white"
            >
              <i class="fab fa-linkedin" style="font-size:20px"></i>
            </a>
          </div>
          <p class="channel__name" v-show="channelUser.username">
            {{channelUser.realm}} ({{channelUser.username}})
            <img
              src="/public/verified.svg"
              width="20"
              height="20"
              alt="verified"
            />
          </p>
          <button class="follow" style="background:red;" v-if="editMode" @click="onEditMode">
            <i class="far fa-edit"></i> Edit Mode On
          </button>
          <button
            class="follow"
            style="background:#7289da;"
            v-else-if="authUser === channelUser.id"
            @click="onEditMode"
          >
            <i class="far fa-edit"></i> Edit channel
          </button>
          <button class="follow" v-else>
            <i class="far fa-star"></i> Follow
          </button>
          <span class="followers">{{channelInfo.followers }} followers</span>
        </div>
      </div>
      <content-grid></content-grid>
    </div>
  </section>
</template>

<script>
import * as types from './../../../store/mutation-types';
import { api } from './../../../api/Api';
import contentGrid from './../Content/Grid/ContentGrid';

export default {
  name: 'media-content',
  data: () => ({
    active: false,
    channelInfo: {},
    channelUser: '',
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
    settings() {
      return this.$store.state.settings;
    },
    authUser() {
      return this.$api.webStorage.local.get('$userId');
    },
    editMode() {
      return this.$store.state.editMode;
    },
  },
  components: {
    contentGrid,
  },
  methods: {
    onScroll: api.debounce(function() {}, 300),
    async onEditMode() {
      if (
        (await this.$api.isLogged()) &&
        this.authUser === this.channelUser.id
      ) {
        if (this.editMode) {
          this.$store.commit(types.SELECT_BROWSER_ITEM, false);
          this.$store.commit(types.SET_EDIT_MODE, false);
        } else {
          this.$store.commit(types.SET_EDIT_MODE, true);
        }
      }
    },
    async init() {
      const content = await this.$store.dispatch('GET_CONTENT', {
        userId: this.$route.params.id,
      });

      this.channelUser = content.data.user;
      this.channelInfo = content.data.settings;
      this.$store.commit(types.SET_CONTENT, content.data);
    },
  },
  created() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onScroll, false);
    }
  },
  destroyed() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll, false);
    }
  },
  async beforeMount() {
    let content;
    this.$store.commit(types.SET_CONTENT, { audio: [], video: [] });
    try {
      content = await this.$store.dispatch('GET_CONTENT', {
        userId: this.$route.params.id,
      });
    } catch (err) {
      this.$api._handleError(err);
    }
    this.channelUser = content.data.user;
    this.channelInfo = content.data.settings;
    this.$store.commit(types.SET_CONTENT, content.data);
  },
};
</script>
