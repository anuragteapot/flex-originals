<template>
  <menu type="toolbar" :class="`menu ${theme}`">
    <div @click="toggleMenu" style="cursor: pointer; margin-right:30px;">
      <i class="fas fa-align-justify"></i>
    </div>
    <button :class="`menu__button ${theme}`">
      <i class="fas fa-fire"></i>Trending
    </button>
    <button :class="`menu__button ${theme}`">
      <i class="far fa-clock"></i>Watch Later
    </button>
    <button :class="`menu__button ${theme}`">
      <i class="far fa-heart"></i>Liked Videos
    </button>
    <button :class="`menu__button ${theme}`">
      <i class="fab fa-rev"></i>New Releases
    </button>
    <input type="text" placeholder="Search...." />
    <!-- <div :class="`menu-right ${theme}`"> -->
    <!-- <span class="icon">
        <i class="fas fa-search search__icon"></i>
      </span>
      <input type="text" placeholder="Search...." />
      <span class="icon">
        <i class="fas fa-bell"></i>
    </span>-->
    <!-- <span class="icon">
        <i class="fas fa-ellipsis-v"></i>
    </span>-->
    <!-- </div> -->
  </menu>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "./../../../store/mutation-types";

export default {
  name: "toolbar",
  computed: {
    ...mapGetters([
      "isMobile",
      "isLoading",
      "appDrawer",
      "isAuthenticated",
      "theme"
    ]),
    theme() {
      return this.$store.state.theme;
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
    }
  }
};
</script>

