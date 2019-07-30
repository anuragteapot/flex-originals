<template>
  <div class="content-m-thumb">
    <div class="music__thumbnail" @click="open">
      <lazy-image
        :src="src"
        :lazySrc="lazySrc"
        hover
        :active="item.id == $route.query.a || selected"
      ></lazy-image>
      <i class="far fa-2x fa-check-circle" v-if="selected"></i>
      <i
        class="fas fa-play fa-2x file-icon"
        v-if="item.id !== $route.query.a && !editMode"
        aria-hidden="true"
      ></i>
      <div class="audio__info">
        <p class="title">{{getName()}}</p>
        <p class="views">alenter</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
  name: "music-thumnail",
  data() {
    return {};
  },
  props: {
    alt: String,
    circle: Boolean,
    contain: Boolean,
    src: {
      type: [String, Object],
      default: ""
    },
    gradient: String,
    lazySrc: String,
    srcset: String,
    sizes: String,
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
      if (this.item.title.length >= len) {
        return this.item.title.substring(0, len) + "..";
      } else {
        return this.item.title;
      }
    }
  }
};
</script>
