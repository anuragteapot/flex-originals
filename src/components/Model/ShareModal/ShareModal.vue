<template>
  <div class="lazy-share">
    <section class="form">
      <div class="inner">
        <div class="header">Share this video</div>
        <div class="body">
          <div class="social-share">
            <ul>
              <li>
                <a href="https://www.facebook.com/Anu1601cs" target="_blank">
                  <i class="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <i class="fab fa-instagram"></i>
              </li>
              <li>
                <a href="https://twitter.com/Anu1601cs" target="_blank">
                  <i class="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <i class="fab fa-google"></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer">
          <div style="text-align:right">
            <button type="button" @click="hide">Close</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import * as types from './../../../store/mutation-types';

export default {
  name: 'model-share',
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
