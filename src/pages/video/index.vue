<template>
  <basic-layout>
    <Video
      id="video"
      class="w-full"
      :src="videoSrc"
      :controls="true"
      :autoplay="true"
      :mobilenet-hint-type="1"
    />
    <view class="mt-5">
      <nut-grid :border="false" :clickable="true">
        <nut-grid-item
          v-for="(item, index) in videos"
          :key="index"
          :text="item.name"
          @click="onPlayVideo(item)"
        >
          <nut-avatar size="large" shape="square" :bg-color="'@commonBgColor'">
            <img :src="item.src" alt="" />
          </nut-avatar>
        </nut-grid-item>
      </nut-grid>
    </view>
  </basic-layout>
</template>

<script setup lang="ts">
import { Video } from '@tarojs/components'
import { VideoInfo, videos } from '@/api/video'

definePageConfig({
  navigationBarTitleText: '监控'
})

const videoSrc = ref<string>('')

function onPlayVideo(item: VideoInfo) {
  videoSrc.value = item.stream
}
</script>
