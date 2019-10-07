<template>
  <div class="fo-browser">
    <div v-if="isMobile" :class="`nav-offcanvas ${appDrawer ? 'open' : ''}`">
      <div class="nav-offcanvas-menu">
        <aside-action></aside-action>
        <aside-des></aside-des>
      </div>
    </div>
    <div v-if="isMobile" :class="`offcanvas-overlay ${appDrawer ? 'on' : ''}`" @click="toggleMenu"></div>

    <aside-action v-if="!isMobile && appDrawer"></aside-action>
    <aside-des v-if="!isMobile && appDrawer"></aside-des>

    <div class="main-container">
      <toolbar></toolbar>
      <component v-bind:is="layout"></component>
      <lazy-audio-player v-if="$route.name == '@song'" />
    </div>
  </div>
</template>

<script>
import * as types from './.././../store/mutation-types.js';
import home from './../Browser/Content/MainContent';
import settings from './Settings/Settings';
import channel from './Profile/Profile';
import upload from './Upload/Upload';
import watch from './videoViewer/videoViewer';
import asideAction from './Aside/AsideAction';
import asideDes from './Aside/AsideDes';
import toolbar from './../Browser/Toolbar/Toolbar';
import editvideo from './../Browser/EditVideo/EditVideo';
import { mapGetters } from 'vuex';

export default {
  name: 'media-browser',
  data() {
    return {};
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
    editvideo,
  },
  computed: {
    ...mapGetters(['isMobile', 'isLoading', 'appDrawer']),
    layout() {
      const name = this.$route.name;
      if (name.split('@')[1]) {
        if (name.split('@')[1] == 'song') {
          return 'home';
        } else {
          return name.split('@')[1];
        }
      } else {
        return 'home';
      }
    },
  },
  methods: {
    toggleMenu: function() {
      if (this.appDrawer) {
        this.$store.commit(types.APP_DRAWER, false);
      } else {
        this.$store.commit(types.APP_DRAWER, true);
      }
    },
  },
  async beforeMount() {
    if (this.$user.get('$userId')) {
      const settings = await this.$store.dispatch('FIND_SETTINGS', {
        uid: this.$user.get('$userId'),
      });
      this.$store.commit(types.SET_SETTINGS, settings);
    }
  },
};
</script>
