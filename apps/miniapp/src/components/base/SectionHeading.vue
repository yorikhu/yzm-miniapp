<template>
  <view class="section-heading">
    <view>
      <text v-if="eyebrow" class="section-heading__eyebrow">{{ eyebrow }}</text>
      <view class="section-heading__title-row">
        <text class="section-heading__title">{{ title }}</text>
      </view>
    </view>
    <text v-if="action" class="section-heading__action" @click="$emit('action')"
      >{{ action }} ›</text
    >
  </view>
</template>

<script setup lang="ts">
/**
 * 通用分区标题组件，展示主标题、眉标和可选操作入口。
 */
defineProps<{ title: string; eyebrow?: string; action?: string }>();
defineEmits<{ action: [] }>();
</script>

<style scoped>
.section-heading {
  display: flex;
  margin-bottom: 24rpx;
  align-items: flex-end;
  justify-content: space-between;
}

.section-heading__eyebrow {
  display: block;
  margin-bottom: 10rpx;
  color: var(--yzm-gold);
  font-size: 18rpx;
  letter-spacing: 4rpx;
}

.section-heading__title {
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 36rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
}

.section-heading__action {
  padding: 10rpx 0;
  color: var(--yzm-ink-soft);
  font-size: 24rpx;
}
</style>
