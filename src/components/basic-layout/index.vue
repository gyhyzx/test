<template>
  <nut-config-provider :theme="theme">
    <slot />
  </nut-config-provider>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()

const theme = computed<string>(() => {
  return themeStore.currentTheme
})
</script>
