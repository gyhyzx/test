import { createApp } from 'vue'
import './app.scss'

import pinia from './store'
import 'uno.css'
import Taro from '@tarojs/taro'
import { useThemeStore } from './store/modules/theme'

const App = createApp({
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  async mounted() {
    Taro.showLoading({
      title: '正在加载中...'
    })
    // 首次进入跟随系统渲染主题
    const themeStore = useThemeStore()
    await Taro.getSystemInfo({
      success: (res) => {
        themeStore.setTheme(res.theme as string)
      }
    })
    // 全局监听系统主题变化
    Taro.onThemeChange((res) => {
      themeStore.setTheme(res.theme)
    })
    try {
      // 首先通过开放接口获取code
      // await Taro.login({
      //   complete: (res) => {
      //     console.log(res)
      //   }
      // })
      // 通过code去后端获取openid、已存在则返回token跳转home页、否则留在登录页
      Taro.switchTab({
        url: '/pages/home/index'
      })
    } finally {
      Taro.hideLoading()
    }
  }
})

App.use(pinia)

export default App
