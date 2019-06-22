<template>
  <section class="content">
    <div class="inner">
      <div class="music christian">
        <!-- <i class="fa fa-book fa-4x" aria-hidden="true"></i> -->
        <p class="c">Christian</p>
      </div>
      <div class="music pop">
        <!-- <i class="fa fa-fire fa-4x" aria-hidden="true"></i> -->
        <p class="c">Pop</p>
      </div>
      <div class="music mood">
        <!-- <i class="fa fa-meh-o fa-4x" aria-hidden="true"></i> -->
        <p class="c">Mood</p>
      </div>
      <div class="music hiphop">
        <!-- <i class="fa fa-link fa-4x" aria-hidden="true"></i> -->
        <p class="c">Hip Hop</p>
      </div>
      <div class="music chill">
        <p class="c">Chill</p>
        <!-- <i class="fa fa-snowflake-o fa-4x" aria-hidden="true"></i> -->
      </div>
      <div class="music latino">
        <!-- <i class="fa fa-volume-up fa-4x" aria-hidden="true"></i> -->
        <p class="c">Latino</p>
      </div>
      <div class="music electronic">
        <!-- <i class="fa fa-diamond fa-4x" aria-hidden="true"></i> -->
        <p class="c">Electronic x Dance</p>
      </div>
      <div class="music country">
        <!-- <i class="fa fa-star fa-4x" aria-hidden="true"></i> -->
        <p class="c">Country</p>
      </div>
      <div class="music rock">
        <!-- <i class="fa fa-bolt fa-4x" aria-hidden="true"></i> -->
        <p class="c">Rock</p>
      </div>
      <div class="music focus">
        <!-- <i class="fa fa-desktop fa-4x" aria-hidden="true"></i> -->
        <p class="c">Focus</p>
      </div>
      <div class="music randb">
        <!-- <i class="fa fa-music fa-4x" aria-hidden="true"></i> -->
        <p class="c">RnB</p>
      </div>
      <div class="music party">
        <!-- <i class="fa fa-headphones fa-4x" aria-hidden="true"></i> -->
        <p class="c">Party</p>
      </div>
    </div>

    <!-- <lazy-grid></lazy-grid> -->
  </section>
</template>

<script>
import * as types from "./../../../store/mutation-types";
import { api } from "./../../../app/Api.js";
import ContentGrid from "./Grid/ContentGrid";

export default {
  name: "media-content",
  data: () => ({}),
  computed: {
    diskLoaded: function() {
      return this.$store.state.diskLoaded;
    }
  },
  components: {
    "lazy-grid": ContentGrid
  },
  methods: {
    doThis: function(path) {
      if (path) {
        this.$router.push({
          path: `/drive/u/0/folder/${path}`
        });
      } else {
        this.$router.push({
          path: `/drive/u/0/my-drive`
        });
      }
    },
    onScroll: api.debounce(function() {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        this.$store.state.loadLimit = this.$store.state.loadLimit + 10;

        const dir = this.$route.params.dir;
        const path = this.$route.params.path;

        this.$store.commit(types.SET_IS_LOADING, true);
        if (dir !== undefined && path == "folder") {
          this.$store.dispatch("update", { path: dir });
        } else {
          this.$store.dispatch("update", { path: "my-drive" });
        }
      }
    }, 300),
    // Listeners for drag and drop
    onDragEnter: function(event) {
      event.stopPropagation();
      return false;
    },

    // Notify user when file is over the drop area
    onDragOver: function(event) {
      event.preventDefault();
      document.querySelector(".media-dragoutline").classList.add("active");
      return false;
    },

    /* Upload files */
    dragUpload: async function() {
      let uploadSuccess = 0;
      while (this.$store.state.uploadItems.length > 0) {
        const item = this.$store.state.uploadItems.shift();
        const formData = item.file;
        const uploadPath = item.path;

        try {
          await this.$store.dispatch("upload", { formData, uploadPath });
          uploadSuccess = uploadSuccess + 1;
        } catch (error) {
          console.error(error);
        }

        this.$store.dispatch("update", {
          path: this.$store.state.selectedDirectory
        });
      }
      var data = {
        data: `${uploadSuccess} files uploaded.`,
        color: "success"
      };

      this.$store.commit(types.SHOW_SNACKBAR, data);
      this.$store.commit(types.SET_IS_UPLOADING, 2);
    },

    onDrop: function(event) {
      event.preventDefault();
      const uploadPath = this.$store.state.selectedDirectory;

      if (
        event.dataTransfer &&
        event.dataTransfer.files &&
        event.dataTransfer.files.length > 0
      ) {
        for (var i = 0; i < event.dataTransfer.files.length; i++) {
          let file = event.dataTransfer.files[i];
          document
            .querySelector(".media-dragoutline")
            .classList.remove("active");

          const formData = new FormData();
          const item = {};

          formData.append("files", file);
          item.id = file.name + i + file.lastModified + file.size + Date.now();
          item.icon = "assessment";
          item.file = formData;
          item.path = uploadPath;
          item.type = "file";
          item.iconClass = "grey lighten-1 white--text";
          item.title = file.name;
          item.subtitle = "";
          item.size = file.size;
          item.uploadPercent = 0;

          this.$store.state.uploadItems.push(item);
          this.$store.state.uploadItemsMenu.push(item);
        }
        if (this.$store.state.isUploading !== true) {
          this.$emit("tiggerdragUpload");
        }
      }

      document.querySelector(".media-dragoutline").classList.remove("active");
    },

    // Reset the drop area border
    onDragLeave: function(event) {
      event.stopPropagation();
      event.preventDefault();
      document.querySelector(".media-dragoutline").classList.remove("active");
      return false;
    }
  },
  created() {
    window.addEventListener("scroll", this.onScroll, false);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, false);
  }
};
</script>

