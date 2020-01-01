/* eslint-disable */
import axios from 'axios';
import * as webStorage from './webStorage';
let PORT = 3000;
if (process.env && process) {
  PORT = process.env.APP_API_PORT;
}

const AXIOS_API = () => {
  let instance = null;
  
  instance = axios.create({
    baseURL:
      process.env.NODE_ENV === 'production' ? '' : `http://localhost:${PORT}`,
  });
  
//  if (process.env.NODE_ENV === 'production') {
//     instance = axios.create({
//     //baseURL: `http://localhost:3000`,
//     });
//   } else {
//     instance = axios.create({
//       baseURL: `http://localhost:${PORT}`,
//     });
//   }

  instance.defaults.headers.common['authorization'] = `${webStorage.local.get(
    '$accessToken',
  )}`;
  instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  instance.defaults.headers.common['Content-Type'] =
    'application/x-www-form-urlencoded';

  instance.interceptors.response.use(undefined, function axiosRetryInterceptor(
    err,
  ) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
      return instance(config);
    });
  });

  return instance;
};

export default AXIOS_API();
