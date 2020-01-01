/** @format */

'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
const ora = require('ora');
const spinner = ora('Starting server.').start();

var app = (module.exports = loopback());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
//     console.log('---------------debug----------------------->')
//     console.log(process.env.APP_MONGO_PASS);
//     console.log(process.env.APP_MONGO_USER);
//     console.log(process.env.APP_MONGO_DB);
//     console.log(process.env.MONGO_HOST);
//     console.log('---------------debug----------------------->')

    console.log('-------------------------------------------------------');
    spinner.text = `WEB Server started at: ${baseUrl}`;
    spinner.color = 'green';
    spinner.succeed();
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      spinner.text = `Browse your REST API at: ${baseUrl}${explorerPath}`;
      spinner.color = 'green';
      spinner.succeed();
      console.log('-------------------------------------------------------');
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) app.start();
});
