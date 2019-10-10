<template>
  <button class="fo-button" :style="`height:${height}; width:${height}`" @click="$emit('click')">
    <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
      <g class="fo-fullscreen-button-corner-2">
        <use class="fo-svg-shadow" xlink:href="#fo-id-48" />
        <path class="fo-svg-fill" d="m 14,14 -4,0 0,2 6,0 0,-6 -2,0 0,4 0,0 z" id="fo-id-48" />
      </g>
      <g class="fo-fullscreen-button-corner-3">
        <use class="fo-svg-shadow" xlink:href="#fo-id-49" />
        <path class="fo-svg-fill" d="m 22,14 0,-4 -2,0 0,6 6,0 0,-2 -4,0 0,0 z" id="fo-id-49" />
      </g>
      <g class="fo-fullscreen-button-corner-0">
        <use class="fo-svg-shadow" xlink:href="#fo-id-50" />
        <path class="fo-svg-fill" d="m 20,26 2,0 0,-4 4,0 0,-2 -6,0 0,6 0,0 z" id="fo-id-50" />
      </g>
      <g class="fo-fullscreen-button-corner-1">
        <use class="fo-svg-shadow" xlink:href="#fo-id-51" />
        <path class="fo-svg-fill" d="m 10,22 4,0 0,4 2,0 0,-6 -6,0 0,2 0,0 z" id="fo-id-51" />
      </g>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'svg-screen',
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