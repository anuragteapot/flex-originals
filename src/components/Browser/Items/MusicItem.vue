<template>
  <div class="content-m-thumb">
    <div class="music__thumbnail">
      <router-link :to="`/app/@song?a=${item.id}`" v-show="!this.editMode">
        <lazy-image
          :src="src"
          :lazySrc="lazySrc"
          hover
          :alt="item.title"
          :active="item.id == $route.query.a || selected"
        ></lazy-image>
        <div class="now playing bar" v-show="item.id == $route.query.a">
          <span class="bar n1"></span>
          <span class="bar n2"></span>
          <span class="bar n3"></span>
          <span class="bar n4"></span>
          <span class="bar n5"></span>
          <span class="bar n6"></span>
          <span class="bar n7"></span>
          <span class="bar n8"></span>
        </div>
      </router-link>
      <lazy-image
        v-show="this.editMode"
        :src="src"
        :lazySrc="lazySrc"
        hover
        :alt="item.title"
        @click="open"
        :active="item.id == $route.query.a || selected"
      ></lazy-image>
      <i class="far fa-2x fa-check-circle" v-show="selected"></i>
      <i
        class="fas fa-play fa-2x file-icon"
        v-show="item.id !== $route.query.a && !editMode"
        aria-hidden="true"
      ></i>

      <div class="audio__info ">
        <p class="title">{{ getName() }}</p>
        <p class="views">
          {{ item.user.username }}
          <fo-svg-verified width="10" height="10"></fo-svg-verified>
          <br />
          {{ item.audioAnalytics ? item.audioAnalytics.views : '0' }} views .
          {{ $utils.time_ago(new Date(item.published)) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from './../../../store/mutation-types';

export default {
  name: 'music-thumnail',
  data() {
    return {};
  },
  props: {
    alt: String,
    circle: Boolean,
    contain: Boolean,
    src: {
      type: [String, Object],
      default: '',
    },
    gradient: String,
    lazySrc: String,
    srcset: String,
    sizes: String,
    item: Object,
    user: Object,
  },
  computed: {
    editMode() {
      return this.$store.state.editMode;
    },
    selected() {
      const res = this.$store.state.selectedItems.filter(item => {
        return item.id === this.item.id;
      });
      return res.length === 1 ? true : false;
    },
  },
  methods: {
    getSrc() {
      return this.src;
    },
    open() {
      if (this.selected) {
        this.$store.commit(types.UNSELECT_BROWSER_ITEM, {
          id: this.item.id,
          type: 'audio',
        });
      } else {
        this.$store.commit(types.SELECT_BROWSER_ITEM, {
          id: this.item.id,
          type: 'audio',
        });
      }
    },
    getName: function() {
      const len = 20;
      if (this.item.title.length >= len) {
        return this.item.title.substring(0, len) + '..';
      } else {
        return this.item.title;
      }
    },
  },
};
</script>
