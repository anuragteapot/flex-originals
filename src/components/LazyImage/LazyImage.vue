<template>
  <div
    :class="`fo-image fo-background ${hover ? 'hover' : 'not'} ${active ? 'active': ''}`"
    ref="lazyBackground"
    @click="$emit('click')"
    :alt="alt"
  >
    <div v-show="isLoading && !lazySrc" class="timeline-item">
      <div class="animated-background"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lazy-image',
  data() {
    return {
      currentSrc: '',
      isLoading: true,
      calculatedAspectRatio: '',
    };
  },
  props: {
    alt: String,
    contain: Boolean,
    src: {
      type: [String, Object],
      default: '',
    },
    hover: Boolean,
    lazySrc: String,
    active: Boolean,
    srcset: String,
  },
  computed: {
    computedAspectRatio() {
      return this.normalisedSrc.aspect;
    },
    normalisedSrc() {
      return typeof this.src === 'string'
        ? {
            src: this.src,
            srcset: this.srcset,
            lazySrc: this.lazySrc,
            aspect: Number(this.aspectRatio || this.calculatedAspectRatio),
          }
        : {
            src: this.src.src,
            srcset: this.srcset || this.src.srcset,
            lazySrc: this.lazySrc || this.src.lazySrc,
            aspect: Number(
              this.aspectRatio || this.src.aspect || this.calculatedAspectRatio,
            ),
          };
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    cachedImage() {
      if (!(this.normalisedSrc.src || this.normalisedSrc.lazySrc)) return [];
      const src = this.isLoading ? this.normalisedSrc.lazySrc : this.currentSrc;
      this.$refs.lazyBackground.classList.remove('fo-background');
      this.$refs.lazyBackground.style.backgroundImage = `url("${src}")`;
    },
    init() {
      if (this.normalisedSrc.lazySrc) {
        const lazyImg = new Image();
        lazyImg.src = this.normalisedSrc.lazySrc;
        this.pollForSize(lazyImg, null);
        this.$refs.lazyBackground.style.backgroundImage = `url("${this.normalisedSrc.lazySrc}")`;
      }

      if (this.normalisedSrc.src) this.loadImage();
    },
    onLoad() {
      this.getSrc();
      this.isLoading = false;
      this.cachedImage();
    },
    onError() {
      // if (process.env.NODE_ENV !== 'production') {
      console.error(
        `Image load failed\n\n` + `src: ${this.normalisedSrc.src}`,
        this,
      );
      // }
      this.$emit('error', this.src);
    },
    getSrc() {
      if (this.image) this.currentSrc = this.image.currentSrc || this.image.src;
    },
    loadImage() {
      const image = new Image();
      this.image = image;

      image.onload = () => {
        if (image.decode) {
          image
            .decode()
            .catch(err => {
              // if (process.env.NODE_ENV !== 'production') {
              console.warn(
                `Failed to decode image, trying to render anyway\n\n` +
                  `src: ${this.normalisedSrc.src}` +
                  (err.message ? `\nOriginal error: ${err.message}` : ''),
                this,
              );
              // }
            })
            .then(this.onLoad);
        } else {
          this.onLoad();
        }
      };
      image.onerror = this.onError;

      image.src = this.normalisedSrc.src;
      this.sizes && (image.sizes = this.sizes);
      this.normalisedSrc.srcset && (image.srcset = this.normalisedSrc.srcset);

      this.aspectRatio || this.pollForSize(image);
      this.getSrc();
    },
    pollForSize(img, timeout = 100) {
      const poll = () => {
        const { naturalHeight, naturalWidth } = img;

        if (naturalHeight || naturalWidth) {
          this.calculatedAspectRatio = naturalWidth / naturalHeight;
        } else {
          timeout != null && setTimeout(poll, timeout);
        }
      };

      poll();
    },
  },
  watch: {
    src() {
      if (!this.isLoading) this.init();
      else this.loadImage();
    },
  },
};
</script>
