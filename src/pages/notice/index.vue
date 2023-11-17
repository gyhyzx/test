<template>
  <basic-layout>
    <nut-tabs v-model="active" swipeable type="smile">
      <nut-tab-pane title="未读" pane-key="0"> Tab1 </nut-tab-pane>
      <nut-tab-pane title="已读" pane-key="1"> Tab 2 </nut-tab-pane>
    </nut-tabs>
  </basic-layout>
</template>

<script setup lang="ts">
definePageConfig({
  navigationBarTitleText: '消息'
})

const active = ref<number>(0)
</script>
