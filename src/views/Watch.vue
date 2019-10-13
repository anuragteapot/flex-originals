<template>
  <div class="fo-browser">
    <div v-show="isMobile" :class="`nav-offcanvas ${appDrawer ? 'open' : ''}`">
      <div class="nav-offcanvas-menu">
        <aside-action></aside-action>
        <aside-des v-show="isAuthenticated"></aside-des>
      </div>
    </div>
    <div
      v-show="isMobile"
      :class="`offcanvas-overlay ${appDrawer ? 'on' : ''}`"
      @click="toggleMenu"
    ></div>

    <aside-action v-show="!isMobile && appDrawer"></aside-action>
    <aside-des v-show="!isMobile && appDrawer && isAuthenticated"></aside-des>

    <div class="main-container">
      <toolbar @toggleAppDrawer="toggleAppDrawer"></toolbar>
      <watch></watch>
    </div>
  </div>
</template>

<script>
import watch from './../components/Browser/videoViewer/videoViewer';
import asideAction from './../components/Browser/Aside/AsideAction';
import asideDes from './../components/Browser/Aside/AsideDes';
import toolbar from './../components/Browser/Toolbar/Toolbar';

import { mapGetters } from 'vuex';

export default {
  name: 'fo-watch',
  data() {
    return {
      appDrawer: false,
    };
  },
  asyncData({ isServer, store }) {
    return store.dispatch('GET_CONTENT', { isServer });
  },
  components: {
    watch,
    toolbar,
    asideDes,
    asideAction,
  },
  computed: {
    ...mapGetters(['isMobile', 'isAuthenticated']),
  },
  methods: {
    toggleAppDrawer: function(val) {
      this.appDrawer = val;
    },
    toggleMenu: function() {
      if (this.appDrawer) {
        this.appDrawer = false;
        window.localStorage.setItem('APP_DRAWER', false);
      } else {
        this.appDrawer = true;
        window.localStorage.setItem('APP_DRAWER', true);
      }
    },
  },
  async beforeMount() {
    // await this.$store.dispatch('GET_CONTENT', {});
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('APP_DRAWER');
      if (window.localStorage.getItem('APP_DRAWER') == 'true') {
        this.appDrawer = true;
      } else {
        this.appDrawer = false;
      }
    }
  },
};
</script>
