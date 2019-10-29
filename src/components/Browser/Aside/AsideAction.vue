<template>
  <aside :class="`lazy ${theme}`">
    <div class="lazy-collection">
      <div class="server focusable server-friends unread" role="button" aria-label="Friends unread">
        <router-link to="/app/@home">
          <div class="server-icon">
            <img src="/public/icons/logo.png" alt="logo" />
          </div>
        </router-link>
      </div>
    </div>

    <div class="lazy-collection">
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <router-link to="/app/@home?filter=video">
          <div class="server-icon">
            <i class="fas fa-video" style="color:red;"></i>
          </div>
        </router-link>
      </div>
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <router-link to="/app/@home?filter=music">
          <div class="server-icon">
            <i class="fas fa-music" style="color:white;"></i>
          </div>
        </router-link>
      </div>
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <router-link to="/app/@upload">
          <div class="server-icon">
            <i class="fas fa-arrow-up" style="color:#00ffe7;"></i>
          </div>
        </router-link>
      </div>
      <!-- <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon">
          <i class="fas fa-cloud" style="color:white;"></i>
        </div>
      </div> -->
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon">
          <i class="fas fa-search" style="color:#f19600"></i>
        </div>
      </div>

      <div
        v-show="selecteditems.length == 1"
        class="server focusable"
        role="button"
        aria-label="My Server"
        aria-selected="true"
      >
        <router-link :to="`/app/@editvideo?v=${ selecteditems[0] ? selecteditems[0].id : '' }`">
          <div class="server-icon">
            <i class="fas fa-edit" style="color:#04fb8a;"></i>
          </div>
        </router-link>
      </div>

      <div
        v-show="selecteditems.length > 0"
        class="server focusable"
        role="button"
        aria-label="My Server"
        aria-selected="true"
        @click="deleteItem"
      >
        <div class="server-icon">
          <i class="fas fa-trash" style="color:red;"></i>
        </div>
      </div>
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon">
          <i class="fas fa-share-alt" style="color:white;"></i>
        </div>
      </div>
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon">
          <i class="fas fa-eye" style="color:lightgreen;"></i>
        </div>
      </div>
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon">
          <i class="fas fa-plus" style="color:#00b0f4;"></i>
        </div>
      </div>
      <div
        class="server focusable"
        role="button"
        aria-label="My Server"
        aria-selected="true"
        v-show="!isAuth"
      >
        <router-link to="/login">
          <div class="server-icon">
            <i class="fas fa-sign-in-alt" style="color:white;"></i>
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
  computed: {
    selecteditems() {
      return this.$store.state.selectedItems;
    },
    isAuth() {
      return this.$store.state.isAuthenticated;
    },
    theme() {
      return this.$store.state.theme;
    },
  },
  methods: {
    deleteItem() {
      this.$store.commit(types.SHOW_MODAL, { state: true, type: 'MDelete' });
    },
  },
};
</script>
