<template>
  <view>
    <nut-button type="primary" @click="onClick">测试</nut-button>
    <nut-action-sheet v-model:visible="visible" title="测试">
      <nut-form>
        <nut-form-item label="拍摄">
          <nut-grid :column-num="2" :border="false">
            <nut-grid-item v-for="item in fileList" :key="item.id">
              <nut-badge :color="'#ffffff'">
                <template #icon>
                  <CircleClose />
                </template>
                <img class="w-200 h-200" :src="item.sts" alt="" />
              </nut-badge>
            </nut-grid-item>
            <nut-grid-item>
              <nut-uploader url=""></nut-uploader>
            </nut-grid-item>
          </nut-grid>
        </nut-form-item>
      </nut-form>
    </nut-action-sheet>
  </view>
</template>

<script setup lang="ts">
import { CircleClose } from '@nutui/icons-vue-taro'

definePageConfig({
  navigationBarTitleText: '首页'
})

export interface FileInfo {
  id?: string
  sts?: string
}

const fileList = ref<FileInfo[]>([])
const visible = ref<boolean>(false)
const onClick = () => {
  visible.value = true
}
</script>
