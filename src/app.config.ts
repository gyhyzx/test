export default defineAppConfig({
  pages: [
    'pages/login/index',
    'pages/home/index',
    'pages/user/index',
    'pages/notice/index',
    'pages/video/index'
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
        selectedIconPath: 'resource/images/home.png'
      },
      {
        pagePath: 'pages/video/index',
        text: '监控',
        iconPath: 'resource/images/video.png',
        selectedIconPath: 'resource/images/video.png'
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
    navigationBarBackgroundColor: '@commonBgColor',
    // @ts-ignore
    navigationBarTextStyle: '@commonTxtColor'
  },
  // 权限相关
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于签到功能'
    }
  }
})
