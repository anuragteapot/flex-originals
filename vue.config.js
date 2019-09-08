const path = require('path');
module.exports = {
  outputDir: path.resolve(__dirname, './client/'),
  publicPath: '/',
  pwa: {
    name: 'Flex Originals',
    themeColor: '#f72f2f',
    backgroundColor: '#252a2e',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'public/icons/favicon-32x32.png',
      favicon16: 'public/icons/favicon-16x16.png',
      appleTouchIcon: 'public/icons/apple-touch-icon-152x152.png',
      maskIcon: 'public/icons/safari-pinned-tab.svg',
      msTileImage: 'public/icons/msapplication-icon-144x144.png'
    }
  },
  devServer: {
    proxy: 'http://localhost:3344'
  }
};
