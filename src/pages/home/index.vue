<template>
  <basic-layout class="mx-4 pt-2 box-border">
    <nut-swiper
      :init-page="activeNo"
      :loop="true"
      auto-play="3000"
      direction="vertical"
      class="h-300"
      :pagination-visible="true"
    >
      <nut-swiper-item v-for="(item, index) in swiperList" :key="index">
        <img class="w-full h-full" :src="item" alt="" />
      </nut-swiper-item>
    </nut-swiper>
    <menu-list class="mt-4" />
  </basic-layout>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro'

definePageConfig({
  navigationBarTitleText: '首页'
})

const activeNo = ref<number>(0)

const swiperList = reactive<Array<string>>([
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
])

// 进到首页请求未读消息数设置角标
onMounted(async () => {
  Taro.setTabBarBadge({
    index: 1,
    text: '8'
  })
})
</script>
