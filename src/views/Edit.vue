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
      <editvideo></editvideo>
    </div>
  </div>
</template>

<script>
import editvideo from './../components/Browser/EditVideo/EditVideo';
import asideAction from './../components/Browser/Aside/AsideAction';
import asideDes from './../components/Browser/Aside/AsideDes';
import toolbar from './../components/Browser/Toolbar/Toolbar';

import { mapGetters } from 'vuex';

export default {
  name: 'fo-edit',
  data() {
    return {
      appDrawer: false,
    };
  },
  components: {
    editvideo,
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
