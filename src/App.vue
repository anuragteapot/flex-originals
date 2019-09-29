<template>
  <div id="app" :class="`container ${theme}`">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
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
    ...mapGetters(['isLoading', 'theme']),
  },
  async beforeMount() {
    if (await this.$api.isLogged()) {
      this.$store.commit(types.IS_AUTHENTICATED, true);
    } else {
      this.$store.commit(types.IS_AUTHENTICATED, false);
    }
  },
};
</script>
