<template>
  <basic-layout>
    <nut-navbar @click-right="onClickRight">
      <template #right>
        <span>打卡记录</span>
      </template>
    </nut-navbar>
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
    <nut-dialog
      v-model:visible="dialogVisible"
      :content="content"
      @cancel="dialogVisible = false"
      @ok="onOk"
    />
  </basic-layout>
</template>

<script setup lang="ts">
import { AddressInfo } from '@/busPackage/utils/address'
import { Success } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'

definePageConfig({
  navigationBarTitleText: '打卡'
})

const loading = ref<boolean>(false)

const radioVal = ref<string>('1')

const dialogVisible = ref<boolean>(false)
const content = ref<string>('')

async function onClickBtn() {
  loading.value = true
  // 定位打卡
  if (_.eq(radioVal.value, '1')) {
    try {
      const res: AddressInfo = await getAddress()
      content.value = `当前位置纬度为${res.latitude}、经度为${res.longitude},确认打卡？`
      dialogVisible.value = true
    } finally {
      loading.value = false
    }
  } else {
    // 二维码打卡
    dialogVisible.value = false
    Taro.switchTab({
      url: '/pages/home/index'
    })
    Taro.showToast({
      title: '打卡成功'
    })
  }
}

async function onOk() {
  dialogVisible.value = false
  Taro.switchTab({
    url: '/pages/home/index'
  })
  Taro.showToast({
    title: '打卡成功'
  })
}

function onClickRight() {
  Taro.navigateTo({
    url: '/busPackage/pages/signIn/record'
  })
}
</script>
