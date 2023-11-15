export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/user/index',
    'pages/login/index',
    'pages/home/notify/index'
  ],
  tabBar: {
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
  darkmode: true,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff'
  }
})
