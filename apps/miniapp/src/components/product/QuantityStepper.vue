<template>
  <view class="stepper">
    <text class="stepper-button" @click="$emit('update:modelValue', Math.max(1, modelValue - 1))"
      >−</text
    >
    <text class="stepper-value">{{ modelValue }}</text>
    <text class="stepper-button" @click="$emit('update:modelValue', modelValue + 1)">＋</text>
  </view>
</template>

<script setup lang="ts">
/**
 * 商品数量步进器组件，用于增减数量并确保最小值为 1。
 */
defineProps<{ modelValue: number }>();
defineEmits<{ 'update:modelValue': [value: number] }>();
</script>

<style scoped>
.stepper {
  display: inline-flex;
  overflow: hidden;
  height: 60rpx;
  align-items: center;
  border: 1rpx solid var(--yzm-line);
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.4);
}

.stepper-button,
.stepper-value {
  min-width: 58rpx;
  line-height: 58rpx;
  text-align: center;
}

.stepper-button {
  color: var(--yzm-ink-soft);
  font-family: Arial, sans-serif;
  font-size: 28rpx;
}

.stepper-value {
  min-width: 48rpx;
  font-size: 25rpx;
}
</style>
