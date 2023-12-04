<template>
  <nut-grid :border="false" :clickable="true">
    <nut-grid-item
      v-for="(item, index) in menus"
      :key="index"
      :text="item.description"
    >
      <nut-avatar :bg-color="'@commonBgColor'" @click="onClickMenu(item)">
        <img :src="item.src" alt="" />
      </nut-avatar>
    </nut-grid-item>
  </nut-grid>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro'
import { menus, MenuInfo } from '@/api/menu'

function onClickMenu(item: MenuInfo) {
  Taro.navigateTo({
    url: item.path
  })
}
</script>
