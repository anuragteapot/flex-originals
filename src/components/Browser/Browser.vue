<template>
  <div class="lazy__browser">
    <div v-if="isMobile" :class="`nav-offcanvas ${appDrawer.mobileState ? 'open' : ''}`">
      <div class="nav-offcanvas-menu">
        <aside-action @tiggerSelectFile="$refs.inputFile.click()"></aside-action>
        <aside-des></aside-des>
      </div>
    </div>
    <div
      v-if="isMobile"
      :class="`offcanvas-overlay ${appDrawer.mobileState ? 'on' : ''}`"
      @click="toggleMenu"
    ></div>

    <aside-action v-if="!isMobile" @tiggerSelectFile="$refs.inputFile.click()"></aside-action>
    <aside-des v-if="!isMobile && appDrawer.des"></aside-des>

    <div class="vert-container">
      <div class="media-action">
        <div class="file">
          <form enctype="multipart/form-data" ref="formFile">
            <input multiple type="file" hidden ref="inputFile" @change="processFile" />
          </form>
        </div>
      </div>
      <toolbar></toolbar>
      <component v-bind:is="layout"></component>
    </div>
  </div>
</template>

<script>
import * as types from "./.././../store/mutation-types.js";
import home from "./../Browser/Content/MainContent";
import settings from "./Settings/Settings";
import profile from "./Profile/Profile";
import upload from "./Upload/Upload";
import watch from "./videoViewer/videoViewer";
import asideAction from "./Aside/AsideAction";
import asideDes from "./Aside/AsideDes";
import toolbar from "./../Browser/Tollbar/Toolbar";
import { mapGetters } from "vuex";

export default {
  name: "media-browser",
  data() {
    return {};
  },
  components: {
    home,
    settings,
    upload,
    watch,
    profile,
    asideAction,
    asideDes,
    toolbar
  },
  computed: {
    ...mapGetters(["isMobile", "isLoading", "appDrawer"]),
    layout() {
      const name = this.$route.name;
      if (name.split("@")[1]) {
        if (name.split("@")[1] == "song") {
          return "home";
        } else {
          return name.split("@")[1];
        }
      } else {
        return "home";
      }
    }
  },
  methods: {
    processUpload: async function() {
      let uploadSuccess = 0;
      this.$store.commit(types.SET_IS_UPLOADING, true);
      while (this.$store.state.uploadItems.length > 0) {
        const item = this.$store.state.uploadItems.shift();
        const formData = item.file;
        const uploadPath = item.path;
        const id = item.id;
        const type = item.type;

        try {
          await this.$store.dispatch("upload", {
            formData,
            uploadPath,
            id,
            type
          });
          uploadSuccess = uploadSuccess + 1;
        } catch (error) {
          console.error(error);
        }
      }

      var data = {
        data: `${uploadSuccess} files uploaded.`,
        color: "success"
      };

      this.$store.commit(types.SHOW_SNACKBAR, data);
      this.$store.commit(types.SET_IS_UPLOADING, 2);
      this.$refs.formFile.reset();
    },
    processFile: function() {
      var files = this.$refs.inputFile.files;
      const uploadPath = this.$store.state.selectedDirectory;

      for (var i = 0; i < files.length; i++) {
        const item = {};
        let file = files[i];
        file.id = i;

        const formData = new FormData();
        formData.append("file", file);

        item.id = this.$api.getUidV4();
        item.icon = "assessment";
        item.file = formData;
        item.path = uploadPath;

        item.type = "file";
        item.iconClass = "grey lighten-1 white--text";
        item.title = file.name;
        item.subtitle = "";
        item.uploadPercent = 0;
        item.size = file.size;

        this.$store.state.uploadItems.push(item);
        this.$store.state.uploadItemsMenu.push(item);
      }

      if (this.$store.state.isUploading !== true) {
        this.processUpload("file");
      }
    }
  }
};
</script>
