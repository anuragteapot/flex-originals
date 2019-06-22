<template>
  <div class="image lazy-background" ref="lazyBackground">
    <div class="loader-1 center">
      <span></span>
    </div>
    <!-- <i class="fa fa-book fa-4x" aria-hidden="true"></i> -->
    <p>Christian</p>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";
import { api } from "./../../../app/Api.js";

export default {
  name: "media-file",
  data() {
    return {
      active: true,
      iconsMap: {
        mp3: "library_music",
        zip: "archive",
        mp4: "music_video",
        default: "insert_drive_file"
      }
    };
  },
  props: ["item", "src", "srcset"],
  mounted() {
    this.lazyLoad();
  },
  computed: {
    selectedState: function() {
      var res = this.$store.state.selectedItems.filter(file => {
        return file.id === this.item.id;
      });

      if (res.length != 0) {
        return true;
      } else {
        return false;
      }
    },
    getName: function() {
      const len = this.$store.state.isMobile ? 13 : 15;
      if (this.item.name.length >= len) {
        return this.item.name.substring(0, len) + "..";
      } else {
        return this.item.name;
      }
    },
    menuState: function() {
      return this.$store.state.showInfoBar;
    },
    isMobile: function() {
      return this.$store.state.isMobile;
    },
    icon: function() {
      if (
        this.iconsMap[this.item.extension] &&
        this.iconsMap[this.item.extension] != ""
      ) {
        return this.iconsMap[this.item.extension];
      } else {
        return this.iconsMap["default"];
      }
    }
  },
  methods: {
    lazyLoad() {
      var lazyBackground = this.$refs.lazyBackground;

      if ("IntersectionObserver" in window) {
        let lazyBackgroundObserver = new IntersectionObserver(function(
          entries,
          observer
        ) {
          entries.forEach(entry => {
            console.log(entry);
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              lazyBackgroundObserver.unobserve(entry.target);
            }
          });
        });

        lazyBackgroundObserver.observe(lazyBackground);
      }
    },
    show: function(event, item) {
      var e = event || window.event;
      e.preventDefault();

      if (!(e.shiftKey || e.ctrlKey) || item.type == "quick") {
        this.select(e, this.item);
      }

      this.$store.commit(types.HIDE_MENU);
      this.$store.commit(types.SHOW_MENU, { event: e });

      this.$nextTick(() => {
        this.$store.state.showMenu.state = true;
      });
    },
    getTime: function(_time) {
      return api.time_ago(new Date(_time));
    },
    select: function(event, item) {
      var e = event || window.event;
      e.preventDefault();

      if (!(e.shiftKey || e.ctrlKey) || item.type == "quick") {
        // this.$store.state.selectAllFile = false;
        // this.$store.state.selectAllFolder = false;
        this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
      }

      if (this.selectedState) {
        this.$store.commit(types.UNSELECT_BROWSER_ITEM, item);
      } else {
        this.$store.commit(types.SELECT_BROWSER_ITEM, item);
      }
    },
    preview: function() {
      this.$store.commit(types.LOAD_FULL_CONTENTS_SUCCESS, this.item);
      this.$store.commit(types.SHOW_PREVIEW_MODAL);
    }
  }
};
</script>
