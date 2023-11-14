<template>
  <view>
    <view class="mx-15 mt-30">
      <h1 class="text-2xl">登录</h1>
      <span class="font-light text-xs opacity-80">账号与PC端共用</span>
    </view>
    <view class="mx-12 mt-10 rounded-lg box-border">
      <nut-form>
        <nut-form-item>
          <nut-input
            v-model="loginParams.username"
            class="nut-input-text"
            placeholder="请输入用户名"
            type="text"
          />
        </nut-form-item>
        <nut-form-item>
          <nut-input
            v-model="loginParams.password"
            class="nut-input-text"
            placeholder="请输入密码"
            type="password"
          />
        </nut-form-item>
        <nut-form-item>
          <nut-button
            style="width: 100%"
            :loading="loading"
            shape="square"
            type="primary"
            >登录</nut-button
          >
        </nut-form-item>
      </nut-form>
    </view>
  </view>
</template>

<script setup lang="ts">
const loginParams: Record<string, string> = {
  username: '',
  password: ''
}

const loading = ref<boolean>(false)
</script>
