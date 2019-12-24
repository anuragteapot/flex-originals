<template>
  <section class="content">
    <div class="inner">
      <div class="profile__banner" v-show="channelUser.user.username">
        <div class="profile__banner__background">
          <div
            v-show="channelUser.settings.profileAvatar"
            class="profile__avatar"
          >
            <img :src="channelUser.settings.profileAvatar" alt="logo" />
          </div>
          <div class="social__media">
            <a
              v-show="channelUser.settings.facebook"
              :href="`https://facebook.com/${channelUser.settings.facebook}`"
              target="_blank"
              style="color:white"
            >
              <i class="fab fa-facebook-square" style="font-size:20px"></i>
            </a>
            <a
              v-show="channelUser.settings.instagram"
              :href="
                `https://www.instagram.com/${channelUser.settings.instagram}`
              "
              target="_blank"
              style="color:white"
            >
              <i class="fab fa-instagram" style="font-size:20px"></i>
            </a>
            <a
              v-show="channelUser.settings.twitter"
              :href="`https://twitter.com/${channelUser.settings.twitter}`"
              target="_blank"
              style="color:white"
            >
              <i class="fab fa-twitter-square" style="font-size:20px"></i>
            </a>
            <a
              v-show="channelUser.settings.redit"
              :href="`https://www.reddit.com/r/${channelUser.settings.redit}`"
              target="_blank"
              style="color:white"
            >
              <i class="fab fa-reddit-square" style="font-size:20px"></i>
            </a>
            <a
              v-show="channelUser.settings.linkedin"
              :href="
                `https://www.linkedin.com/in/${channelUser.settings.linkedin}`
              "
              target="_blank"
              style="color:white"
            >
              <i class="fab fa-linkedin" style="font-size:20px"></i>
            </a>
          </div>
          <p class="channel__name" v-show="channelUser.user.username">
            {{ channelUser.user.realm }} ({{ channelUser.user.username }})
            <img
              src="/public/verified.svg"
              width="20"
              height="20"
              alt="verified"
            />
          </p>
          <button
            class="follow"
            style="background:red;"
            v-if="editMode"
            @click="onEditMode"
          >
            <i class="far fa-edit"></i> Edit Mode On
          </button>
          <button
            class="follow"
            style="background:#7289da;"
            v-else-if="authUser === channelUser.user.id"
            @click="onEditMode"
          >
            <i class="far fa-edit"></i> Edit channel
          </button>
          <button class="follow" v-else>
            <i class="far fa-star"></i> Follow
          </button>
          <span class="followers"
            >{{ channelUser.settings.followers }} followers</span
          >
        </div>
      </div>
      <content-grid></content-grid>
    </div>
  </section>
</template>

<script>
import * as types from './../../../store/mutation-types';
import utils from './../../../api/utils';
import contentGrid from './../Content/Grid/ContentGrid';

export default {
  name: 'media-content',
  data: () => ({
    active: false,
  }),
  computed: {
    channelUser() {
      return this.$store.state.contentUser;
    },
    settings() {
      return this.$store.state.settings;
    },
    authUser() {
      return this.$user.get('$userId');
    },
    editMode() {
      return this.$store.state.editMode;
    },
  },
  components: {
    contentGrid,
  },
  methods: {
    onScroll: new utils().debounce(function() {}, 300),
    async onEditMode() {
      if (
        (await this.$user.isLogged()) &&
        this.authUser === this.channelUser.user.id
      ) {
        if (this.editMode) {
          this.$store.commit(types.SELECT_BROWSER_ITEM, false);
          this.$store.commit(types.SET_EDIT_MODE, false);
        } else {
          this.$store.commit(types.SET_EDIT_MODE, true);
        }
      }
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
};
</script>
