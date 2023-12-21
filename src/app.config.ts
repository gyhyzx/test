export default defineAppConfig({
  // 路由
  pages: [
    'pages/login/index',
    'pages/home/index',
    'pages/notice/index',
    'pages/user/index'
  ],
  // 分包
  subPackages: [
    {
      root: 'busPackage',
      pages: [
        'pages/signIn/index',
        'pages/signIn/record',
        'pages/video/index',
        'pages/scene/index'
      ]
    }
  ],
  tabBar: {
    color: '@tabTxtColor',
    selectedColor: '@tabSelectedColor',
    backgroundColor: '@commonBgColor',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'resource/images/home.png',
        selectedIconPath: 'resource/images/selectedHome.png'
      },
      {
        pagePath: 'pages/notice/index',
        text: '消息',
        iconPath: 'resource/images/msg.png',
        selectedIconPath: 'resource/images/selectedMsg.png'
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: 'resource/images/user.png',
        selectedIconPath: 'resource/images/selectedUser.png'
      }
    ]
  },
  // 系统主题
  darkmode: true,
  themeLocation: 'theme.json',
  window: {
    navigationBarBackgroundColor: '@commonBgColor',
    // @ts-ignore
    navigationBarTextStyle: '@commonTxtColor'
  },
  // 权限相关
  permission: {
    'scope.userLocation': {
      desc: '此功能所需权限、请先授权'
    }
  },
  requiredPrivateInfos: ['getLocation'],
  // 组件按需注入
  lazyCodeLoading: 'requiredComponents'
})
