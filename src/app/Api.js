/* eslint-disable no-useless-escape */
import axios from 'axios'
import store from '@/store/store'
import router from '@/router'
import * as types from './../store/mutation-types'
import * as webStorage from './Storage'
import { config } from './Config'

/**
 * Api class for communication with the server
 */
class Api {
  /**
   * Store constructor
   */
  constructor() {
    this.webStorage = webStorage
    this.config = config
    const cssRule =
      'color: red;' +
      'font-size: 60px;' +
      'font-weight: bold;' +
      'text-shadow: 1px 1px 5px rgb(249, 162, 34);' +
      'filter: dropshadow(color=rgb(249, 162, 34), offx=1, offy=1);'
    setTimeout(console.log.bind(console, '%cStop!', cssRule), 0)

    this.regMobile = /^\d{10}$/
    this.regName = /^[a-zA-Z ]*$/
    this.regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    this.regDate = /^\d{4}[./-]\d{2}[./-]\d{2}$/

    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)

    if (!('Notification' in window)) {
      console.log('This browser does not support notifications!')
      return
    }

    Notification.requestPermission(status => {
      console.log('Notification permission status:', status)
    })

    if (
      typeof window !== 'undefined' &&
      ((window.sessionStorage && !window.sessionStorage.getItem('sessionId')) ||
        window.sessionStorage.getItem('sessionId').indexOf('session') === -1)
    ) {
      window.sessionStorage.setItem(
        'sessionId',
        `session-${new Date().getTime()}-${this.randomChars()}`
      )
    }
  }

  updateOnlineStatus() {
    const state = navigator.onLine || false

    if (state == true) {
      const data = {
        data: 'You are online',
        color: 'success'
      }

      store.commit(types.SHOW_SNACKBAR, data)
    } else {
      const data = {
        data: 'You are offline',
        color: 'info'
      }

      store.commit(types.SHOW_SNACKBAR, data)
    }
  }

  randomChars(len = 6) {
    let text = ''
    const possible = 'abcdefghjkmnpqrstuvwxyz0123456789'

    for (let i = 0; i < len; i += 1)
      text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
  }

  getUidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0
      var v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  // Debounce Api
  debounce(func, wait, immediate) {
    var timeout
    return function() {
      var context = this
      var args = arguments
      var later = function() {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  time_ago(previousDate) {
    var current = new Date()
    var msPerMinute = 60 * 1000
    var msPerHour = msPerMinute * 60
    var msPerDay = msPerHour * 24
    var msPerMonth = msPerDay * 30
    var msPerYear = msPerDay * 365

    var elapsed = current - previousDate

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago'
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago'
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago'
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago'
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago'
    } else {
      return Math.round(elapsed / msPerYear) + ' years ago'
    }
  }

  /**
   * Set the axios settings.
   */
  axios() {
    axios.defaults.headers.common[
      'authorization'
    ] = `${webStorage.local.get('$accessToken')}`
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.defaults.headers.common['csrfToken'] = process.env.VUE_APP_SECRET

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(
      err
    ) {
      var config = err.config
      // If config does not exist or the retry option is not set, reject
      if (!config || !config.retry) return Promise.reject(err)

      // Set the variable for keeping track of the retry count
      config.__retryCount = config.__retryCount || 0

      // Check if we've maxed out the total number of retries
      if (config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err)
      }

      // Increase the retry count
      config.__retryCount += 1

      // Create new promise to handle exponential backoff
      var backoff = new Promise(function(resolve) {
        setTimeout(function() {
          resolve()
        }, config.retryDelay || 1)
      })

      // Return the promise in which recalls axios to retry the request
      return backoff.then(function() {
        return axios(config)
      })
    })

    return axios
  }

  /**
   * Check for logged in.
   *
   */
  async isLogged() {
    if (
      webStorage.local.get('$accessToken') &&
      webStorage.local.get('$userId')
    ) {
      const userId = await webStorage.local.get('$userId')

      if (userId) {
        try {
          const user = await this.axios().get(`/api/users/${userId}`)
          store.commit(types.SET_USER, user.data);
          store.commit(types.IS_AUTHENTICATED, true)
          return Promise.resolve(true)
        } catch (err) {
          this._handleError(err)
        }
      }
    }

    return Promise.resolve(false)
  }

  /**
   * Logout
   *
   */
  async logout() {
    try {
      await this.axios().post('/api/users/logout')
    } catch (err) {
      await webStorage.local.destroy('$accessToken')
      await webStorage.local.destroy('$userId')
      await webStorage.local.destroy('user')
      await webStorage.local.destroy('created')
      await webStorage.local.destroy('ttl')
      router.push('/login')
    }
    return Promise.resolve(true)
  }

  /**
   * Handle errors
   * @param error
   *
   */
  _handleError(error) {
    try {
      var errorData = {
        data: error.response.data.error.message,
        color: 'error'
      }
    } catch (err) {
      console.log(err)
    }
    
    switch (error.response.status) {
      case 400:
        this.logout()
        errorData.data = 'Invalid Request.'
        store.commit(types.SHOW_SNACKBAR, errorData)
        break
      case 404:
        errorData.data = 'Something went wrong.'
        store.commit(types.SHOW_SNACKBAR, errorData)
        router.push('/@error');
        break
      case 401:
        this.logout()
        store.commit(types.SHOW_SNACKBAR, errorData)
        break
      case 500:
        errorData.data = error.response.statusText
        store.commit(types.SHOW_SNACKBAR, errorData)
        router.push('/@error');
        break
      default:
        store.commit(types.SHOW_SNACKBAR, errorData)
    }

    throw error
  }
}

export let api = new Api()
