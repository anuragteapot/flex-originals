<template>
  <div class="lazy-delete">
    <section class="form">
      <div class="inner">
        <div class="header" v-if="selectedItems.length > 1">Delete these items?</div>
        <div class="header" v-else>Delete this item?</div>
        <div class="body">
          Are you sure you want to delete
          <strong>{{selectedItems.length}} item</strong> ? You won't be able to recover this item.
        </div>
        <div class="footer">
          <div style="text-align:right">
            <button type="button" @click="hide">Cancel</button>
            <button type="submit" class="danger" @click="deleteItem">Delete</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import * as types from './../../../store/mutation-types';

export default {
  name: 'model-delete',
  data: () => ({}),
  props: {
    text: {
      type: String,
      required: false,
      default: 'Are you sure want to delete ?',
    },
  },
  computed: {
    selectedItems() {
      return this.$store.state.selectedItems;
    },
  },
  methods: {
    hide: function() {
      this.$store.commit(types.HIDE_MODAL);
    },
    deleteItem: async function() {

      for (let i = 0; i < this.selectedItems.length; i++) {
        try {
          await this.$store.dispatch('DELETE_ITEM', this.selectedItems[i]);
          var data = {
            data: 'Done!',
            color: 'success',
          };
        } catch (err) {
          this.$api._handleError(err);
        }
      }

      this.$store.commit(types.SHOW_SNACKBAR, data);
      this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
      this.hide();
      if (this.$route.params.id) {
        const content = await this.$store.dispatch('GET_CONTENT', {
          userId: this.$route.params.id,
        });

        this.$store.commit(types.SET_CONTENT, content.data);
      }
    },
  },
};
</script>
