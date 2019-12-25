/* eslint-disable */
export default class utils {
  constructor() {
    this.regMobile = /^\d{10}$/;
    this.regName = /^[a-zA-Z ]*$/;
    this.regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.regDate = /^\d{4}[./-]\d{2}[./-]\d{2}$/;

    if (process.env && process) {
      this.CDN =
        process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3355';
    }
  }
  randomChars(len = 6) {
    let text = '';
    const possible = 'abcdefghjkmnpqrstuvwxyz0123456789';

    for (let i = 0; i < len; i += 1)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  getUrl(path, type) {
    if (path == '/public/loading.gif' || !path || path == '' ) {
      return path;
    } else {
      if (type == 'image') {
        return `${this.CDN}/f.img?mimetype=image/png&media=${path}`;
      } else if (type == 'video') {
        return `${this.CDN}/videoplayback?mimetype=video/mp4&id=1234&media=${path}`;
      } else if (type == 'audio') {
        return `${this.CDN}/audioplayback?mimetype=audio/mp3&id=1234&media=${path}`;
      }
    }
  }

  getUidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0;
      var v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Debounce Api
  debounce(func, wait, immediate) {
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

  time_ago(previousDate) {
    var current = new Date();
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previousDate;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
      return Math.round(elapsed / msPerYear) + ' years ago';
    }
  }
}
