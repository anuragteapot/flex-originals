<template>
  <div class="media-model">
    <div :class="`modal ${modal ? 'open' : ''}`">
      <div class="modal-inner">
        <component v-bind:is="layout"></component>
      </div>
    </div>
  </div>
</template>

<script>
import rename from "./Rename/RenameModel";

export default {
  name: "lazy-model",
  components: {
    rename
  },
  computed: {
    layout() {
      return "rename";
    },
    modal() {
      return this.$store.state.modal.state;
    }
  }
};
</script>
