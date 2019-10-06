/* eslint-disable no-console */

const path = require("path");
const express = require("express");
const { createBundleRenderer } = require("vue-server-renderer");

const isProd = process.env.NODE_ENV === "production";

function resolve(file) {
  return path.resolve(__dirname, file);
}

function serve(servePath) {
  return express.static(resolve(servePath));
}

function createRenderer(serverBundle, options) {
  return createBundleRenderer(serverBundle, {
    runInNewContext: false,
    ...options,
  });
}

function handleRenderError(err, req, res) {
  if (err.url) {
    res.redirect(err.url);
  } else if (err.code === 404) {
    res.status(404).send("404 | Page Not Found");
  } else {
    // Render Error Page or Redirect
    res.status(500).send("500 | Internal Server Error");

    console.error(`error during render : ${req.url}`);
    console.error(err.stack);
  }
}

function render(renderer, ctx, req, res) {
  const now = Date.now();

  res.setHeader("Content-Type", "text/html");

  const context = {
    url: req.url,
    ...ctx,
  };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleRenderError(err, req, res);
    }

    res.send(html);

    if (!isProd) {
      console.log(`Whole request took: ${Date.now() - now}ms`);
    }
  });
}

module.exports = {
  createRenderer,
  isProd,
  render,
  resolve,
  serve,
};
