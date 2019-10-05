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
import MLogin from './Login/Login';
import MDelete from './Delete/Delete';
import MNewFolder from './NewFolder/NewFolder';
import MShareModal from './ShareModal/ShareModal';

export default {
  name: 'lazy-model',
  components: {
    MLogin,
    MDelete,
    MNewFolder,
    MShareModal,
  },
  computed: {
    layout() {
      return this.$store.state.modal.type;
    },
    modal() {
      return this.$store.state.modal.state;
    },
  },
};
</script>
