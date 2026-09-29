<template>
  <view class="yzm-card" :class="{ 'yzm-card--flat': flat }">
    <slot />
  </view>
</template>

<script setup lang="ts">
/**
 * 通用卡片容器组件，提供统一的边框、圆角和阴影外观。
 */
withDefaults(defineProps<{ flat?: boolean }>(), { flat: false });
</script>

<style scoped>
.yzm-card {
  overflow: hidden;
  border: 1rpx solid var(--yzm-line);
  border-radius: 24rpx;
  background: var(--yzm-paper-light);
  box-shadow: var(--yzm-shadow);
}

.yzm-card--flat {
  box-shadow: none;
}
</style>
