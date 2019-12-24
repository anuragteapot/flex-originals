<template>
  <section class="content">
    <div class="inner">
      <content-grid></content-grid>
    </div>
  </section>
</template>

<script>
import * as types from './../../../store/mutation-types';
import utils from './../../../api/utils';
import contentGrid from './Grid/ContentGrid';

export default {
  name: 'media-content',
  data: () => ({
    active: false,
  }),
  computed: {
    layout() {
      const name = this.$route.name;
      if (name.split('@')[1]) {
        return name.split('@')[1];
      } else {
        return null;
      }
    },
  },
  components: {
    contentGrid,
  },
  methods: {
    onScroll: new utils().debounce(function() {
      if (typeof window !== 'undefined') {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
          // this.$store.state.loadLimit = this.$store.state.loadLimit + 10;
          // const dir = this.$route.params.dir;
          // const path = this.$route.params.path;
          // if (dir !== undefined && path == "folder") {
          // this.$store.dispatch("update", { path: dir });
          // } else {
          // this.$store.dispatch("update", { path: "my-drive" });
          // }
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
      document.querySelector('.media-dragoutline').classList.add('active');
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
          await this.$store.dispatch('upload', { formData, uploadPath });
          uploadSuccess = uploadSuccess + 1;
        } catch (error) {
          console.error(error);
        }

        this.$store.dispatch('update', {
          path: this.$store.state.selectedDirectory,
        });
      }
      var data = {
        data: `${uploadSuccess} files uploaded.`,
        color: 'success',
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
            .querySelector('.media-dragoutline')
            .classList.remove('active');

          const formData = new FormData();
          const item = {};

          formData.append('files', file);
          item.id = file.name + i + file.lastModified + file.size + Date.now();
          item.icon = 'assessment';
          item.file = formData;
          item.path = uploadPath;
          item.type = 'file';
          item.iconClass = 'grey lighten-1 white--text';
          item.title = file.name;
          item.subtitle = '';
          item.size = file.size;
          item.uploadPercent = 0;

          this.$store.state.uploadItems.push(item);
          this.$store.state.uploadItemsMenu.push(item);
        }
        if (this.$store.state.isUploading !== true) {
          this.$emit('tiggerdragUpload');
        }
      }

      document.querySelector('.media-dragoutline').classList.remove('active');
    },

    // Reset the drop area border
    onDragLeave: function(event) {
      event.stopPropagation();
      event.preventDefault();
      document.querySelector('.media-dragoutline').classList.remove('active');
      return false;
    },
  },
  created() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.onScroll, false);
    }
  },
  destroyed() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll, false);
    }
  },
};
</script>
