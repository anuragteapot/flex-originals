<template>
  <div id="app" :class="`container ${theme}`">
    <!-- <transition name="fade" mode="out-in"> -->
    <router-view />
    <!-- </transition> -->
    <lazy-snack-bar></lazy-snack-bar>
    <lazy-model></lazy-model>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from './store/mutation-types';

export default {
  name: 'app',
  computed: {
    ...mapGetters(['theme']),
  },
  watch: {
    $route() {
      this.$store.commit(types.SET_EDIT_MODE, false);
      this.$store.commit(types.SELECT_BROWSER_ITEM, false);
      this.$store.commit(types.HIDE_MODAL);
    },
  },
  methods: {
    updateOnlineStatus() {
      const state = navigator.onLine || false;
      if (state == true) {
        const data = {
          data: 'You are online',
          color: 'success',
        };
        this.$store.commit(types.SHOW_SNACKBAR, data);
      } else {
        const data = {
          data: 'You are offline',
          color: 'info',
        };
        this.$store.commit(types.SHOW_SNACKBAR, data);
      }
    },
  },
  async beforeMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.updateOnlineStatus);
      window.addEventListener('offline', this.updateOnlineStatus);
    }
    if (await this.$user.isLogged()) {
      this.$store.commit(types.IS_AUTHENTICATED, true);
    } else {
      this.$store.commit(types.IS_AUTHENTICATED, false);
    }
  },
};
</script>
