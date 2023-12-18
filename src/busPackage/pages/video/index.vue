<template>
  <basic-layout class="h-full">
    <live-player class="w-full" mode="live" :src="videoSrc" :autoplay="true" />
    <nut-tabs
      v-model="value"
      style="height: calc(100% - 230px)"
      type="smile"
      title-scroll
      direction="vertical"
    >
      <nut-tab-pane
        v-for="item in videos"
        :key="item.id"
        :pane-key="item.id"
        :title="item.name"
      >
        <nut-cell-group>
          <nut-cell
            v-for="chi in item.children"
            :key="chi.id"
            :title="chi.name"
            @click="onChangeVideo(chi)"
          />
        </nut-cell-group>
      </nut-tab-pane>
    </nut-tabs>
  </basic-layout>
</template>

<script setup lang="ts">
import { VideoInfo, videos } from '@/busPackage/api/video'

definePageConfig({
  navigationBarTitleText: '监控'
})

const value = ref<string>('1')

const videoSrc = ref<string>('rtmp://mobliestream.c3tv.com:554/live/goodtv.sdp')

function onChangeVideo(item: VideoInfo) {
  console.log(item)
  videoSrc.value = item.stream as string
}
</script>

<style lang="scss">
.nut-tab-pane {
  padding: 0;
}
</style>
