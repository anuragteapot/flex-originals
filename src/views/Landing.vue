<template>
  <div class="lazy_main_home">
    <creator-header></creator-header>
    <creator-body></creator-body>
    <creator-footer></creator-footer>
  </div>
</template>

<script>
import creatorBody from './../components/Landing/Body';
import creatorFooter from './../components/Landing/Footer';
import creatorHeader from './../components/Landing/Header';

export default {
  name: 'fo-landing',
  components: {
    creatorBody,
    creatorFooter,
    creatorHeader,
  },
};
</script>
