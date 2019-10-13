<template>
  <button
    :class="`fo-button ${customClass}`"
    :style="`height:${height}; width:${height}`"
    @click="$emit('click')"
  >
    <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
      <use class="fo-svg-shadow" xlink:href="#fo-id-79" />
      <path
        class="fo-svg-fill"
        d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
        id="fo-id-79"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'svg-play',
  props: {
    height: {
      type: [String],
      default: '40px',
    },
    width: {
      type: [String],
      default: '40px',
    },
    customClass: {
      type: [String],
      default: '',
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