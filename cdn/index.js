/* eslint-disable no-console */

const http = require('http');
const app = require('./app');
const ora = require('ora');
const spinner = ora('Starting server.').start();

const server = http.createServer(app);
const port = process.env.CDN_PORT || 3355;

function onListening() {
  spinner.text = `CDN Server started at http://localhost:${port}`;
  spinner.color = 'green';
  spinner.succeed();
}

function onError(error) {
  switch (error.code) {
    case 'EACCES':
      console.log(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

server.listen(port);

server.on('listening', onListening);
server.on('error', onError);
