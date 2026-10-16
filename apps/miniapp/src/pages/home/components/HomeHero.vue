<template>
  <view class="hero">
    <view class="hero-actions">
      <YzmButton @click="$emit('shop')">选一盏茶</YzmButton>
      <YzmButton variant="outline" @click="$emit('practice')">开始静心</YzmButton>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 首页主视觉组件，提供通往商城和静心练习的主要入口。
 */
import YzmButton from '@/components/base/YzmButton.vue';
defineEmits<{ shop: []; practice: [] }>();
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: 48rpx 38rpx;
  border: 1rpx solid rgba(21, 94, 80, 0.08);
  border-radius: 30rpx;
  background:
    radial-gradient(circle at 90% 18%, rgba(21, 94, 80, 0.11), transparent 34%),
    linear-gradient(145deg, #fffdf8 0%, #f7f4ec 58%, #edf1e8 100%);
  box-shadow: 0 18rpx 52rpx rgba(32, 66, 57, 0.06);
}

.hero-actions {
  display: flex;
  gap: 14rpx;
}

.hero-actions :deep(.yzm-button) {
  min-height: 76rpx;
  padding: 0 28rpx;
  font-size: 24rpx;
}
</style>
