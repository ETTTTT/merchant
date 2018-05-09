var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var Px2remWebpackPlugin = require('px2rem-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var InjectScriptToHtml = require('./plugins/inject-script-to-html-plugin')
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

var env = process.env.NODE_ENV === 'testing'
        ? require('../config/test.env')
        : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.cssSourceMap,
            extract: true
        })
    },
    devtool: config.build.productionSourceMap,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        // https://www.npmjs.com/package/lodash-webpack-plugin
        new LodashModuleReplacementPlugin({
            // shorthands: true,
            // cloning: true,
            // // currying: true,
            // // caching: true,
            // collections: true,
            // // exotics: true,
            // // guards: true,
            // metadata:true,
            // // deburring:true,
            // unicode: true,
            // memoizing:true,
            // // 开启字符串强制类型转换
            // coercions: true,
            // flattening: true,
            // paths: true,
            // placeholders: true
        }),
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env,
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: utils.assetsCssPath('[name].[contenthash].css')
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: process.env.NODE_ENV === 'testing'
                    ? 'index.html'
                    : config.build.index,
            template: 'index.html',
            inject: true,
            favicon: 'favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        new InjectScriptToHtml({
            path: config.build.configScript
        }),
        new Px2remWebpackPlugin({originScreenWidth: 750}),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
})

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    var StatsPlugin = require('stats-webpack-plugin');


    webpackConfig.plugins.push(new BundleAnalyzerPlugin(), new StatsPlugin('../.stats/stats.json', {
        chunkModules: true,
        exclude: [/node_modules[\\\/]vue/]
      }))
}

module.exports = webpackConfig
