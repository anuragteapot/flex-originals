<template>
  <button class="fo-button" :style="`height:${height}; width:${height}`" @click="$emit('click')">
    <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
      <use class="fo-svg-shadow" xlink:href="#fo-id-11" />
      <path class="fo-svg-fill" d="m 12,12 h 2 v 12 h -2 z m 3.5,6 8.5,6 V 12 z" id="fo-id-11" />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'svg-backward',
  props: {
    height: {
      type: [String],
      default: '40px',
    },
    width: {
      type: [String],
      default: '40px',
    },
  },
};
</script>

<style scoped>
.fo-svg-shadow {
  stroke: #000;
  stroke-opacity: 0.15;
  stroke-width: 2px;
  fill: none;
}
.fo-svg-fill {
  fill: white;
}
</style>