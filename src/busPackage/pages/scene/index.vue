<template>
  <basic-layout class="h-full">
    <nut-navbar title="现场事项" @click-right="onAdd">
      <template #left>
        <Search />
      </template>
      <template #right>
        <Uploader />
      </template>
    </nut-navbar>
    <scroll-view :scroll-y="true" style="height: calc(100% - 64px)">
      <nut-swipe-group lock>
        <nut-swipe v-for="item in list" :key="item.id" :name="item.id">
          <nut-cell :title="item.title" :sub-title="item.description" />
          <template #right>
            <nut-button
              shape="square"
              style="height: 100%"
              type="danger"
              @click="onDel(item)"
              >删除</nut-button
            >
            <nut-button
              shape="square"
              style="height: 100%"
              type="info"
              @click="onUpdate(item)"
              >修改</nut-button
            >
          </template>
        </nut-swipe>
      </nut-swipe-group>
      <nut-button
        v-if="Number(pages) !== pageParams.page"
        :loading="btnLoading"
        block
        plain
        @click="loadMore"
        >加载更多...</nut-button
      >
      <nut-divider
        v-else-if="Number(pages) === pageParams.page && list.length > 10"
        dashed
        >人也是有底线的...</nut-divider
      >
    </scroll-view>
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
        <!-- <nut-form-item label="纬度">
          <nut-input-number
            v-model="formData.latitude"
            class="nut-input-text"
            input-width="80px"
            button-size="20px"
            min="-180"
            max="180"
            decimal-places="5"
            :disabled="isEdit"
          />
        </nut-form-item>
        <nut-form-item label="经度">
          <nut-input-number
            v-model="formData.longitude"
            class="nut-input-text w-full"
            input-width="80px"
            button-size="20px"
            min="-180"
            max="180"
            decimal-places="5"
            :disabled="isEdit"
          />
        </nut-form-item> -->
        <nut-form-item label="拍摄"> </nut-form-item>
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
import { PageParams } from '@/api'
import { SceneInfo } from '@/busPackage/api/scene'
import { Uploader, Search } from '@nutui/icons-vue-taro'
import { AddressInfo } from '@/busPackage/utils/address'

const pages = ref<number>(1)

const pageParams = ref<PageParams>({
  page: 1,
  size: 10,
  serviceType: 'site_matter'
})
const list = ref<SceneInfo[]>([])
async function getSceneList() {
  pageParams.value.page = 1
  const res = await getScenePageApi(pageParams.value)
  pages.value = res.pages
  list.value = res.records
}
onMounted(async () => {
  await getSceneList()
})

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
  await getSceneList()
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
  await getSceneList()
}

const btnLoading = ref<boolean>(false)

async function loadMore() {
  btnLoading.value = true
  pageParams.value.page += 1
  const res = await getScenePageApi(pageParams.value)
  pages.value = res.pages
  list.value = _.concat(list.value, res.records)
  btnLoading.value = false
}
</script>
