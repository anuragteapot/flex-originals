<template>
  <button class="fo-button" :style="`height:${height}; width:${height}`" @click="$emit('click')">
    <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
      <g class="fo-fullscreen-button-corner-0">
        <use class="fo-svg-shadow" />
        <path class="fo-svg-fill" d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z" id="fo-id-25" />
      </g>
      <g class="fo-fullscreen-button-corner-1">
        <use class="fo-svg-shadow" />
        <path class="fo-svg-fill" d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z" />
      </g>
      <g class="fo-fullscreen-button-corner-2">
        <use class="fo-svg-shadow" />
        <path class="fo-svg-fill" d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z" id="fo-id-27" />
      </g>
      <g class="fo-fullscreen-button-corner-3">
        <use class="fo-svg-shadow" />
        <path class="fo-svg-fill" d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z" id="fo-id-28" />
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