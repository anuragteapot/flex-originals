<template>
  <button
    class="fo-button"
    :style="`height:${height}; width:${height}; cursor:${cursor}`"
    @click="$emit('click')"
  >
    <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
      <use class="fo-svg-shadow" xlink:href="#fo-id-13" />
      <path
        class="fo-svg-fill"
        d="M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z"
        id="fo-id-13"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'svg-forward',
  props: {
    cursor: {
      type: String,
      default: '',
    },
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
