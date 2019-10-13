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
    <input type="text" placeholder="Search...." v-model="search" />
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
import { mapGetters } from 'vuex';
import * as types from './../../../store/mutation-types';

export default {
  name: 'toolbar',
  data() {
    return {
      appDrawer: false,
    };
  },
  computed: {
    ...mapGetters(['isMobile', 'isAuthenticated', 'theme']),
    search: {
      set(val) {
        this.$store.commit(types.SET_SEARCH_QUERY, val);
      },
      get() {
        return this.$store.state.search;
      },
    },
    theme() {
      return this.$store.state.theme;
    },
  },
  methods: {
    toggleMenu: function() {
      if (this.appDrawer) {
        this.$emit('toggleAppDrawer', false);
        this.appDrawer = false;
        window.localStorage.setItem('APP_DRAWER', false);
      } else {
        this.$emit('toggleAppDrawer', true);
        this.appDrawer = true;
        window.localStorage.setItem('APP_DRAWER', true);
      }
    },
  },
  beforeMount() {
    if (typeof window !== 'undefined') {
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

