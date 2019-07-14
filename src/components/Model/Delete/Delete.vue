<template>
  <div class="lazy-delete">
    <section class="form">
      <div class="inner">
        <div class="header">Delete this item?</div>
        <div class="body">
          Are you sure you want to delete
          <strong>FlareTV Community</strong>? You won't be able to rejoin this server unless you are re-invited.
        </div>
        <div class="footer">
          <div style="text-align:right">
            <button type="button" @click="hide">Cancel</button>
            <button type="submit" class="danger">Delete</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
  name: "model-delete",
  data: () => ({}),

  props: {
    text: {
      type: String,
      required: false,
      default: "Are you sure want to delete ?"
    }
  },

  computed: {},

  methods: {
    hide: function() {
      this.$store.commit(types.HIDE_MODAL);
    },
    deleteFile: async function() {
      this.$store.commit(types.SET_IS_LOADING, true);
      let response = "";
      const items = this.$store.state.selectedItems;

      for (var i = 0; i < items.length; i++) {
        const item = items[i];
        response = await this.$store.dispatch("deleteFile", item);
      }

      this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);

      var data = {
        data: response.data.message,
        color: "success"
      };
      this.$store.commit(types.SET_IS_LOADING, false);
      this.$store.commit(types.SHOW_SNACKBAR, data);
      this.$store.dispatch("update", {
        path: this.$store.state.selectedDirectory
      });
    }
  }
};
</script>
