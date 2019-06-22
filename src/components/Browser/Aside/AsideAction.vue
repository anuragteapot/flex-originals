<template>
  <aside class="lazy">
    <div class="lazy-collection">
      <div class="server focusable server-friends unread" role="button" aria-label="Friends unread">
        <div class="server-icon">
          <img src="/public/logo.svg" alt="logo">
        </div>
      </div>
    </div>

    <div class="lazy-collection">
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon" @click="fileUpload">
          <i class="fa fa-arrow-up" style="font-size:25px"></i>
        </div>
      </div>
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon">
          <i class="fa fa-cloud" style="font-size:25px"></i>
        </div>
      </div>
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon">
          <i class="fa fa-arrow-down" style="font-size:25px"></i>
        </div>
      </div>
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon">
          <i class="fa fa-search" style="font-size:25px"></i>
        </div>
      </div>
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon">
          <i class="fa fa-plus" style="font-size:25px"></i>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "lazy-aside",
  methods: {
    folderUpload: function() {
      this.$emit("tiggerSelectFolder");
    },
    fileUpload: function() {
      this.$emit("tiggerSelectFile");
    }
  }
};
</script>
