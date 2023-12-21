import * as images from '@/resource/index'

export interface MenuInfo {
  src: string
  description: string
  path: string
}

export const menus: MenuInfo[] = [
  {
    src: images.signPng,
    description: '打卡',
    path: '/busPackage/pages/signIn/index'
  },
  {
    src: images.videoPng,
    description: '监控',
    path: '/busPackage/pages/video/index'
  },
  {
    src: images.flowPng,
    description: '流程',
    path: ''
  },
  {
    src: images.locationPng,
    description: '现场事项',
    path: '/busPackage/pages/scene/index'
  },
  {
    src: images.knowledgePng,
    description: 'AI知识库',
    path: ''
  },
  {
    src: images.moneyPng,
    description: '投资管控',
    path: ''
  }
]
