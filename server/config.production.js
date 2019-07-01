"use strict";

module.exports = {
  restApiRoot: "/api",
  host: "0.0.0.0",
  port: 3333,
  remoting: {
    context: false,
    rest: {
      handleErrors: false,
      normalizeHttpPath: false,
      xml: false
    },
    json: {
      strict: false,
      limit: "100kb"
    },
    urlencoded: {
      extended: true,
      limit: "100kb"
    },
    cors: false,
    errorHandler: {
      disableStackTrace: true
    }
  }
};
