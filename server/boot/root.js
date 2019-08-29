// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

// 'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();

  router.get('/embed', function(req, res) {
    res.removeHeader('X-Frame-Options');
    res.redirect('/embed');
  });

  server.use(router);
};
