import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import devConfig from './dev'
import prodConfig from './prod'
import ComponentsPlugin from 'unplugin-vue-components/webpack'
import NutUIResolver from '@nutui/nutui-taro/dist/resolver'
import AutoImport from 'unplugin-auto-import/webpack'
import path from 'path'
import UnoCSS from 'unocss/webpack'

export default defineConfig(async (merge) => {
  const baseConfig: UserConfigExport = {
    projectName: 'zhukai-uniapp-front',
    date: '2023-11-8',
    designWidth(input: any) {
      // 配置 NutUI 375 尺寸
      if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
        return 375
      }
      // 全局使用 Taro 默认的 750 尺寸
      return 750
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2 / 1,
      828: 1.81 / 2
    },
    alias: {
      '@': path.resolve(__dirname, '..', 'src')
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['taro-plugin-pinia', '@tarojs/plugin-html'],
    sass: {
      data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`
    },
    defineConstants: {},
    copy: {
      patterns: [],
      options: {}
    },
    framework: 'vue3',
    // compiler: 'webpack5',
    compiler: {
      type: 'webpack5',
      prebundle: {
        enable: false
      }
    },
    cache: {
      enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {}
        },
        url: {
          enable: true,
          config: {
            limit: 1024 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        // 处理预览文件过大
        chain.merge({
          plugin: {
            install: {
              plugin: require('terser-webpack-plugin'),
              args: [
                {
                  terserOptions: {
                    compress: true, // 默认使用terser压缩
                    // mangle: false,
                    keep_classnames: true, // 不改变class名称
                    keep_fnames: true // 不改变函数名称
                  }
                }
              ]
            }
          }
        })
        chain
          .plugin('analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
        chain.plugin('unplugin-vue-components').use(
          ComponentsPlugin({
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
            resolvers: [NutUIResolver({ taro: true })]
          })
        )
        chain.plugin('unplugin-auto-import').use(
          AutoImport({
            imports: [
              'vue',
              {
                'lodash-es': [['*', '_']]
              },
              'pinia'
            ],
            dts: true,
            dirs: ['./src/store/**', './src/api/**'],
            vueTemplate: true
          })
        )
        chain.plugin('unocss').use(UnoCSS())
      },
      // 这个东西主要为了消除自动引入顺序不同报的warning、暂时没啥好的解决方法
      miniCssExtractPluginOption: {
        ignoreOrder: true
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        chain.plugin('unplugin-vue-components').use(
          ComponentsPlugin({
            resolvers: [NutUIResolver({ taro: true })]
          })
        )
        chain.plugin('unocss').use(UnoCSS())
      }
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
