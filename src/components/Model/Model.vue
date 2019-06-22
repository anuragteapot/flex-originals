<template>
  <div class="media-model">
    <div :class="`modal ${modal ? 'open' : ''}`">
      <div class="modal-inner">Anurag</div>
    </div>
  </div>
</template>

<script>
import previewModel from "./Preview/PreviewModel";

export default {
  name: "lazy-model",
  components: {
    "lazy-preview-model": previewModel
  },
  computed: {
    modal() {
      return this.$store.state.modal.state;
    }
  }
};
</script>
