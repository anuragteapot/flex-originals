<template>
  <button
    class="fo-button"
    :style="`height:${height}; width:${height}; cursor:${cursor}`"
    @click="$emit('click')"
  >
    <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
      <use class="fo-svg-shadow" />
      <path
        class="fo-svg-fill"
        d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'svg-pause',
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
