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
  asyncData({
    store,
    route: {
      query: { v },
    },
  }) {
    return store.dispatch('GET_VIDEO', {
      id: v,
    });
  },
  components: {
    watch,
    toolbar,
    asideDes,
    asideAction,
  },
  computed: {
    ...mapGetters(['isLoading', 'isMobile']),
  },
  methods: {
    toggleAppDrawer: function(val) {
      this.appDrawer = val;
    },
    toggleMenu: function() {
      if (this.appDrawer) {
        this.appDrawer = false;
        window.localStorage.removeItem('APP_DRAWER');
      } else {
        this.appDrawer = true;
        window.localStorage.setItem('APP_DRAWER', true);
      }
    },
  },
  async beforeMount() {
    await this.$store.dispatch('GET_CONTENT', {});
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('APP_DRAWER');
      if (window.localStorage.getItem('APP_DRAWER')) {
        this.appDrawer = true;
      } else {
        this.appDrawer = false;
      }
    }
  },
};
</script>
