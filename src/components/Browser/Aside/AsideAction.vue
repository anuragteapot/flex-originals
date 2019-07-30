<template>
  <aside class="lazy">
    <div class="lazy-collection">
      <div class="server focusable server-friends unread" role="button" aria-label="Friends unread">
        <div class="server-icon" @click="$router.push('/app/@home')">
          <img src="/public/icons/logo.png" alt="logo" />
        </div>
      </div>
    </div>

    <div class="lazy-collection">
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon" @click="$router.push('/app/@home?filter=video')">
          <i class="fas fa-video" style="color:red;"></i>
        </div>
      </div>
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon" @click="$router.push('/app/@home?filter=music')">
          <i class="fas fa-music"></i>
        </div>
      </div>
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon" @click="fileUpload">
          <i class="fas fa-arrow-up" style="color:#00ffe7;"></i>
        </div>
      </div>
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon">
          <i class="fas fa-cloud"></i>
        </div>
      </div>
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon">
          <i class="fas fa-search" style="color:#f19600"></i>
        </div>
      </div>
      <div
        v-if="selecteditems.length == 1"
        @click="$router.push(`/app/@editvideo?v=${selecteditems[0].id}`)"
        class="server focusable"
        role="button"
        aria-label="My Server"
        aria-selected="true"
      >
        <div class="server-icon">
          <i class="fas fa-edit" style="color:#04fb8a;"></i>
        </div>
      </div>

      <div
       v-if="selecteditems.length > 0"
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
          <i class="fas fa-share-alt"></i>
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
    </div>
  </aside>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
  name: "lazy-aside",
  computed: {
    selecteditems() {
      return this.$store.state.selectedItems;
    }
  },
  methods: {
    deleteItem() {
      this.$store.commit(types.SHOW_MODAL, { state: true, type: "MDelete" });
    },
    fileUpload: async function() {
      if (await this.$api.isLogged()) {
        this.$router.push(`/app/@upload`);
      } else {
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      }
    }
  }
};
</script>
