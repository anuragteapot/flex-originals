<template>
  <div class="content-v-thumb">
    <div class="video__thumbnail">
      <router-link :to="`/app/@watch?v=${item.id}`" v-show="!this.editMode">
        <lazy-image
          :src="src"
          :lazySrc="lazySrc"
          hover
          :active="selected"
          :alt="item.title"
        ></lazy-image>
        <i
          class="fas fa-play fa-2x file-icon"
          aria-hidden="true"
          v-show="!editMode"
        ></i>
      </router-link>
      <lazy-image
        v-show="this.editMode"
        :src="src"
        :lazySrc="lazySrc"
        hover
        :alt="item.title"
        :active="selected"
        @click="open"
      ></lazy-image>
      <i class="far fa-2x fa-check-circle" v-show="selected"></i>
      <div class="video__info ">
        <p class="title">{{ getName() }}</p>
        <p class="views">
          {{ item.user.username }}
          <fo-svg-verified width="10" height="10"></fo-svg-verified>
          <br />
          {{ item.videoAnalytics ? item.videoAnalytics.views : '0' }} views .
          {{ $utils.time_ago(new Date(item.published)) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from './../../../store/mutation-types';

export default {
  name: 'videoThumbs',
  data() {
    return {};
  },
  props: {
    alt: String,
    contain: Boolean,
    src: {
      type: [String, Object],
      default: '',
    },
    gradient: String,
    lazySrc: String,
    srcset: String,
    item: Object,
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
          type: 'video',
        });
      } else {
        this.$store.commit(types.SELECT_BROWSER_ITEM, {
          id: this.item.id,
          type: 'video',
        });
      }
    },
    getName: function() {
      const len = 30;
      if (this.item.title.length >= len) {
        return this.item.title.substring(0, len) + '..';
      } else {
        return this.item.title;
      }
    },
  },
};
</script>
