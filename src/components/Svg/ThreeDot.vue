<template>
  <button
    class="fo-button"
    :style="`height:${height}; width:${height}; cursor:${cursor}`"
    @click="$emit('click')"
  >
    <svg
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      class="style-scope fo-svg-fill"
      :style="
        `pointer-events: none; display: block; width: ${width}; height: ${height};`
      "
    >
      <g class="style-scope yt-icon">
        <path
          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
          class="style-scope yt-icon"
        ></path>
      </g>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'svg-threedot',
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
