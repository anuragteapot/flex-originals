// import Api from '@/services/Api'
import * as webStorage from './Storage.js'

export const services = {
  /**
   * Get the contents of a directory from the server
   * @returns {Promise}
   */
  loggedIn() {
    if (webStorage.local.get('accessToken')) {
      return true
    } else {
      return false
    }
  },

  /**
   * Get the contents of a directory from the server
   * @returns {Promise}
   */
  logout() {
    if (webStorage.local.destroy('accessToken')) {
      return true
    }
  }
}
