import { MenuInfo, menus } from '@/api/menu'
// import Taro from '@tarojs/taro'
import { RouteRecordRaw } from 'vue-router'
import pinia from '@/store'

const formatRoutes = (menus: MenuInfo[]) => {
  const result: RouteRecordRaw[] = []
  menus.forEach((item) => {
    const { path, name, component } = item
    let { children } = item
    if (children && children instanceof Array) {
      children = formatRoutes(children) as MenuInfo[]
    }
    const router = {
      path: path,
      name: name,
      component: component,
      children: children
    } as RouteRecordRaw
    result.push(router)
  })
  return result
}

const routes = formatRoutes(menus)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const authStore = useAuthStore(pinia)

router.beforeEach(async (to, from, next) => {
  if (!authStore.token) {
    if (_.eq(to.name, 'Login')) {
      next()
    } else {
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
      // next({ name: 'Login' })
      next()
    }
  } else {
    next()
  }
})

export default router
