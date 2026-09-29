<template>
  <view class="hero">
    <view class="hero-backdrop">
      <view class="hero-sun" />
      <view class="hero-ridge hero-ridge-back" />
      <view class="hero-ridge hero-ridge-front" />
    </view>
    <view class="hero-copy">
      <text class="hero-eyebrow">身心有栖 · 茶中见己</text>
      <text class="hero-title">一盏茶，安顿身心</text>
      <text class="hero-description">从景迈山的一片叶子出发，练习温柔而坚定地面对生活。</text>
      <view class="hero-actions">
        <YzmButton @click="$emit('shop')">选一盏茶</YzmButton>
        <YzmButton variant="outline" @click="$emit('practice')">开始静心</YzmButton>
      </view>
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
  min-height: 444rpx;
  padding: 48rpx 38rpx 38rpx;
  border: 1rpx solid rgba(21, 94, 80, 0.08);
  border-radius: 30rpx;
  background:
    radial-gradient(circle at 90% 18%, rgba(21, 94, 80, 0.11), transparent 34%),
    linear-gradient(145deg, #fffdf8 0%, #f7f4ec 58%, #edf1e8 100%);
  box-shadow: 0 18rpx 52rpx rgba(32, 66, 57, 0.06);
}

.hero::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1rpx;
  background: linear-gradient(90deg, transparent, rgba(169, 111, 43, 0.34), transparent);
  content: '';
}

.hero-backdrop {
  position: absolute;
  top: 0;
  right: 0;
  width: 360rpx;
  height: 100%;
  pointer-events: none;
}

.hero-sun {
  position: absolute;
  top: 48rpx;
  right: 58rpx;
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  background: rgba(169, 111, 43, 0.11);
  box-shadow: 0 0 0 24rpx rgba(255, 253, 248, 0.34);
}

.hero-ridge {
  position: absolute;
  right: -108rpx;
  width: 420rpx;
  border-top: 1rpx solid rgba(21, 94, 80, 0.18);
  border-radius: 50%;
  transform: rotate(-12deg);
}

.hero-ridge-back {
  bottom: 130rpx;
  height: 190rpx;
  opacity: 0.55;
}

.hero-ridge-front {
  right: -72rpx;
  bottom: 42rpx;
  width: 470rpx;
  height: 220rpx;
  border-top-color: rgba(21, 94, 80, 0.12);
  transform: rotate(-7deg);
}

.hero-copy {
  position: relative;
  z-index: 2;
  max-width: 520rpx;
}

.hero-eyebrow,
.hero-title,
.hero-description {
  display: block;
}

.hero-eyebrow {
  color: var(--yzm-gold);
  font-size: 20rpx;
  letter-spacing: 5rpx;
}

.hero-title {
  margin-top: 20rpx;
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 56rpx;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 5rpx;
}

.hero-description {
  max-width: 450rpx;
  margin-top: 22rpx;
  color: var(--yzm-muted);
  font-size: 23rpx;
  line-height: 1.9;
}

.hero-actions {
  display: flex;
  margin-top: 30rpx;
  gap: 14rpx;
}

.hero-actions :deep(.yzm-button) {
  min-height: 76rpx;
  padding: 0 28rpx;
  font-size: 24rpx;
}
</style>
