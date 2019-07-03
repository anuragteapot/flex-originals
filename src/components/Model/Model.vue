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
import MRename from "./Rename/Rename";
import MDelete from "./Delete/Delete";
import MNewFolder from "./NewFolder/NewFolder";

export default {
  name: "lazy-model",
  components: {
    MRename,
    MDelete,
    MNewFolder
  },
  computed: {
    layout() {
      return this.$store.state.modal.type;
    },
    modal() {
      return this.$store.state.modal.state;
    }
  }
};
</script>
