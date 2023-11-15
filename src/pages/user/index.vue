<template>
  <view>
    <nut-form>
      <nut-form-item label="头像" body-align="right">
        <nut-avatar size="normal">
          <img
            src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
          />
        </nut-avatar>
      </nut-form-item>
      <nut-form-item label="昵称">
        <nut-input
          v-model="user.username"
          class="nut-input-text"
          input-align="right"
          readonly
        />
      </nut-form-item>
    </nut-form>
  </view>
</template>

<script setup lang="ts">
const user: Record<string, string> = reactive({
  avatar: '',
  username: '啦啦啦'
})
</script>
