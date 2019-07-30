<template>
  <div class="content-v-thumb">
    <div class="video__thumbnail" @click="open">
      <lazy-image :src="src" :lazySrc="lazySrc" hover :active="selected"></lazy-image>
      <i class="far fa-2x fa-check-circle" v-if="selected"></i>
      <i class="fas fa-play fa-2x file-icon" aria-hidden="true" v-if="!editMode"></i>
      <div class="video__info">
        <p class="title">{{getName()}}</p>
        <p class="views">Alenter</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
  name: "videoThumbs",
  data() {
    return {};
  },
  props: {
    alt: String,
    contain: Boolean,
    src: {
      type: [String, Object],
      default: ""
    },
    gradient: String,
    lazySrc: String,
    srcset: String,
    item: Object
  },
  computed: {
    editMode() {
      return this.$store.state.editMode;
    },
    selected() {
      return this.$store.state.selectedItems.indexOf(this.item.id) !== -1
        ? true
        : false;
    }
  },
  methods: {
    open() {
      if (!this.editMode) {
        this.$router.push(`/app/@watch?v=${this.item.id}`);
      } else {
        this.$store.commit(types.SELECT_BROWSER_ITEM, this.item.id);
      }
    },
    getName: function() {
      const len = 20;
      if (this.item.name.length >= len) {
        return this.item.name.substring(0, len) + "..";
      } else {
        return this.item.name;
      }
    }
  }
};
</script>
