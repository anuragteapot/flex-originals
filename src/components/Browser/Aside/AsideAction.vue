<template>
  <aside class="lazy">
    <div class="lazy-collection">
      <div class="server focusable server-friends unread" role="button" aria-label="Friends unread">
        <div class="server-icon" @click="$router.push('/app/@home')">
          <img src="/public/atom.svg" alt="logo" />
        </div>
      </div>
    </div>

    <div class="lazy-collection">
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon" @click="$router.push('/app/@watch')">
          <i class="fas fa-video" style="color:red;"></i>
        </div>
      </div>
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon" @click="$router.push('/app/@song')">
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
          <i class="fas fa-arrow-down" style="color:#04fb8a;"></i>
        </div>
      </div>
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon">
          <i class="fas fa-search" style="color:#f19600"></i>
        </div>
      </div>

      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
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
export default {
  name: "lazy-aside",
  methods: {
    fileUpload: function() {
      if (this.$api.auth.loggedIn()) {
        this.$router.push(`/app/@upload`);
      } else {
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      }
    }
  }
};
</script>
