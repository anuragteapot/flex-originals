<template>
  <div class="lazy-rename">
    <section class="form">
      <div class="inner">
        <div class="header">Login FlexOriginals</div>
        <div class="body">
          You're signed out of
          <strong>FlexOriginals</strong>. Sign in to like videos, comment and follow.
        </div>
        <div class="footer">
          <div style="text-align:right">
            <button type="button" @click="hide">Cancel</button>
            <router-link to="/login">
              <button type="submit" class="success">Login</button>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import * as types from './../../../store/mutation-types';

export default {
  name: 'model-login',
  methods: {
    hide: function() {
      this.$store.commit(types.HIDE_MODAL);
    },
  },
};
</script>
