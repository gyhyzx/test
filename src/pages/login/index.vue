<template>
  <basic-layout>
    <view class="mx-13 pt-30 box-border">
      <h1 class="text-2xl">登录</h1>
      <span class="font-light text-xs opacity-80">账号与PC端共用</span>
    </view>
    <view class="mx-12 mt-10 rounded-lg box-border">
      <nut-form ref="formRef" :model-value="loginParams">
        <nut-form-item
          prop="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <nut-input
            v-model="loginParams.username"
            class="nut-input-text"
            placeholder="请输入用户名"
            type="text"
          >
            <template #left>
              <People />
            </template>
          </nut-input>
        </nut-form-item>
        <nut-form-item
          prop="password"
          :rules="[{ validator: formValidatePass }]"
        >
          <nut-input
            v-model="loginParams.password"
            class="nut-input-text"
            placeholder="请输入密码"
            type="password"
          >
            <template #left>
              <Marshalling />
            </template>
          </nut-input>
        </nut-form-item>
        <nut-form-item>
          <nut-button
            style="width: 100%"
            :loading="loading"
            shape="square"
            type="primary"
            @click="onLogin"
            >登录</nut-button
          >
        </nut-form-item>
      </nut-form>
    </view>
  </basic-layout>
</template>

<script setup lang="ts">
import { LoginParams } from '@/api/auth'
import Taro from '@tarojs/taro'
import { formValidatePass } from '@/utils/password'
import { People, Marshalling } from '@nutui/icons-vue-taro'
// import { sm4 } from 'sm-crypto'

definePageConfig({
  navigationBarTitleText: '登录'
})

// const secretKey = process.env.TARO_APP_SM4_KEY

const formRef = ref()

const loginParams = ref<LoginParams>({
  username: '',
  password: ''
})

const loading = ref<boolean>(false)

function onLogin() {
  // formRef.value.validate().then(async ({ valid }) => {
  //   if (valid) {
  //     loading.value = true
  //     const _data = _.cloneDeep(loginParams.value)
  //     _data.password = sm4.encrypt(_data.password, secretKey!)
  //     const res = await loginApi(_data)
  //     if (res) {
  //       Taro.switchTab({
  //         url: '/pages/home/index'
  //       })
  //     } else {
  //       loading.value = false
  //     }
  //   } else {
  //     return
  //   }
  // })
  Taro.switchTab({
    url: '/pages/home/index'
  })
}
</script>
