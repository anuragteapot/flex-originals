<template>
  <aside class="lazy">
    <div class="lazy-collection">
      <div class="server focusable server-friends unread" role="button" aria-label="Friends unread">
        <div class="server-icon">
          <svg>
            <use xlink:href="#icon-friends"></use>
          </svg>
        </div>
      </div>
    </div>

    <div class="lazy-collection">
      <div
        class="server focusable active"
        role="button"
        aria-label="My Server"
        aria-selected="true"
      >
        <div class="server-icon">
          <img src="https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png">
        </div>
      </div>
      <div class="server focusable" role="button" aria-label="My Server" aria-selected="true">
        <div class="server-icon">
          <img src="https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png">
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "lazy-aside"
};
</script>
