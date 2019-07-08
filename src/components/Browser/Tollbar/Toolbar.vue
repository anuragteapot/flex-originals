<template>
  <menu type="toolbar" class="menu">
    <div @click="toggleMenu" style="cursor: pointer;">
      <i class="fas fa-align-justify"></i>
    </div>
    <span class="menu__button">Trending</span>
    <span class="menu__button">Watch Later</span>
    <span class="menu__button">Liked Videos</span>
    <span class="menu__button">New Releases</span>
    <div class="menu-right">
      <input type="text" placeholder="Search...." />
      <span class="icon">
        <i class="fas fa-bell"></i>
      </span>
      <span class="icon">
        <i class="fas fa-ellipsis-v"></i>
      </span>
    </div>
  </menu>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "./../../../store/mutation-types";

export default {
  name: "toolbar",
  computed: {
    ...mapGetters(["isMobile", "isLoading", "appDrawer"])
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
    }
  }
};
</script>

