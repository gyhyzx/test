import { createApp } from 'vue'
import './app.scss'

import pinia from './store'
import 'uno.css'
import Taro from '@tarojs/taro'

const App = createApp({
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  async mounted() {
    console.log('入口组件')
    Taro.showLoading({
      title: '正在加载中...'
    })
    try {
      // 首先通过开放接口获取code
      // await Taro.login({
      //   complete: (res) => {
      //     console.log(res)
      //   }
      // })
      // 通过code去后端获取openid和token
      // 如果获取不到,跳转login页面
      // Taro.showToast({
      //   title: '请先登录'
      // })
      // Taro.redirectTo({
      //   url: 'pages/login/index'
      // })
    } finally {
      Taro.hideLoading()
    }
  }
})

App.use(pinia)

export default App
