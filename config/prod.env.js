'use strict'
module.exports = {
  NODE_ENV: '"production"',
  configureWebpack: config => {
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
  },
  externals: {
    vue: 'Vue'
  }
}
