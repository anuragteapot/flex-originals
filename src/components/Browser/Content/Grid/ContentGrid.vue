<template>
  <div class="media-content-grid">
    <div class="grid_section files">
      <h1>Recents</h1>
      <div class="fo-content__container">
        <music-thumb :src="src" :lazySrc="lazySrc" ></music-thumb>
        <music-thumb :src="src" :lazySrc="lazySrc" ></music-thumb>
      </div>
      <h1>Videos</h1>
      <div class="fo-content__container">
        <video-thumb :src="srcv" :lazySrc="lazySrc" hover></video-thumb>
        <video-thumb :src="srcv" :lazySrc="lazySrc" hover></video-thumb>
        <video-thumb :src="srcv" :lazySrc="lazySrc" hover></video-thumb>
        <video-thumb :src="srcv" :lazySrc="lazySrc" hover></video-thumb>
        <video-thumb :src="srcv" :lazySrc="lazySrc" hover></video-thumb>
        <video-thumb :src="srcv" :lazySrc="lazySrc" hover></video-thumb>
      </div>
      <h1>Music</h1>
      <div class="fo-content__container">
        <music-thumb :src="src" :lazySrc="lazySrc" hover></music-thumb>
        <music-thumb :src="src" :lazySrc="lazySrc" hover></music-thumb>
        <music-thumb :src="src" :lazySrc="lazySrc" hover></music-thumb>
        <music-thumb :src="src" :lazySrc="lazySrc" hover></music-thumb>
        <music-thumb :src="src" :lazySrc="lazySrc" hover></music-thumb>
        <music-thumb :src="src" :lazySrc="lazySrc"></music-thumb>

        <music-thumb :src="src" :lazySrc="lazySrc" hover></music-thumb>
        <music-thumb :src="src" :lazySrc="lazySrc" hover></music-thumb>
        <music-thumb :src="src" :lazySrc="lazySrc" hover></music-thumb>
        <music-thumb :src="src" :lazySrc="lazySrc" hover></music-thumb>
      </div>
      <span class="clear"></span>
    </div>
  </div>
</template>

<script>
// import * as types from "./../../../../store/mutation-types";
import musicThumb from "./../../Items/musicItem";
import videoThumb from "./../../Items/videoItem";

export default {
  name: "media-content-grid",
  data: () => ({
    src: "/public/sample.jpeg",
    srcv: "/public/qq.webp",
    lazySrc: "/public/icons/audio.svg"
  }),
  components: {
    videoThumb,
    musicThumb
  }
};
</script>
