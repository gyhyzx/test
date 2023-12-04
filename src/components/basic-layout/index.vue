<template>
  <nut-config-provider :theme="theme">
    <view class="h-full">
      <slot />
    </view>
  </nut-config-provider>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()

const theme = computed<string>(() => {
  return themeStore.currentTheme
})
</script>
