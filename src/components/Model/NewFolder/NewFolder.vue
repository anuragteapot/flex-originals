<template>
  <div class="lazy-new-folder">
    <section class="form">
      <div class="inner">
        <div class="header">Create new Folder</div>
        <div class="body">
          <label>Folder Name</label>
          <input type="text" />
        </div>
        <div class="footer">
          <div style="text-align:right">
            <button type="button">Cancel</button>
            <button type="submit" class="success">Create</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import * as types from './../../../store/mutation-types';

export default {
  name: 'modal-new-folder',
  data: () => ({
    defaultData: 'Untitled Folder',
  }),

  methods: {
    hideCreateFolderModal: function() {
      this.$store.commit(types.HIDE_CREATE_FOLDER_MODAL);
    },
    create: function() {
      const foldername = this.defaultData;
      this.$store.dispatch('createDirectory', { foldername });
    },
  },
};
</script>

