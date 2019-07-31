<template>
  <section class="content">
    <div class="inner">
      <div class="profile__banner">
        <div class="profile__banner__background">
          <div class="profile__avatar">
            <img :src="channelInfo.profileAvatar" />
          </div>
          <div class="social__media">
            <a
              v-show="channelInfo.facebook"
              :href="channelInfo.facebook"
              target="_blank"
              style="color:white"
            >
              <i class="fab fa-facebook-square" style="font-size:20px"></i>
            </a>
            <a
              v-show="channelInfo.instagram"
              :href="channelInfo.instagram"
              target="_blank"
              style="color:white"
            >
              <i class="fab fa-instagram" style="font-size:20px"></i>
            </a>
            <a
              v-show="channelInfo.twitter"
              :href="channelInfo.twitter"
              target="_blank"
              style="color:white"
            >
              <i class="fab fa-twitter-square" style="font-size:20px"></i>
            </a>
            <a
              v-show="channelInfo.redit"
              :href="channelInfo.redit"
              target="_blank"
              style="color:white"
            >
              <i class="fab fa-reddit-square" style="font-size:20px"></i>
            </a>
            <a
              v-show="channelInfo.linkedin"
              :href="channelInfo.linkedin"
              target="_blank"
              style="color:white"
            >
              <i class="fab fa-linkedin" style="font-size:20px"></i>
            </a>
          </div>
          <p class="channel__name">
            {{channelUser.realm}} ({{channelUser.username}})
            <i
              v-show="channelInfo.verifiedChannel"
              aria-label="verified"
              class="fas fa-certificate"
              style="color: lightgreen;"
            ></i>
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
    <lazy-audio-player v-if="layout === 'song'" />
  </section>
</template>

<script>
import * as types from "./../../../store/mutation-types";
import { api } from "./../../../app/Api.js";
import contentGrid from "./../Content/Grid/ContentGrid";

export default {
  name: "media-content",
  data: () => ({
    active: false,
    channelInfo: {},
    channelUser: ""
  }),
  watch: {
    $route() {
      this.init();
    }
  },
  computed: {
    layout() {
      const name = this.$route.name;
      if (name.split("@")[1]) {
        return name.split("@")[1];
      } else {
        return null;
      }
    },
    settings() {
      return this.$store.state.settings;
    },
    authUser() {
      return this.$api.webStorage.local.get("$userId");
    },
    editMode() {
      return this.$store.state.editMode;
    }
  },
  components: {
    contentGrid
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
      if (this.$route.params.id) {
        const content = await this.$store.dispatch("getContent", {
          userId: this.$route.params.id
        });

        this.channelUser = content.data.user;
        this.channelInfo = content.data.settings;
        this.$store.commit(types.SET_CONTENT, content.data);
      }
    }
  },
  created() {
    window.addEventListener("scroll", this.onScroll, false);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, false);
  },
  mounted() {
    this.init();
  }
};
</script>
