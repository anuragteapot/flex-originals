<template>
  <div class="lazy-rename">
    <section class="form">
      <div class="inner">
        <div class="header">Leave 'FlareTV Community'</div>
        <div class="body">
          Are you sure you want to leave
          <strong>FlareTV Community</strong>? You won't be able to rejoin this server unless you are re-invited.
        </div>
        <div class="footer">
          <div style="text-align:right">
            <button type="button">Cancel</button>
            <button type="submit" class="danger">Submit</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
  name: "model-rename",
  data: () => ({
    defaultData: ""
  }),

  computed: {
    selectedName: {
      get: function() {
        if (this.$store.state.showRenameModal) {
          return this.$store.state.selectedItems[0].name;
        } else {
          return "";
        }
      },
      set: function(data) {
        this.defaultData = data;
      }
    }
  },
  methods: {
    hideRenameModal: function() {
      this.$store.commit(types.HIDE_RENAME_MODAL);
    },
    rename: function() {
      if (this.defaultData != "") {
        const item = this.$store.state.selectedItems[0];
        item.newName = this.defaultData;
        this.$store.dispatch("rename", item);
      } else {
        this.hideRenameModal();
      }
    }
  }
};
</script>
<style>
.confirm-text {
  text-align: left;
  font-size: 20px;
}
</style>
