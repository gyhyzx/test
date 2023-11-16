export default defineAppConfig({
  pages: [
    'pages/login/index',
    'pages/home/index',
    'pages/user/index',
    'pages/notify/index'
  ],
  tabBar: {
    backgroundColor: '@tabFontColor',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'resource/images/home.png',
        selectedIconPath: 'resource/images/home.png'
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: 'resource/images/user.png',
        selectedIconPath: 'resource/images/user.png'
      }
    ]
  },
  // 系统主题
  darkmode: true,
  themeLocation: 'theme.json',
  window: {
    navigationBarBackgroundColor: '@navBgColor'
  },
  // 权限相关
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于签到功能'
    }
  }
})
