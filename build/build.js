require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('开心就好! biu~~~ biu~~~ biu~~~')
spinner.start()

rm(path.join(config.build.assetsRoot, '/*'), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    if (stats.hasErrors()) {
        console.log(chalk.red('打包的文件有错误,请仔细端详你的代码！！！\n'))
        process.exit(1)
      }
    console.log(chalk.cyan('  打包结束，您辛苦啦！( *^_^* ).\n'))
    console.log(chalk.yellow(
        '  Tip: 构建的文件应该在HTTP服务器上服务\n' +
        '  直接打开 index.html 其地址为 file:// 是不行滴，要开服务器哦\n'
    ))
  })
})
