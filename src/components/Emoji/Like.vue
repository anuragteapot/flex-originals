<template>
  <button class="fo-button" :style="`cursor:${cursor}`">
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :width="width"
      :height="height"
      viewBox="0 0 426.668 426.668"
      style="enable-background:new 0 0 426.668 426.668;"
      xml:space="preserve"
    >
      <path
        style="fill:#F05228;"
        d="M401.788,74.476c-63.492-82.432-188.446-33.792-188.446,49.92
	c0-83.712-124.962-132.356-188.463-49.92c-65.63,85.222-0.943,234.509,188.459,320.265
	C402.731,308.985,467.418,159.698,401.788,74.476z"
      />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
    </svg>
  </button>
</template>
<script>
export default {
  name: 'emoji-like',
  props: {
    cursor: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '40px',
    },
    width: {
      type: String,
      default: '40px',
    },
  },
};
</script>
