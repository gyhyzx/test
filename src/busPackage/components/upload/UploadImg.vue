<template>
  <view class="flex flex-wrap justify-between">
    <nut-badge v-for="item in fileList" :key="item.id" :color="'#ffffff'">
      <template #icon>
        <CircleClose @click="onDel(item)" />
      </template>
      <img class="w-200 h-200" :src="item.sts" alt="" />
    </nut-badge>
    <view class="w-200 h-200 bg-#f7f8fa" @click="onUpload">
      <Photograph class="relative left-42% top-42%" />
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro'
import { FileInfo } from '@/busPackage/api/file'
import { CircleClose, Photograph } from '@nutui/icons-vue-taro'
import qs from 'qs'
import { Recordable } from '@/api'

const props = defineProps({
  limit: {
    type: Number,
    default: 9
  },
  gid: {
    type: String,
    default: ''
  },
  extraParams: {
    type: Object,
    default: () => ({})
  },
  url: {
    type: String,
    default: '/file/upload/business_key'
  }
})

const fileList = ref<FileInfo[]>([])

const emits = defineEmits(['success'])

const baseUrl = process.env.TARO_APP_BASE_URL

const serviceName = getServiceName('opmcp')

const gid = ref<string>(uuid())

const extraParams = computed<Recordable>(() => _.assign(props.extraParams, { gid: gid.value }))

const defaultUrl = computed<string>(() => `${props.url}?${qs.stringify(extraParams.value)}`)

function onUpload() {
  Taro.chooseImage({
    count: props.limit,
    success: async (res) => {
      const files = res.tempFilePaths
      if (files.length < 1) return
      const promises = files.map((item) => {
        return new Promise((resolve, reject) => {
          Taro.uploadFile({
            url: baseUrl + serviceName + defaultUrl.value,
            filePath: item,
            name: 'file',
            header: {
              Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lc3BhY2UiOiJpdGVtIiwiZXhwIjoxNjk5MjUzOTIzNDQ3LCJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJ0aW1lc3RhbXAiOjE2OTkyNTM5MjI4NDN9.ufOeHSXqszBvoZRgFAs0K5LjiAyutkC_Wba8qxEKFyM'
            }
          })
            .then((result) => {
              resolve(result)
            })
            .catch((err) => reject(err))
        })
      })
      await Promise.all(promises)
        .then(async () => {
          emits('success', gid.value)
          // 刷新文件列表
          fileList.value = await getFileListByGidApi(gid.value)
        })
        .catch((err) =>
          Taro.showToast({
            title: err
          })
        )
    }
  })
}

const onDel = async (item: FileInfo) => {
  await delFileApi(item.id!)
  fileList.value = await getFileListByGidApi(gid.value)
}

watchEffect(async () => {
  if (props.gid) {
    gid.value = props.gid
    fileList.value = await getFileListByGidApi(gid.value)
  }
})
</script>

<style lang="scss">
.nut-grid-item__content {
  padding: 0 !important;
}
</style>
