'use strict'
module.exports = {
  NODE_ENV: '"production"',
  publicPath: '/admin/',
  configureWebpack: config => {
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
  }
}
