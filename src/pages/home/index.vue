<template>
  <basic-layout class="mx-2 pt-4 box-border">
    <custom-list
      placeholder="输入项目名称搜索..."
      :has-add="false"
      :search-fields="['name']"
      :query-fn="getProjectPageApi"
      @list="onList"
      @concat="onConcat"
    >
      <template #list>
        <nut-row
          v-for="item in projectList"
          :key="item.id"
          class="my-2 h-180 w-full shadow-md rounded-md"
          :gutter="10"
          @click="onGoProjectDetail(item)"
        >
          <nut-col :span="10" class="h-full">
            <img :src="item.coverUrl" alt="" class="h-full w-full" />
          </nut-col>
          <nut-col :span="14" class="relative h-full">
            <span class="custom-title">{{ item.name }}</span>
            <span class="font-light text-xs opacity-70 custom-content">{{
              item.content
            }}</span>
            <span
              class="font-light text-xs opacity-90 absolute bottom-0 right-0"
              >{{ item.startTime }}</span
            >
          </nut-col>
        </nut-row>
      </template>
    </custom-list>
  </basic-layout>
</template>

<script setup lang="ts">
import { ProjectInfo, getProjectPageApi } from '@/api/project'
import Taro from '@tarojs/taro'

definePageConfig({
  navigationBarTitleText: '首页'
})

// 进到首页请求未读消息数设置角标
onMounted(async () => {
  Taro.setTabBarBadge({
    index: 1,
    text: '8'
  })
})

// 项目列表显示
const projectList = ref<ProjectInfo[]>([])
const onList = (list: ProjectInfo[]) => {
  projectList.value = list
}
const onConcat = (list: ProjectInfo[]) => {
  projectList.value = _.concat(projectList.value, list)
}
function onGoProjectDetail(item: ProjectInfo) {
  Taro.navigateTo({
    url: `/busPackage/pages/project/detail?projectId=${item.id}`
  })
}
</script>

<style lang="scss">
.custom-title {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.custom-content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
