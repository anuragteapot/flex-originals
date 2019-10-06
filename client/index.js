/* eslint-disable no-console */

const http = require("http");
const app = require("./app");

const server = http.createServer(app);
const port = 8080;

function onListening() {
  console.log(`Server started at http://localhost:${port}`);
}

function onError(error) {
  switch (error.code) {
    case "EACCES":
      console.log(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.log(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

server.listen(port);

server.on("listening", onListening);
server.on("error", onError);
