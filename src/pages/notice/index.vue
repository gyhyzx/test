<template>
  <basic-layout>
    <nut-tabs v-model="active" auto-height swipeable type="smile">
      <nut-tab-pane title="未读" pane-key="0">
        <nut-collapse v-model="activeNo" :accordion="true">
          <nut-collapse-item
            v-for="item in notices"
            :key="item.id"
            :name="item.id"
            :value="item.time"
            @click="onChangeStatus(item)"
          >
            <template #title>
              <nut-badge v-if="!item.status" dot>{{ item.title }}</nut-badge>
              <span v-else>{{ item.title }}</span>
            </template>
            {{ item.content }}
          </nut-collapse-item>
        </nut-collapse>
      </nut-tab-pane>
      <nut-tab-pane title="已读" pane-key="1">
        <nut-collapse v-model="secActiveNo" :accordion="true">
          <nut-collapse-item
            v-for="item in secNotices"
            :key="item.id"
            :name="item.id"
            :value="item.time"
            :title="item.title"
            @click="onChangeStatus(item)"
          >
            {{ item.content }}
          </nut-collapse-item>
        </nut-collapse>
      </nut-tab-pane>
    </nut-tabs>
  </basic-layout>
</template>

<script setup lang="ts">
definePageConfig({
  navigationBarTitleText: '消息'
})

const active = ref<number>(0)

const activeNo = ref<number>(0)
const secActiveNo = ref<number>(0)

const notices = reactive<Array<any>>([
  {
    id: 1,
    title: '现场告警',
    content: '现场告警，需要处理',
    status: 0,
    time: '2023-12-04'
  },
  {
    id: 2,
    title: '流程审批',
    content: '费用审批',
    status: 0
  },
  {
    id: 3,
    title: '进度计划通知',
    content: '进度搁置',
    status: 0
  }
])

const secNotices = reactive<Array<any>>([
  {
    id: 1,
    title: '费用报销',
    content: '费用报销',
    status: 0,
    time: '2023-12-04'
  },
  {
    id: 2,
    title: '合同签订情况',
    content: '合同签订未完成',
    status: 0,
    time: '2023-12-21'
  }
])

function onChangeStatus(item: any) {
  item.status = 1
}
</script>

<style lang="scss">
.nut-tab-pane {
  padding: 0;
}
</style>
