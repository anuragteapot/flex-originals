<template>
  <section class="content">
    <div class="inner">
      <label class="switch">
        <input type="checkbox" />
        <div></div>
      </label>
      <div class="radio">
        <input id="1" type="radio" name="b" checked />
        <label for="1">Option 1</label>
      </div>
      <div class="radio">
        <input id="2" type="radio" name="b" />
        <label for="2">Option 2</label>
      </div>
      <div class="checkbox">
        <input id="one" type="checkbox" />
        <span class="check"></span>
        <label for="one">Check me!</label>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "media-content"
};
</script>
