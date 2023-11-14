<template>
  <view>
    <router-view />
    <nut-tabbar
      v-model="active"
      bottom
      safe-area-inset-bottom
      @tab-switch="onTabSwitch"
    >
      <nut-tabbar-item
        v-for="item in menu.children"
        :key="item.path"
        :tab-title="item.title"
        :icon="item.icon"
        :name="item.name"
      >
      </nut-tabbar-item>
    </nut-tabbar>
  </view>
</template>

<script setup lang="ts">
import { menus } from '@/api/menu'

const menu = menus[0]

const active = ref('Home')

const router = useRouter()

function onTabSwitch(data: any) {
  router.push({ name: data.name })
}
</script>
