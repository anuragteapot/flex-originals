<template>
  <aside class="lazy">
    <div class="lazy-collection">
      <div class="channel focusable" role="button">
        <router-link to="/app/@home">
          <div class="channel-icon">
            <img src="/public/icons/logo.png" alt="logo" />
          </div>
        </router-link>
      </div>
    </div>

    <div class="lazy-collection">
      <div
        :class="`channel focusable`"
        role="button"
        aria-label="My channel"
        aria-selected="true"
      >
        <router-link to="/app/@home?filter=video">
          <div class="channel-icon">
            <i class="fas fa-video"></i>
          </div>
        </router-link>
      </div>
      <div
        class="channel focusable"
        role="button"
        aria-label="My channel"
        aria-selected="true"
      >
        <router-link to="/app/@home?filter=music">
          <div class="channel-icon">
            <i class="fas fa-music"></i>
          </div>
        </router-link>
      </div>
      <div
        class="channel focusable"
        role="button"
        aria-label="My channel"
        aria-selected="true"
      >
        <router-link to="/app/@upload">
          <div class="channel-icon">
            <i class="fas fa-arrow-up"></i>
          </div>
        </router-link>
      </div>
      <!-- <div class="channel focusable" role="button" aria-label="My channel" aria-selected="true">
        <div class="channel-icon">
          <i class="fas fa-cloud" style="color:white;"></i>
        </div>
      </div> -->
      <div
        class="channel focusable"
        role="button"
        aria-label="My channel"
        aria-selected="true"
      >
        <div class="channel-icon">
          <i class="fas fa-search"></i>
        </div>
      </div>

      <div
        v-show="selecteditems.length == 1"
        class="channel focusable"
        role="button"
        aria-label="My channel"
        aria-selected="true"
      >
        <router-link
          :to="
            `/app/@editvideo?v=${selecteditems[0] ? selecteditems[0].id : ''}`
          "
        >
          <div class="channel-icon">
            <i class="fas fa-edit"></i>
          </div>
        </router-link>
      </div>

      <div
        v-show="selecteditems.length > 0"
        class="channel focusable"
        role="button"
        aria-label="My channel"
        aria-selected="true"
        @click="deleteItem"
      >
        <div class="channel-icon">
          <i class="fas fa-trash"></i>
        </div>
      </div>
      <div
        class="channel focusable"
        role="button"
        aria-label="My channel"
        aria-selected="true"
      >
        <div class="channel-icon">
          <i class="fas fa-share-alt"></i>
        </div>
      </div>
      <div
        class="channel focusable"
        role="button"
        aria-label="My channel"
        aria-selected="true"
      >
        <div class="channel-icon">
          <i class="fas fa-eye"></i>
        </div>
      </div>
      <div
        class="channel focusable"
        role="button"
        aria-label="My channel"
        aria-selected="true"
      >
        <div class="channel-icon">
          <i class="fas fa-plus"></i>
        </div>
      </div>
      <div
        class="channel focusable"
        role="button"
        aria-label="My channel"
        aria-selected="true"
        v-show="!isAuth"
      >
        <router-link to="/login">
          <div class="channel-icon">
            <i class="fas fa-sign-in-alt"></i>
          </div>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script>
import * as types from './../../../store/mutation-types';

export default {
  name: 'lazy-aside',
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    selecteditems() {
      return this.$store.state.selectedItems;
    },
    isAuth() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    deleteItem() {
      this.$store.commit(types.SHOW_MODAL, { state: true, type: 'MDelete' });
    },
  },
};
</script>
