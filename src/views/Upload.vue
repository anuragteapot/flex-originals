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
      <upload></upload>
    </div>
  </div>
</template>

<script>
import upload from './../components/Browser/Upload/Upload';
import asideAction from './../components/Browser/Aside/AsideAction';
import asideDes from './../components/Browser/Aside/AsideDes';
import toolbar from './../components/Browser/Toolbar/Toolbar';

import { mapGetters } from 'vuex';

export default {
  name: 'fo-upload',
  data() {
    return {
      appDrawer: false,
    };
  },
  components: {
    upload,
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
        window.localStorage.removeItem('APP_DRAWER');
      } else {
        this.appDrawer = true;
        window.localStorage.setItem('APP_DRAWER', true);
      }
    },
  },
  async beforeMount() {
    if (typeof window !== 'undefined') {
      if (window.localStorage.getItem('APP_DRAWER')) {
        this.appDrawer = true;
      } else {
        this.appDrawer = false;
      }
    }
  },
};
</script>
