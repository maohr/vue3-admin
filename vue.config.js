const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const resolve = dir => {
  return path.join(__dirname, dir);
};
const IS_PROD = ["production"].includes(process.env.NODE_ENV);
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/dist' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/dist' : '/',
  productionSourceMap: false,
  configureWebpack: config => {
    config.performance = {
      hints: false
    };
    if (IS_PROD) {
      const plugins = [];
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"] //移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
      config.plugins = [...config.plugins, ...plugins];
    }
  },
  chainWebpack: config => {
    // 修复hmr
    config.resolve.symlinks(true);

    config.resolve.alias
      .set("_c", resolve("src/components"))
      .set("_v", resolve("src/views"));
  }
};
