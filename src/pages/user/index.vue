<template>
  <basic-layout>
    <view class="py-10 text-center box-border bg-yellow">
      <view>
        <nut-avatar size="large">
          <img :src="user.avatar" />
        </nut-avatar>
      </view>
      <view class="mt-2">
        <span>{{ user.username }}</span>
      </view>
    </view>
    <view>
      <nut-cell title="打卡记录">
        <template #link>
          <IconFont name="rect-right" />
        </template>
      </nut-cell>
    </view>
    <view class="fixed bottom-0 w-full">
      <nut-button style="width: 100%" type="primary">退出登录</nut-button>
    </view>
  </basic-layout>
</template>

<script setup lang="ts">
import { IconFont } from '@nutui/icons-vue-taro'

const user: Record<string, string> = reactive({
  avatar:
    'https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png',
  username: '啦啦啦'
})
</script>
