<template>
  <basic-layout>
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
    <nut-grid :border="false" :clickable="true">
      <nut-grid-item
        v-for="(item, index) in menus"
        :key="index"
        :text="item.description"
      >
        <nut-badge :value="item.value" @click="onClickMenu(item)">
          <nut-avatar size="large" shape="square" :bg-color="'@commonBgColor'">
            <img :src="item.src" alt="" />
          </nut-avatar>
        </nut-badge>
      </nut-grid-item>
    </nut-grid>
  </basic-layout>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro'
import { menus, MenuInfo } from '@/api/menu'

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

function onClickMenu(item: MenuInfo) {
  Taro.navigateTo({
    url: item.path
  })
}
</script>
