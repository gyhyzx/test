<template>
  <basic-layout>
    <custom-list
      ref="customListRef"
      placeholder="输入事项标题搜索..."
      :extra-params="{ serviceType: 'site_matter' }"
      :query-fn="getScenePageApi"
      :search-fields="['title']"
      @add="onAdd"
      @list="onList"
      @concat="onConcat"
    >
      <template #list>
        <nut-swipe-group lock>
          <nut-swipe v-for="item in sceneList" :key="item.id" :name="item.id">
            <nut-cell :title="item.title" :sub-title="item.description" />
            <template #right>
              <nut-button
                shape="square"
                style="height: 100%"
                type="info"
                @click="onUpdate(item)"
                >修改</nut-button
              >
              <nut-button
                shape="square"
                style="height: 100%"
                type="danger"
                @click="onDel(item)"
                >删除</nut-button
              >
            </template>
          </nut-swipe>
        </nut-swipe-group>
      </template>
    </custom-list>
    <nut-action-sheet v-model:visible="visible" :title="title">
      <nut-form>
        <nut-form-item label="标题">
          <nut-input
            v-model="formData.title"
            class="nut-input-text"
            type="text"
          />
        </nut-form-item>
        <nut-form-item label="类型">
          <nut-input
            v-model="formData.type"
            class="nut-input-text"
            type="text"
          />
        </nut-form-item>
        <nut-form-item label="描述">
          <nut-input
            v-model="formData.description"
            class="nut-input-text"
            type="text"
          />
        </nut-form-item>
        <nut-form-item label="纬度">
          <nut-input-number
            v-model="formData.latitude"
            :min="-180"
            :max="180"
            :decimal-places="5"
            :input-width="80"
            :button-size="20"
            :disabled="isEdit"
          />
        </nut-form-item>
        <nut-form-item label="经度">
          <nut-input-number
            v-model="formData.longitude"
            :min="-180"
            :max="180"
            :decimal-places="5"
            :input-width="80"
            :button-size="20"
            :disabled="isEdit"
          />
        </nut-form-item>
        <nut-form-item label="拍摄">
          <upload-img
            :gid="formData.fileGid"
            :extra-params="{
              businessKey: 'site_matter_records',
              scopeId: projectId
            }"
            :limit="4"
            @success="
              (val: string) => {
                formData.fileGid = val
              }
            "
          />
        </nut-form-item>
        <nut-cell class="flex justify-end">
          <nut-button type="primary" size="small" @click="onSubmit"
            >提交</nut-button
          >
        </nut-cell>
      </nut-form>
    </nut-action-sheet>
  </basic-layout>
</template>

<script setup lang="ts">
import { SceneInfo, getScenePageApi } from '@/busPackage/api/scene'
import { AddressInfo } from '@/busPackage/utils/address'
import { useRouter } from '@tarojs/taro'

definePageConfig({
  navigationBarTitleText: '现场事项'
})

const customListRef = ref()

// 现场事项列表展示
const sceneList = ref<SceneInfo[]>([])
const onList = (list: SceneInfo[]) => {
  sceneList.value = list
}
const onConcat = (list: SceneInfo[]) => {
  sceneList.value = _.concat(sceneList.value, list)
}

// 现场事项crud
const formData = ref<SceneInfo>({
  serviceType: 'site_matter'
})
const visible = ref<boolean>(false)
const title = ref<string>('')
async function onSubmit() {
  // 有id编辑
  if (formData.value.id) {
    await updateSceneApi(formData.value)
  } else {
    await saveSceneApi(formData.value)
  }
  formData.value = {}
  visible.value = false
  await customListRef.value.beforeQuery()
}

const isEdit = ref<boolean>(false)
async function onAdd() {
  formData.value = {
    serviceType: 'site_matter'
  }
  title.value = '新增事项'
  isEdit.value = false
  visible.value = true
  const res: AddressInfo = await getAddress()
  _.assign(formData.value, res)
}

function onUpdate(item: SceneInfo) {
  formData.value = item
  title.value = '编辑事项'
  isEdit.value = true
  visible.value = true
}

async function onDel(item: SceneInfo) {
  await delSceneApi(item.id!)
  await customListRef.value.beforeQuery()
}

// 上传文件
const { params } = useRouter()
const projectId = params.projectId
</script>
