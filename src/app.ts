import { createApp } from 'vue'
import './app.scss'

import pinia from './store'
import 'uno.css'
import router from './router'

const App = createApp({
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(pinia).use(router)

export default App
