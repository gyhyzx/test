<template>
  <nut-config-provider :theme="theme" :theme-vars="themeVars">
    <slot />
  </nut-config-provider>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()

const theme = computed<string>(() => {
  return themeStore.currentTheme
})

const themeVars = reactive({
  searchbarInputBackground: '@commonBgColor',
  tabsTitlesItemColor: '@commonTxtColor',
  tabsTitlesBackgroundColor: '@specialBgColor',
  tabsTitlesItemActiveColor: '@specialBgColor',
  collapseWrapperContentBackgroundColor: '@specialBgColor'
})
</script>
