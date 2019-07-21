<template>
  <div class="settings content">
    <div class="inner">
      <div class="media-action">
        <div class="file">
          <form enctype="multipart/form-data" ref="formFile">
            <input type="file" hidden ref="inputFile" @change="processFile" />
          </form>
        </div>
      </div>
      <div class="settings__wrapper">
        <div class="card">
          <div class="card__body">
            <div
              class="upload__icon__body dragoutline"
              v-show="!isUploading"
              @dragenter="onDragEnter"
              @drop="onDrop"
              @dragover="onDragOver"
              @dragleave="onDragLeave"
            >
              <i class="fas fa-cloud-upload-alt fa-4x" @click="$refs.inputFile.click()"></i>
              <br />
              <h1>DRAG & DROP</h1>
              <p>to upload your video/music or click</p>
            </div>
            <div class="container" v-show="isUploading">
              <div class="grid">
                <h1>Upload Status</h1>
                <i @click="$router.push('/app/@home')" class="far fa-times-circle close__settings"></i>
              </div>
            </div>
            <div class="container" v-show="isUploading">
              <div class="grid grid--half">
                <h3>Uploading Progress</h3>
                <div class="video__upload__progress">
                  <div class="upload__progress" :style="`width:${uploadPercent}%`">
                    <p>{{uploadPercent}}%</p>
                  </div>
                </div>
                <h3>Select Thumbnail</h3>
                <div class="video__thumbnails">
                  <img class="lazy__image" src="/public/qq.webp" alt="thumbnail" />
                </div>
                <div class="video__thumbnails">
                  <img class="lazy__image" src="/public/qq.webp" alt="thumbnail" />
                </div>
                <div class="video__thumbnails">
                  <img class="lazy__image" src="/public/qq.webp" alt="thumbnail" />
                </div>
                <div class="upload__video__settings">
                  <div class="video__title">
                    <label for="videoTitle">Video Title</label>
                    <input name="videoTitle" type="text" placeholder="Video Title" />
                  </div>
                  <div class="video__description">
                    <label for="videoDescription">Video Description</label>
                    <textarea
                      rows="10"
                      name="videoDescription"
                      type="text"
                      placeholder="Video Description"
                    />
                  </div>
                  <div class="video__tags">
                    <label for="videoTags">Video Tags</label>
                    <input name="videoTags" type="text" placeholder="Video Tags" />
                  </div>
                  <div class="form-item">
                    <label class="form-item__label">Text information</label>
                    <div class="form-item__control">
                      <select class="control control--select">
                        <option selected="selected">Public</option>
                        <option>Private</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-item">
                    <label class="form-item__label">Premier</label>
                    <div class="form-item__control toggle">
                      <div class="toggle__handle"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid grid--half">
                <h3>Advanced Settings</h3>
                <div class="form-item">
                  <label class="form-item__label">Keep all my liked private</label>
                  <div class="form-item__control toggle">
                    <div class="toggle__handle"></div>
                  </div>
                </div>
                <div class="checkbox">
                  <input id="one" type="checkbox" />
                  <span class="check"></span>
                  <label for="one">Allow Comments</label>
                </div>
                <div class="checkbox">
                  <input id="two" type="checkbox" />
                  <span class="check"></span>
                  <label for="two">Users can view ratings for this video</label>
                </div>
                <div class="checkbox">
                  <input id="three" type="checkbox" />
                  <span class="check"></span>
                  <label for="three">Age restrictions</label>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Category</label>
                  <div class="form-item__control">
                    <select class="control control--select">
                      <option selected="selected">People & Blog</option>
                      <option>Gamming</option>
                      <option>Education</option>
                      <option>Comedy</option>
                    </select>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-item__label">Licence and rights ownership</label>
                  <div class="form-item__control">
                    <select class="control control--select">
                      <option selected="selected">People & Blog</option>
                      <option>Gamming</option>
                      <option>Education</option>
                      <option>Comedy</option>
                    </select>
                  </div>
                </div>
                <button class="success" @click="finilize">Publish</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";
import { setTimeout } from "timers";

export default {
  name: "upload",
  data() {
    return {
      isUploading: false,
      uploadPercent: 0,
      done: false
    };
  },
  methods: {
    // Listeners for drag and drop
    onDragEnter: function(event) {
      event.stopPropagation();
      return false;
    },
    // Notify user when file is over the drop area
    onDragOver: function(event) {
      event.preventDefault();
      document.querySelector(".dragoutline").classList.add("active");
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
          document.querySelector(".dragoutline").classList.remove("active");
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
      document.querySelector(".dragoutline").classList.remove("active");
    },
    // Reset the drop area border
    onDragLeave: function(event) {
      event.stopPropagation();
      event.preventDefault();
      document.querySelector(".dragoutline").classList.remove("active");
      return false;
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$router.push("/app/@home?u=logout");
        this.$api.auth.logout();
      } catch (err) {
        this.$router.push("/app/@home?u=logout");
        this.$api.auth.logout();
      }
    },
    processUpload: async function(formData) {
      try {
        await this.$api.axios().post(`/api/actions/upload`, formData, {
          retry: 3,
          retryDelay: 1000,
          onUploadProgress: e => {
            this.uploadPercent = Math.round((e.loaded * 100) / e.total);
          }
        });
      } catch (err) {
        this.$api._handleError(err);
      }

      const data = {
        data: `Video Uploaded.`,
        color: "success"
      };

      this.$store.commit(types.SHOW_SNACKBAR, data);
      this.$refs.formFile.reset();
    },
    processFile: function() {
      this.isUploading = true;
      var file = this.$refs.inputFile.files;

      const formData = new FormData();
      formData.append("file", file);

      setTimeout(() => {
        this.processUpload(formData);
      }, 1000);
    },
    beforeunload(event) {
      event = event || window.event;
      // event.preventDefault();

      // For IE and Firefox prior to version 4
      if (event && !this.done) {
        event.returnValue = "Sure?";
      }

      // For Safari
      if (!this.done) {
        return "Sure?";
      }
    },
    finilize() {
      this.done = true;
      window.removeEventListener("beforeunload", this.beforeunload);
    }
  },
  created() {
    // window.addEventListener("beforeunload", this.beforeunload);
  }
};
</script>
