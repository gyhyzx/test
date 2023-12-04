<template>
  <basic-layout>
    <nut-radio-group v-model="radioVal" class="w-full px-10 pt-30 box-border">
      <h1 class="text-2xl p-2">选择打卡方式</h1>
      <nut-cell>
        <nut-radio label="1"
          >定位打卡
          <template #icon><Success /> </template>
          <template #checkedIcon> <Success color="red" /> </template>
        </nut-radio>
      </nut-cell>
      <nut-cell>
        <nut-radio label="2"
          >二维码打卡
          <template #icon> <Success /> </template>
          <template #checkedIcon> <Success color="red" /> </template>
        </nut-radio>
      </nut-cell>
    </nut-radio-group>
    <view class="box-border px-10 pt-50 text-center">
      <nut-button
        :loading="loading"
        type="primary"
        style="width: 100%"
        shape="square"
        @click="onClickBtn"
        >确认</nut-button
      >
    </view>
  </basic-layout>
</template>

<script setup lang="ts">
import { Success } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'

definePageConfig({
  navigationBarTitleText: '打卡'
})

const loading = ref<boolean>(false)

const radioVal = ref<string>('1')

async function onClickBtn() {
  loading.value = true
  // 定位打卡
  if (_.eq(radioVal.value, '1')) {
    try {
      // 首先获取用户的授权列表，如果没有授权位置，则请求授权
      await Taro.getSetting({
        success: (res) => {
          console.log(res)
          if (
            !_.has(res.authSetting, 'scope.userLocation') ||
            !_.get(res.authSetting, 'scope.userLocation', 'false')
          ) {
            Taro.authorize({
              scope: 'scope.userLocation'
            })
          }
        }
      })
      // 获取经纬度等信息
      await Taro.getLocation({
        type: 'wgs84',
        success: (res) => {
          // 将结果逆地址解析
          console.log(res)
        },
        fail: () => {
          Taro.showToast({
            title: '获取位置授权失败,请确认授权情况'
          })
        }
      })
    } finally {
      loading.value = false
    }
  } else {
    // 二维码打卡
  }
}
</script>
