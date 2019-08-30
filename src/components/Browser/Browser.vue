<template>
  <div class="fo-browser">
    <div v-if="isMobile" :class="`nav-offcanvas ${appDrawer.mobileState ? 'open' : ''}`">
      <div class="nav-offcanvas-menu">
        <aside-action></aside-action>
        <aside-des></aside-des>
      </div>
    </div>
    <div
      v-if="isMobile"
      :class="`offcanvas-overlay ${appDrawer.mobileState ? 'on' : ''}`"
      @click="toggleMenu"
    ></div>

    <aside-action v-if="!isMobile && appDrawer.des"></aside-action>
    <aside-des v-if="!isMobile && appDrawer.des"></aside-des>

    <div class="main-container">
      <toolbar></toolbar>
      <component v-bind:is="layout"></component>
      <lazy-audio-player v-if="$route.name == '@song'" />
    </div>
  </div>
</template>

<script>
import * as types from "./.././../store/mutation-types.js";
import home from "./../Browser/Content/MainContent";
import settings from "./Settings/Settings";
import channel from "./Profile/Profile";
import upload from "./Upload/Upload";
import watch from "./videoViewer/videoViewer";
import asideAction from "./Aside/AsideAction";
import asideDes from "./Aside/AsideDes";
import toolbar from "./../Browser/Toolbar/Toolbar";
import editvideo from "./../Browser/EditVideo/EditVideo";
import { mapGetters } from "vuex";

export default {
  name: "media-browser",
  data() {
    return {};
  },
  watch: {
    $route() {
      this.$store.commit(types.SET_EDIT_MODE, false);
      this.$store.commit(types.SELECT_BROWSER_ITEM, false);
      this.$store.commit(types.HIDE_MODAL);
      this.init();
    }
  },
  components: {
    home,
    settings,
    upload,
    watch,
    channel,
    asideAction,
    asideDes,
    toolbar,
    editvideo
  },
  computed: {
    ...mapGetters(["isMobile", "isLoading", "appDrawer"]),
    layout() {
      const name = this.$route.name;
      if (name.split("@")[1]) {
        if (name.split("@")[1] == "song") {
          return "home";
        } else {
          return name.split("@")[1];
        }
      } else {
        return "home";
      }
    }
  },
  methods: {
    toggleMenu: function() {
      if (this.isMobile && !this.appDrawer.mobileState) {
        this.$store.commit(types.APP_DRAWER, {
          action: true,
          des: true,
          mobileState: true
        });
      } else if (this.appDrawer.action) {
        this.$store.commit(types.APP_DRAWER, {
          action: false,
          des: false,
          mobileState: false
        });
      } else {
        this.$store.commit(types.APP_DRAWER, {
          action: true,
          des: true,
          mobileState: true
        });
      }
    },
    async init() {
      let content = {};
      if (this.$route.params.id) {
        content = await this.$store.dispatch("getContent", {
          userId: this.$route.params.id
        });
      } else {
        content = await this.$store.dispatch("getContent", {});
      }
      this.$store.commit(types.SET_CONTENT, content.data);
    }
  },
  async beforeMount() {
    if (this.$api.webStorage.local.get("$userId")) {
      const settings = await this.$store.dispatch("findSettings", {
        uid: this.$api.webStorage.local.get("$userId")
      });
      this.$store.commit(types.SET_SETTINGS, settings);
    }
    let content = {};
    if (this.$route.params.id) {
      content = await this.$store.dispatch("getContent", {
        userId: this.$route.params.id
      });
    } else {
      content = await this.$store.dispatch("getContent", {});
    }
    this.$store.commit(types.SET_CONTENT, content.data);
  }
};
</script>
