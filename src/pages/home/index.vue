<template>
  <basic-layout>
    <nut-swiper
      :init-page="activeNo"
      :loop="true"
      auto-play="3000"
      direction="vertical"
      class="h-450"
      :pagination-visible="true"
    >
      <nut-swiper-item>
        <img
          class="w-full h-full"
          src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg"
          alt=""
        />
      </nut-swiper-item>
      <nut-swiper-item>
        <img
          class="w-full h-full"
          src="https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg"
          alt=""
        />
      </nut-swiper-item>
      <nut-swiper-item>
        <img
          class="w-full h-full"
          src="https://storage.360buyimg.com/jdc-article/welcomenutui.jpg"
          alt=""
        />
      </nut-swiper-item>
      <nut-swiper-item>
        <img
          class="w-full h-full"
          src="https://storage.360buyimg.com/jdc-article/fristfabu.jpg"
          alt=""
        />
      </nut-swiper-item>
    </nut-swiper>
    <nut-cell title="消息" @click="onGoNotify">
      <template #icon>
        <nut-badge :value="8">
          <IconFont name="notice" />
        </nut-badge>
      </template>
    </nut-cell>
    <nut-cell title="打卡">
      <template #icon>
        <Date />
      </template>
    </nut-cell>
    <nut-cell title="流程">
      <template #icon>
        <Share />
      </template>
    </nut-cell>
    <nut-cell title="其他事项">
      <template #icon>
        <Order />
      </template>
    </nut-cell>
  </basic-layout>
</template>

<script setup lang="ts">
import { Date, Share, Order, IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'

const activeNo = ref(0)

function onGoNotify() {
  Taro.navigateTo({
    url: '/pages/notify/index'
  })
}
</script>
