<template>
  <basic-layout>
    <nut-cell title="选择打卡类型">
      <template #link>
        <nut-radio-group
          v-model="searchParams.radioVal"
          direction="horizontal"
          @change="onSearch"
        >
          <nut-radio label="1">定位打卡</nut-radio>
          <nut-radio label="2">二维码打卡</nut-radio>
        </nut-radio-group>
      </template>
    </nut-cell>
    <nut-cell
      title="选择日期范围"
      :desc="
        searchParams.date && searchParams.date[0]
          ? `${searchParams.date[0]}至${searchParams.date[1]}`
          : '请选择'
      "
      @click="isVisible = true"
    >
    </nut-cell>
    <nut-calendar
      v-model:visible="isVisible"
      :default-value="searchParams.date"
      type="range"
      :start-date="moment().startOf('year').format('YYYY-MM-DD')"
      :end-date="moment().format('YYYY-MM-DD')"
      :is-auto-back-fill="true"
      @choose="setChooseValue"
      @close="onSearch"
    >
    </nut-calendar>
    <nut-divider />
    <view class="box-border flex justify-end px-2">
      <nut-button type="success" shape="square">导出数据</nut-button>
    </view>
    <nut-table
      class="p-2 box-border h-840 overflow-y-auto"
      :columns="columns"
      :data="tableData"
    ></nut-table>
    <nut-pagination
      v-model="page"
      class="flex justify-end p-2"
      :total-items="125"
      :show-page-size="3"
      force-ellipses
      @change="pageChange"
    />
  </basic-layout>
</template>

<script setup lang="ts">
import moment from 'moment'

definePageConfig({
  navigationBarTitleText: '打卡记录'
})

const isVisible = ref<boolean>(false)

const searchParams = reactive<Record<string, any>>({
  radioVal: '',
  date: []
})

function setChooseValue(param: any) {
  searchParams.date = [...[param[0][3], param[1][3]]]
}

function onSearch() {}

const columns = reactive<Array<Record<string, any>>>([
  {
    title: '打卡类型',
    key: 'type',
    align: 'center'
  },
  {
    title: '打卡时间',
    key: 'date',
    align: 'center'
  }
])

const tableData = reactive<Array<Record<string, any>>>([
  {
    type: '定位打卡',
    date: '2023-10-02'
  },
  {
    type: '二维码打卡',
    date: '2023-11-01'
  },
  {
    type: '定位打卡',
    date: '2023-11-13'
  },
  {
    type: '定位打卡',
    date: '2023-11-13'
  },
  {
    type: '定位打卡',
    date: '2023-11-13'
  },
  {
    type: '定位打卡',
    date: '2023-11-13'
  },
  {
    type: '定位打卡',
    date: '2023-11-13'
  },
  {
    type: '定位打卡',
    date: '2023-11-13'
  },
  {
    type: '定位打卡',
    date: '2023-11-13'
  },
  {
    type: '定位打卡',
    date: '2023-11-13'
  },
  {
    type: '定位打卡',
    date: '2023-11-13'
  },
  {
    type: '定位打卡',
    date: '2023-11-13'
  },
  {
    type: '定位打卡',
    date: '2023-11-13'
  }
])

const page = ref(1)
const pageChange = (value) => {
  console.log(value)
}
</script>
