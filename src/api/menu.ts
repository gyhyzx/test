import * as images from '@/resource/index'

export interface MenuInfo {
  value: number
  src: string
  description: string
  path: string
}

export const menus: MenuInfo[] = [
  {
    value: 0,
    src: images.signPng,
    description: '打卡',
    path: ''
  },
  {
    value: 8,
    src: images.noticePng,
    description: '通知',
    path: '/pages/notice/index'
  },
  {
    value: 0,
    src: images.flowPng,
    description: '流程',
    path: ''
  },
  {
    value: 0,
    src: images.locationPng,
    description: '现场事项',
    path: ''
  },
  {
    value: 0,
    src: images.knowledgePng,
    description: 'AI知识库',
    path: ''
  }
]
