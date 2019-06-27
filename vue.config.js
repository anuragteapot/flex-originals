const path = require('path')
module.exports = {
  outputDir: path.resolve(__dirname, './client/'),
  publicPath: '/',
  devServer: {
    proxy: 'http://localhost:3344'
  }
}
