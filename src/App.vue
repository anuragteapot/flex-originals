<template>
  <div class="container">
    <div class="progress" v-show="isLoading">
      <div class="indeterminate">
        <i class="fas fa-hourglass-half"></i>Loading...
      </div>
    </div>
    <router-view />
    <lazy-snack-bar></lazy-snack-bar>
    <lazy-model></lazy-model>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "./store/mutation-types";

export default {
  name: "app",
  computed: {
    ...mapGetters(["isLoading"])
  },
  async beforeMount() {
    if (await this.$api.isLogged()) {
      this.$store.commit(types.IS_AUTHENTICATED, true);
    } else {
      this.$store.commit(types.IS_AUTHENTICATED, false);
    }
  }
};
</script>
