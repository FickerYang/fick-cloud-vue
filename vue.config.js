/*
 * @Author: Fick 
 * @Date: 2019-05-21 11:31:18 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-08-08 15:57:04
 */

const path = require('path')
const webpack = require('webpack')

// 拼接路径
const resolve = dir => path.join(__dirname, dir)
// let publicPath = process.env.NODE_ENV === 'production' ? './' : '/';


module.exports = {
    configureWebpack: {
      plugins: [
        // Ignore all locale files of moment.js
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      ]
    },
    chainWebpack: config => {
      const svgRule = config.module.rule('svg')
      // 清除已有的所有 loader。
      // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
      svgRule.uses.clear()
      svgRule
        .test(/\.svg$/)
        .include.add(path.resolve(__dirname, './src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
      const fileRule = config.module.rule('file')
      fileRule.uses.clear()
      fileRule
        .test(/\.svg$/)
        .exclude.add(path.resolve(__dirname, './src/icons'))
        .end()
        .use('file-loader')
        .loader('file-loader')

        config.resolve.alias
            .set('@$', resolve('src'))
            .set('@view', resolve('src/views'))
            .set('@com', resolve('src/components'))
            .set('@util', resolve('src/utils'))
            // .set('@api', resolve('src/api'))
            // .set('@style', resolve('src/assets/style'))
            // .set('@img', resolve('src/assets/style/img'))
            // .set('@img', 'src/assets/style/img')
    
        // image exclude
        // const imagesRule = config.module.rule('images')
        // imagesRule
        //   .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
        //   .exclude
        //   .add(resolve('src/assets/svg-icons/icons'))
        //   .end()

      //  svgRule = config.module.rule('svg')
      // svgRule.uses.clear()
      // svgRule
      //   .oneOf('inline')
      //   .resourceQuery(/inline/)
      //   .use('vue-svg-icon-loader')
      //   .loader('vue-svg-icon-loader')
      //   .end()
      //   .end()
      //   .oneOf('external')
      //   .use('file-loader')
      //   .loader('file-loader')
      //   .options({
      //     name: 'assets/[name].[hash:8].[ext]'
      //   })

      },
      css: {
        loaderOptions: {
          less: {
            modifyVars: {
              /* less 变量覆盖，用于自定义 ant design 主题 */
    
              /*
              'primary-color': '#F5222D',
              'link-color': '#F5222D',
              'border-radius-base': '4px',
              */
            },
            javascriptEnabled: true
          }
        }
      },
      productionSourceMap: false,
      // devServer: {
      //   port: 8080,
      //   proxy: {
      //     //   '/api': {
      //     //     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro', //mock API接口系统
      //     //     ws: false,
      //     //     changeOrigin: true,
      //     //     pathRewrite: {
      //     //       '/jeecg-boot': ''  //默认所有请求都加了jeecg-boot前缀，需要去掉
      //     //     }
      //     //   },
      //     '/': {
      //       target: 'http://acl.itlp.top:8090', //请求本地 需要jeecg-boot后台项目
      //       ws: false,
      //       changeOrigin: true
      //     },
      //   }
      // },
}