"use strict";

module.exports = {
  mongodb: {
    host: process.env.MONGODB_HOST || "localhost",
    port: process.env.MONGODB_PORT || 27017,
    database: process.env.MONGODB_DATABASE || "lazydrive",
    user: process.env.MONGODB_DATABASE_USERNAME || "root",
    password: process.env.MONGODB_DATABASE_PASSWORD || "",
    name: "mongodb",
    connector: "mongodb",
    useNewUrlParser: true,
    connectionTimeout: 30000
  }
};
