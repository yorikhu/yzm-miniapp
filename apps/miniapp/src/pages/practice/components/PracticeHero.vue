<template>
  <view class="practice-hero paper-texture">
    <text class="practice-hero-eyebrow">一盏三心</text>
    <text class="practice-hero-title">茶心 · 正念心 · 冥想心</text>
    <text class="practice-hero-text"
      >以一盏茶为锚点，从感官、呼吸与觉察开始，建立可重复的日常练习。</text
    >
    <view class="practice-hero-rings"><view /><view /><view /></view>
  </view>
</template>

<script setup lang="ts">
/**
 * 静心练习页主视觉组件，传达页面主题与引导文案。
 */
</script>

<style scoped>
.practice-hero {
  position: relative;
  overflow: hidden;
  min-height: 300rpx;
  padding: 42rpx 34rpx;
  border-radius: 32rpx;
  color: #fffdf5;
  background-color: var(--yzm-ink);
  box-shadow: var(--yzm-shadow);
}

.practice-hero-eyebrow,
.practice-hero-title,
.practice-hero-text {
  position: relative;
  z-index: 2;
  display: block;
  max-width: 520rpx;
}

.practice-hero-eyebrow {
  color: #d9b976;
  font-size: 20rpx;
  letter-spacing: 5rpx;
}

.practice-hero-title {
  margin-top: 16rpx;
  font-size: 37rpx;
  font-weight: 650;
}

.practice-hero-text {
  margin-top: 18rpx;
  color: rgba(255, 255, 255, 0.68);
  font-size: 22rpx;
  line-height: 1.75;
}

.practice-hero-rings {
  position: absolute;
  top: 26rpx;
  right: 16rpx;
  width: 220rpx;
  height: 220rpx;
}

.practice-hero-rings view {
  position: absolute;
  inset: 0;
  border: 1rpx solid rgba(217, 185, 118, 0.28);
  border-radius: 50%;
}

.practice-hero-rings view:nth-child(2) {
  inset: 38rpx;
}

.practice-hero-rings view:nth-child(3) {
  inset: 76rpx;
  background: rgba(217, 185, 118, 0.12);
}
</style>
