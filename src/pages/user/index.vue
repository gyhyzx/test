<template>
  <basic-layout>
    <view
      class="py-10 text-center box-border"
      style="background-color: #434343"
    >
      <nut-avatar size="large">
        <img :src="user.avatar" />
      </nut-avatar>
      <span class="text-white mt-2">{{ user.username }}</span>
    </view>
    <nut-cell title="打卡记录">
      <template #icon>
        <Date />
      </template>
      <template #link>
        <RectRight />
      </template>
    </nut-cell>
    <view class="fixed bottom-0 w-full">
      <nut-button style="width: 100%" shape="square" type="primary"
        >退出登录</nut-button
      >
    </view>
  </basic-layout>
</template>

<script setup lang="ts">
import { RectRight, Date } from '@nutui/icons-vue-taro'

definePageConfig({
  navigationBarTitleText: '用户信息'
})

const user: Record<string, string> = reactive({
  avatar:
    'https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png',
  username: '啦啦啦'
})
</script>
