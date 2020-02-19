/* eslint-disable no-unused-vars */
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

class MediaSourceApi {
  constructor(videoElement, src, autoPlay) {
    this.video = videoElement;
    this.assetURL = src;
    this.mimeCodec = 'video/mp4; codecs="avc1.64001e, mp4a.40.2"';
    this.totalSegments;
    this.segmentLength = 0;
    this.segmentDuration = 0;
    this.bytesFetched = 0;
    this.requestedSegments = [];
    this.sourceBuffer = null;
    this.mediaSource = null;
    this.seeking = false;
    this.autoPlay = autoPlay;
  }

  init() {
    if (
      'MediaSource' in window &&
      MediaSource.isTypeSupported(this.mimeCodec)
    ) {
      this.mediaSource = new MediaSource();
      this.video.src = URL.createObjectURL(this.mediaSource);
      this.mediaSource.addEventListener('sourceopen', this.sourceOpen);
    } else {
      console.warn('Unsupported MIME type or codec: ', this.mimeCodec);
      console.warn('Playing with default HTML5 Video Player');
      this.video.src = this.assetURL;
    }
    return this.video;
  }

  sourceOpen = () => {
    // console.log(this.mediaSource);
    this.sourceBuffer = this.mediaSource.addSourceBuffer(this.mimeCodec);
    this.sourceBuffer.addEventListener('update', this.sourceOnUpdate);
    this.sourceBuffer.addEventListener('updateend', this.sourceOnUpdateEnd);

    this.getFileLength(this.assetURL, fileLength => {
      this.totalSegments = (fileLength / 1024 / 1024).toFixed(0);

      for (let i = 0; i < this.totalSegments; ++i) {
        this.requestedSegments[i] = false;
      }

      this.segmentLength = Math.round(fileLength / this.totalSegments);
      this.fetchRange(this.assetURL, 0, this.segmentLength, this.appendSegment);
      this.requestedSegments[0] = true;

      this.video.addEventListener('timeupdate', this.checkBuffer);

      this.video.addEventListener('canplay', () => {
        this.segmentDuration = this.video.duration / this.totalSegments;

        if (this.autoPlay) {
          const promise = this.video.play();

          if (promise !== undefined) {
            promise
              .then(_ => {
                console.log(_);
                // Autoplay started!
              })
              .catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
              });
          }
        }
      });

      this.video.addEventListener('seeking', debounce(this.handleSeek, 500));
      this.video.addEventListener('seeked', this.onSeeked);
      this.video.addEventListener('loadeddata', this.onLoadedData);
    });
  };

  onSeeked = e => {
    // console.log(e);
  };

  onLoadedData = e => {
    // console.log(e);
  };

  sourceOnUpdateEnd = e => {
    // console.log(e);
  };
  sourceOnUpdate = e => {
    // console.log(e);Ï
  };

  getFileLength = (url, cb) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('head', url);
      xhr.onload = () => {
        resolve(cb(xhr.getResponseHeader('content-length')));
      };
      xhr.send();
    });
  };

  fetchRange = (url, start, end, cb) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('get', url);
      xhr.responseType = 'arraybuffer';
      xhr.setRequestHeader('Range', 'bytes=' + start + '-' + end);
      xhr.onload = () => {
        this.bytesFetched += end - start + 1;
        resolve(cb(xhr.response));
      };
      xhr.send();
    });
  };

  appendSegment = chunk => {
    this.sourceBuffer.appendBuffer(chunk);
  };

  checkBuffer = () => {
    const nextSegment = this.getNextSegment();
    if (nextSegment == this.totalSegments && this.haveAllSegments()) {
      this.mediaSource.endOfStream();
      this.video.removeEventListener('timeupdate', this.checkBuffer);
    } else if (this.shouldFetchNextSegment(nextSegment)) {
      this.requestedSegments[nextSegment] = true;
      this.fetchRange(
        this.assetURL,
        this.bytesFetched,
        this.bytesFetched + this.segmentLength,
        this.appendSegment,
      );
    }
  };

  handleSeek = async () => {
    this.seeking = true;
    const nextSegment = this.getNextSegment();
    if (nextSegment === this.totalSegments && this.haveAllSegments()) {
      this.mediaSource.endOfStream();
      this.video.removeEventListener('timeupdate', this.checkBuffer);
    } else {
      for (let segment = 1; segment < nextSegment; segment++) {
        if (this.shouldFetchNextSegment(segment)) {
          this.requestedSegments[segment] = true;

          await this.fetchRange(
            this.assetURL,
            this.bytesFetched,
            this.bytesFetched + this.segmentLength,
            this.appendSegment,
          );
        }
      }
    }
    this.seeking = false;
  };

  getNextSegment = () => {
    return ((this.video.currentTime / this.segmentDuration) | 0) + 1;
  };

  haveAllSegments = () => {
    return this.requestedSegments.every(val => {
      return !!val;
    });
  };

  shouldFetchNextSegment = nextSegment => {
    return (
      this.video.currentTime > this.segmentDuration * nextSegment * 0.1 &&
      this.requestedSegments[nextSegment] == false
    );
  };
}

// export default MediaSourceApi;

if (typeof window != undefined) {
  window.FlexVideoPlayer = MediaSourceApi;
}
