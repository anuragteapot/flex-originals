<template>
  <div class="home__body">
    <section>
      <div class="background-shapes-wrapper">
        <div class="background-shapes-container">
          <div class="background-shape square-one"></div>
          <div class="background-shape square-two"></div>
          <div class="background-shape square-three"></div>
          <div class="background-shape square-four"></div>
        </div>
      </div>
      <div class="home__container">
        <div class="home__inner">
          <h1>Built for Content Creators</h1>
          <p>
            Flex Originals is streaming platform for creators, show your talent to everyone in world and
            enjoy music & videos and share them to world.
            <!-- <a
              href="/open-source"
              class="text-white jumbotron-link"
            >open source</a> to
            <a href="/business" class="text-white jumbotron-link">business</a>, you can host and review code, manage projects, and build software alongside 36 million&nbsp;developers.-->
          </p>
          <router-link to="/app/@home">
            <button class="btn-hover color">Get Started</button>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'landing-body',
};
</script>
