<template>
  <div class="fo-browser">
    <div v-show="isMobile" :class="`nav-offcanvas ${appDrawer ? 'open' : ''}`">
      <div class="nav-offcanvas-menu">
        <aside-action></aside-action>
        <aside-des></aside-des>
      </div>
    </div>
    <div
      v-show="isMobile"
      :class="`offcanvas-overlay ${appDrawer ? 'on' : ''}`"
      @click="toggleMenu"
    ></div>

    <aside-action v-show="!isMobile && appDrawer"></aside-action>
    <aside-des v-show="!isMobile && appDrawer"></aside-des>

    <div class="main-container">
      <toolbar @toggleAppDrawer="toggleAppDrawer"></toolbar>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import asideAction from './Aside/AsideAction';
import asideDes from './Aside/AsideDes';
import toolbar from './Toolbar/Toolbar';

import { mapGetters } from 'vuex';

export default {
  name: 'fo-home',
  data() {
    return {
      appDrawer: false,
    };
  },
  components: {
    toolbar,
    asideDes,
    asideAction,
  },
  computed: {
    ...mapGetters(['isMobile', 'isAuthenticated']),
  },
  asyncData({ isServer, store }) {
    return store.dispatch('GET_CONTENT', { isServer });
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
    if (typeof window !== 'undefined') {
      if (this.$route.name == '@watch') return false;
      if (window.localStorage.getItem('APP_DRAWER') == 'true') {
        this.appDrawer = true;
      } else if (window.localStorage.getItem('APP_DRAWER') == 'false') {
        this.appDrawer = false;
      } else {
        this.appDrawer = true;
      }
    }
  },
};
</script>
