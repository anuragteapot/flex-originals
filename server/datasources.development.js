"use strict";

module.exports = {
  mongodb: {
    host: process.env.MONGO_HOST || "localhost",
    port: process.env.MONGO_PORT || 27017,
    database: process.env.APP_MONGO_DB || "flexoriginalsDev",
    user: process.env.APP_MONGO_USER || "root",
    password: process.env.APP_MONGO_PASS || "",
    name: "mongodb",
    connector: "mongodb",
    useNewUrlParser: true,
    useUnifiedTopology: false,
    connectionTimeout: 3000
  }
};
