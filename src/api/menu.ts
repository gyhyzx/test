import { Home, My } from '@nutui/icons-vue-taro'
import { Component } from 'vue'

export interface MenuInfo {
  title?: string
  path: string
  name?: string
  component?: Component
  icon?: Component
  children?: MenuInfo[]
}

const Index = () => import('@/pages/index/index.vue')
const Home1 = () => import('@/pages/home/index.vue')
const User = () => import('@/pages/user/index.vue')
const Login = () => import('@/pages/login/index.vue')

export const menus: MenuInfo[] = [
  {
    path: '/',
    component: Index,
    children: [
      {
        title: '首页',
        path: '',
        name: 'Home',
        component: Home1,
        icon: h(Home)
      },
      {
        title: '我的',
        path: '/user',
        name: 'User',
        component: User,
        icon: h(My)
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
