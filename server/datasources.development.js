"use strict";

module.exports = {
  mongodb: {
    host: process.env.MONGO_HOST || "localhost",
    port: process.env.MONGO_PORT || 27017,
    database: process.env.APP_MONGO_DATABASE || "flexoriginalsDev",
    user: process.env.APP_MONGO_DATABASE_USERNAME || "root",
    password: process.env.APP_MONGO_DATABASE_PASSWORD || "",
    name: "mongodb",
    connector: "mongodb",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectionTimeout: 3000
  }
};
