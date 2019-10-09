<template>
  <div class="fo-browser">
    <div v-if="isMobile" :class="`nav-offcanvas ${appDrawer ? 'open' : ''}`">
      <div class="nav-offcanvas-menu">
        <aside-action></aside-action>
        <aside-des></aside-des>
      </div>
    </div>
    <div
      v-if="isMobile"
      :class="`offcanvas-overlay ${appDrawer ? 'on' : ''}`"
      @click="toggleMenu"
    ></div>

    <aside-action v-if="!isMobile && appDrawer"></aside-action>
    <aside-des v-if="!isMobile && appDrawer"></aside-des>

    <div class="main-container">
      <toolbar></toolbar>
      <editvideo></editvideo>
    </div>
  </div>
</template>

<script>
import * as types from './../store/mutation-types.js';
import editvideo from './../components/Browser/EditVideo/EditVideo';
import asideAction from './../components/Browser/Aside/AsideAction';
import asideDes from './../components/Browser/Aside/AsideDes';
import toolbar from './../components/Browser/Toolbar/Toolbar';

import { mapGetters } from 'vuex';

export default {
  name: 'media-browser',
  data() {
    return {};
  },
  components: {
    editvideo,
    toolbar,
    asideDes,
    asideAction,
  },
  computed: {
    ...mapGetters(['isLoading', 'appDrawer', 'isMobile']),
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
};
</script>
