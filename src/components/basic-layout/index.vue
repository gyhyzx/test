<template>
  <nut-config-provider :theme="theme">
    <view>
      <slot />
    </view>
  </nut-config-provider>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store/modules/theme'

const themeStore = useThemeStore()

const theme = computed<string>(() => {
  return themeStore.currentTheme
})
</script>
