<template>
  <basic-layout>
    <view class="top-bg"></view>
    <view class="mx-4 relative box-border mt--35 text-center">
      <nut-avatar size="86" class="relative mb--12 z-2">
        <img :src="user.avatar" />
      </nut-avatar>
      <nut-cell class="h-290 flex center" :round-radius="10">
        <span>{{ user.username }}</span>
      </nut-cell>
    </view>
    <view class="mx-4">
      <nut-cell-group>
        <nut-cell
          v-for="(item, index) in cellList"
          :key="index"
          :title="item.title"
          @click="item.fn"
        >
          <template #icon>
            <IconFont :name="item.icon" />
          </template>
          <template #link>
            <RectRight />
          </template>
        </nut-cell>
      </nut-cell-group>
    </view>
    <view class="fixed bottom-32 left-32 right-32">
      <nut-button
        style="width: 100%"
        shape="square"
        type="primary"
        @click="dialogVisible = true"
        >退出登录</nut-button
      >
    </view>
    <nut-dialog
      v-model:visible="dialogVisible"
      footer-direction="vertical"
      content="确认退出登录吗？"
      @cancel="dialogVisible = false"
      @ok="onLogout"
    />
  </basic-layout>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro'
import { RectRight, IconFont } from '@nutui/icons-vue-taro'

const dialogVisible = ref<boolean>(false)

definePageConfig({
  navigationBarTitleText: '用户信息'
})

const cellList: Array<Record<string, any>> = [
  {
    title: '打卡记录',
    fn: onGoSignInRecord,
    icon: 'date'
  }
]

const user: Record<string, string> = reactive({
  avatar:
    'https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png',
  username: '啦啦啦'
})

function onGoSignInRecord() {
  Taro.navigateTo({
    url: '/pages/signIn/record'
  })
}

function onLogout() {
  Taro.redirectTo({
    url: '/pages/login/index'
  })
}
</script>

<style lang="scss">
.top-bg {
  width: 100%;
  height: 360px;
  position: relative;
  z-index: -1;
  overflow: hidden;

  &::after {
    content: '';
    width: 140%;
    height: 100%;
    position: absolute;
    left: -20%;
    top: 0;
    z-index: -1;
    border-radius: 0 0 50% 50%;
    background-color: #434343;
  }
}
</style>
