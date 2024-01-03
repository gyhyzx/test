<template>
  <view class="h-full">
    <nut-row :gutter="10">
      <nut-col :span="21">
        <nut-searchbar
          v-if="hasSearch"
          v-model="val"
          :placeholder="placeholder"
          @search="onSearch"
          @clear="onClear"
        >
          <template #rightin>
            <slot name="rightin">
              <Search />
            </slot>
          </template>
        </nut-searchbar>
      </nut-col>
      <nut-col v-if="hasAdd" :span="3" class="py-3.25">
        <slot name="add">
          <Uploader @click="onAdd" />
        </slot>
      </nut-col>
    </nut-row>
    <view
      class="overflow-y-auto"
      :style="{ height: hasSearch ? 'calc(100% - 50px)' : '100%' }"
    >
      <scroll-view :scroll-y="true" class="h-full" @scrolltolower="lower">
        <slot name="list" />
        <nut-divider
          v-if="hasPagination && Number(pageTotal) !== pageParams.page"
          dashed
        >
          <IconFont name="loading" />加载更多
        </nut-divider>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { PageParams, Recordable, RespPageBean } from '@/api'
import { Search, Uploader, IconFont } from '@nutui/icons-vue-taro'

const props = defineProps({
  hasSearch: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  hasAdd: {
    type: Boolean,
    default: true
  },
  hasPagination: {
    type: Boolean,
    default: true
  },
  extraParams: {
    type: Object,
    default: () => ({})
  },
  queryFn: {
    type: Function,
    required: true
  },
  searchFields: {
    type: Array<string>,
    default: () => []
  }
})

const emits = defineEmits(['add', 'list', 'concat'])

const val = ref<string>('') // 搜索栏
const onAdd = () => {
  emits('add')
}

const pageTotal = ref<number>(1) // 总页数
// 分页参数
const pageParams = ref<PageParams>({
  page: 1,
  size: 10
})
const params = ref<Recordable>({}) // query参数

// list数据
const listData = ref<Recordable[] | RespPageBean>([])

async function getListData(type: 'list' | 'concat') {
  listData.value = await props.queryFn(params.value)
  // 如果带分页，只返回records
  if (props.hasPagination) {
    pageTotal.value = (listData.value as RespPageBean).pages
    emits(type, (listData.value as RespPageBean).records)
  } else {
    emits(type, listData.value)
  }
}

async function beforeQuery() {
  // 搜索前如果带分页则重置分页参数，set入params
  if (props.hasPagination) {
    pageParams.value.page = 1
    _.assign(params.value, pageParams.value)
  }
  await getListData('list')
}

const onSearch = async () => {
  // 拼接查询参数
  if (val.value) {
    _.map(props.searchFields, (item) => {
      _.set(params.value, item, val)
    })
  }
  await beforeQuery()
}

const onClear = async () => {
  // 去除查询参数
  params.value = _.omit(params.value, props.searchFields)
  await beforeQuery()
}

const time = ref()
// 滚动到底部事件
async function lower() {
  // 防抖处理
  clearTimeout(time.value)
  time.value = setTimeout(async () => {
    // 当前页小于总页数才查下一页
    if (pageParams.value.page < pageTotal.value) {
      pageParams.value.page += 1
      _.assign(params.value, pageParams.value)
      await getListData('concat')
    }
  }, 500)
}

onMounted(async () => {
  // 拼接额外的查询参数
  _.assign(params.value, props.extraParams)
  // 拼接分页参数
  _.assign(params.value, pageParams.value)
  await getListData('list')
})

defineExpose({
  beforeQuery
})
</script>
