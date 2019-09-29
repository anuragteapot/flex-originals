// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const fs = require('fs');
const loopback = require('loopback');
const path = require('path');
const { createRenderer, isProd, render, resolve, serve } = require('./utils');
const templatePath = resolve('../../src/index.template.html');

const context = {
  title: 'Vue SSR Boilerplate',
};

module.exports = function(server) {
  server.use('/dist', loopback.static(path.resolve(__dirname, './../../dist')));
  server.use('/', loopback.static(path.resolve(__dirname, './../../public')));
  server.use(
    '/public',
    loopback.static(path.resolve(__dirname, './../../assets')),
  );
  var router = server.loopback.Router();

  let renderer;
  let readyPromise;

  if (isProd) {
    const template = fs.readFileSync(templatePath, 'utf-8');

    const serverBundle = require('../../dist/vue-ssr-server-bundle.json');
    const clientManifest = require('../../dist/vue-ssr-client-manifest.json');

    renderer = createRenderer(serverBundle, {
      template,
      clientManifest,
    });
  } else {
    const setupDevServer = require('../../build/setup-dev-server');

    readyPromise = setupDevServer(
      server,
      templatePath,
      (serverBundle, options) => {
        renderer = createRenderer(serverBundle, options);
      },
    );
  }

  function renderPage(req, res) {
    if (isProd) {
      render(renderer, context, req, res);
    } else {
      readyPromise.then(() => render(renderer, context, req, res));
    }
  }

  function renderPageXFrame(req, res) {
    res.removeHeader('X-Frame-Options');
    if (isProd) {
      render(renderer, context, req, res);
    } else {
      readyPromise.then(() => render(renderer, context, req, res));
    }
  }

  router.get('/', renderPage);
  router.get('/login', renderPage);
  router.get('/app/@settings', renderPage);
  router.get('/app/@home', renderPage);
  router.get('/app/@watch', renderPage);
  router.get('/app/@song', renderPage);
  router.get('/app/@upload', renderPage);
  router.get('/app/@editvideo', renderPage);
  router.get('/app/@channel/:id', renderPage);
  router.get('/signup', renderPage);
  router.get('/verify/users/confirm', renderPage);
  router.get('/verify/users/verified', renderPage);
  router.get('/auth', renderPage);
  router.get('/test', renderPage);
  router.get('/embed/:v?', renderPageXFrame);
  router.get('/@error', renderPage);

  server.use(router);
};
