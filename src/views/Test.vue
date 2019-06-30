<template>
  <div>
    <lazy-video-player
      src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"
    ></lazy-video-player>
    <label class="switch">
      <input type="checkbox">
      <div></div>
    </label>
    <div class="radio">
      <input id="1" type="radio" name="b" checked>
      <label for="1">Option 1</label>
    </div>
    <div class="radio">
      <input id="2" type="radio" name="b">
      <label for="2">Option 2</label>
    </div>
    <div class="checkbox">
      <input id="one" type="checkbox">
      <span class="check"></span>
      <label for="one">Check me!</label>
    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      pdfContent: null,
      numPages: 0,
      page: 1,
      loadedRatio: 1
    };
  },
  mounted() {
    this.pdfContent =
      "/api/files/Li91cGxvYWRzL01vZHVsZSAyIEludHJvIHRvIFJlbGF0aW9uYWwgTW9kZWwucGRm/t/pdf/m/application/pdf/s/1601407/11e1163cbaebdc5e93b87ed8a0b8e671ba0573db";
  },
  methods: {
    nextPage: function() {
      // Go to next page if any
      if (this.page < this.numPages) this.page++;
    },
    previousPage: function() {
      // Go to previous page if not already at page 1
      if (this.page > 1) this.page--;
    },
    error: function(err) {
      console.log(err);
    }
  }
};
</script>
