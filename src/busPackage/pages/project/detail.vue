<template>
  <basic-layout>
    <nut-tabs v-model="activeNo" type="smile" auto-height>
      <nut-tab-pane title="基本信息" pane-key="1">
        <nut-form>
          <nut-form-item label="项目名称" :label-width="70">
            {{ projectInfo.name }}
          </nut-form-item>
          <nut-form-item label="建设内容" :label-width="70">
            {{ projectInfo.content }}
          </nut-form-item>
          <nut-form-item label="建设地址" :label-width="70">
            {{ projectInfo.address }}
          </nut-form-item>
          <nut-form-item label="开工时间" :label-width="70">
            {{ timeFormat(projectInfo.startTime, 'YYYY-MM-DD') }}
          </nut-form-item>
        </nut-form>
      </nut-tab-pane>
    </nut-tabs>
    <nut-cell
      v-for="item in businessList"
      :key="item.title"
      :title="item.title"
      @click="onClick(item.url, item.params)"
    >
      <template #icon>
        <IconFont :name="item.icon" />
      </template>
      <template #link>
        <RectRight />
      </template>
    </nut-cell>
  </basic-layout>
</template>

<script setup lang="ts">
import { ProjectInfo } from '@/api/project'
import { useRouter } from '@tarojs/taro'
import { timeFormat } from '@/busPackage/utils/format'
import { RectRight, IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import { Recordable } from '@/api'
import qs from 'qs'

definePageConfig({
  navigationBarTitleText: '项目详情'
})

const activeNo = ref<string>('1')

const { params } = useRouter()
const projectId = params.projectId

const projectInfo = ref<ProjectInfo>({})

onMounted(async () => {
  projectInfo.value = await getProjectInfoApi(projectId!)
})

const businessList: Recordable[] = [
  {
    title: '监控管理',
    url: '/busPackage/pages/video/index',
    icon: 'eye',
    params: {}
  },
  {
    title: '现场事项',
    url: '/busPackage/pages/scene/index',
    icon: 'location2',
    params: { projectId: projectId }
  },
  {
    title: '投资管控',
    url: '',
    icon: 'horizontal',
    params: {}
  }
]

const onClick = (url: string, params?: Recordable) => {
  Taro.navigateTo({
    url: `${url}?${qs.stringify(params)}`
  })
}
</script>

<style lang="scss">
.nut-tab-pane {
  padding: 0;
}
</style>