<style scoped>
i {
  margin: 0 auto;
  position: absolute;
  top: 60px;
  color: white;
  right: 65px;
}

.music {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  padding: 2px;
  text-align: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: inline-block;
  margin: 5px 13px 50px 13px;
  position: relative;
}

@media only screen and (max-width: 700px) {
  .music {
    width: 160px;
    height: 160px;
    margin: 0px 5px 40px 5px;
  }

  i {
    margin: auto;
    position: absolute;
    font-size: 40px;
    color: white;
  }
}

.music::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.christian {
  background-image: url("https://static.pexels.com/photos/134/light-creative-abstract-colorful.jpg");
  background-size: cover;
  background-position: center;
}

p {
  position: absolute;
  bottom: -30px;
  color: white;
  width: 100%;
}

.pop {
  background-image: url("https://static.pexels.com/photos/134/light-creative-abstract-colorful.jpg");
  background-size: cover;
  background-position: center;
}

.mood {
  background-image: url("https://static.pexels.com/photos/134/light-creative-abstract-colorful.jpg");
  background-size: cover;
  background-position: center;
}

.hiphop {
  background-image: url("https://static.pexels.com/photos/134/light-creative-abstract-colorful.jpg");
  background-size: cover;
  background-position: center;
}

.chill {
  background-image: url("https://static.pexels.com/photos/134/light-creative-abstract-colorful.jpg");
  background-size: cover;
  background-position: center;
}

.latino {
  background-image: url("https://static.pexels.com/photos/134/light-creative-abstract-colorful.jpg");
  background-size: cover;
  background-position: center;
}

.electronic {
  background-image: url("https://static.pexels.com/photos/134/light-creative-abstract-colorful.jpg");
  background-size: cover;
  background-position: center;
}

.country {
  background-image: url("https://static.pexels.com/photos/134/light-creative-abstract-colorful.jpg");
  background-size: cover;
  background-position: center;
}

.rock {
  background-image: url("https://static.pexels.com/photos/134/light-creative-abstract-colorful.jpg");
  background-size: cover;
  background-position: center;
}

.focus {
  background-image: url("https://static.pexels.com/photos/134/light-creative-abstract-colorful.jpg");
  background-size: cover;
  background-position: center;
}

.randb {
  background-image: url("https://static.pexels.com/photos/134/light-creative-abstract-colorful.jpg");
  background-size: cover;
  background-position: center;
}

.party {
  background-image: url("https://static.pexels.com/photos/134/light-creative-abstract-colorful.jpg");
  background-size: cover;
  background-position: center;
}
</style>
