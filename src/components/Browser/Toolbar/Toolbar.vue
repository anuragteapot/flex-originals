<template>
  <menu type="toolbar" class="menu">
    <div @click="toggleMenu" style="cursor: pointer; margin-right:30px;">
      <i class="fas fa-align-justify"></i>
    </div>
    <button class="menu__button "><i class="fas fa-fire"></i>Trending</button>
    <button class="menu__button">
      <i class="far fa-clock"></i>Watch Later
    </button>
    <button class="menu__button">
      <i class="far fa-heart"></i>Liked Videos
    </button>
    <button class="menu__button"><i class="fab fa-rev"></i>New Releases</button>
    <input type="text" placeholder="Search...." v-model="search" />
    <!-- <div class="menu-right"> -->
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
import utils from './../../../api/utils';

export default {
  name: 'toolbar',
  data() {
    return {
      appDrawer: false,
    };
  },
  computed: {
    ...mapGetters(['isMobile', 'isAuthenticated']),
    search: {
      set(val) {
        this.$store.commit(types.SET_SEARCH_QUERY, val);
      },
      get() {
        return this.$store.state.search;
      },
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
    onresize: new utils().debounce(async function(event) {
      if (this.appDrawer && event.target.innerWidth < 1000) {
        this.toggleMenu();
      }
    }, 100),
  },
  beforeMount() {
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
  created() {
    if (typeof window != 'undefined') {
      window.addEventListener('resize', this.onresize);
    }
  },
  beforeDestroy() {
    if (typeof window != 'undefined') {
      window.removeEventListener('resize', this.onresize);
    }
  },
};
</script>
