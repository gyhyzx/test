import Taro from '@tarojs/taro'

export interface AddressInfo {
  latitude: number // 纬度
  longitude: number // 经度
  address: string // 逆地址解析结果
}

export async function getAddress(): Promise<AddressInfo> {
  // 首先获取用户的授权列表，如果没有授权位置，则请求授权
  await Taro.getSetting({
    success: (res) => {
      if (
        !_.has(res.authSetting, 'scope.userLocation') ||
        !_.get(res.authSetting, 'scope.userLocation', 'false')
      ) {
        // 调起用户授权弹窗
        Taro.authorize({
          scope: 'scope.userLocation'
        })
      }
    }
  })
  const addressInfo: AddressInfo = {
    latitude: 0,
    longitude: 0,
    address: ''
  }
  // 获取经纬度等信息
  await Taro.getLocation({
    type: 'wgs84',
    success: (res) => {
      addressInfo.latitude = res.latitude
      addressInfo.longitude = res.longitude
      // 结果逆地址解析
      addressInfo.address = ''
    },
    fail: () => {
      Taro.showToast({
        title: '失败,未授权位置',
        icon: 'error',
        mask: true
      })
    }
  })
  return addressInfo
}
