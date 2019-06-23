const path = require('path')
module.exports = {
  outputDir: path.resolve(__dirname, './client/'),
  baseUrl: '/',
  devServer: {
    proxy: 'http://localhost:3344'
  }
}
