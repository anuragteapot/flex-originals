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
    <section>
      <div class="home__container">
        <div class="home__inner"></div>
      </div>
      <br />
      <div class="home__container">
        <h2>Architecture of project</h2>
        <br />
        <div class="arc_inner">
          <img src="/public/project.png" slt="arch" />
        </div>
        <br />
        <div class="home__inner">
          <p>
            This project is done because i was learning Java and Golang to know the
            core concepts of both the languages and also i am very crusious about learning how Netflix , Youtube and microservices works.
          </p>
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
