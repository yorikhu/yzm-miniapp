<template>
  <view class="hero paper-texture">
    <view class="hero__copy">
      <text class="hero__eyebrow">身心有栖 · 茶中见己</text>
      <text class="hero__title">一盏茶，安顿身心</text>
      <text class="hero__description">从景迈山的一片叶子出发，练习温柔而坚定地面对生活。</text>
      <view class="hero__actions">
        <YzmButton @click="$emit('shop')">选一盏茶</YzmButton>
        <YzmButton variant="outline" @click="$emit('practice')">开始静心</YzmButton>
      </view>
    </view>
    <view class="hero__tea">
      <view class="hero__steam hero__steam--one" />
      <view class="hero__steam hero__steam--two" />
      <view class="hero__cup"><view class="hero__tea-surface" /></view>
      <view class="hero__saucer" />
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
  min-height: 520rpx;
  padding: 64rpx 36rpx 44rpx;
  border: 1rpx solid var(--yzm-line);
  border-radius: 28rpx;
  background-color: var(--yzm-paper-light);
}

.hero__copy {
  position: relative;
  z-index: 2;
  max-width: 520rpx;
}

.hero__eyebrow,
.hero__title,
.hero__description {
  display: block;
}

.hero__eyebrow {
  color: var(--yzm-gold);
  font-size: 20rpx;
  letter-spacing: 5rpx;
}

.hero__title {
  margin-top: 20rpx;
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 56rpx;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 5rpx;
}

.hero__description {
  max-width: 450rpx;
  margin-top: 22rpx;
  color: var(--yzm-muted);
  font-size: 23rpx;
  line-height: 1.9;
}

.hero__actions {
  display: flex;
  margin-top: 38rpx;
  gap: 14rpx;
}

.hero__actions :deep(.yzm-button) {
  min-height: 76rpx;
  padding: 0 28rpx;
  font-size: 24rpx;
}

.hero__tea {
  position: absolute;
  right: -18rpx;
  bottom: 8rpx;
  width: 300rpx;
  height: 260rpx;
  opacity: 0.66;
}

.hero__cup {
  position: absolute;
  right: 50rpx;
  bottom: 34rpx;
  width: 184rpx;
  height: 104rpx;
  border-radius: 20rpx 20rpx 90rpx 90rpx;
  background: linear-gradient(180deg, #f6f0df, #d8dfcf);
}

.hero__tea-surface {
  width: 150rpx;
  height: 24rpx;
  margin: 8rpx auto;
  border-radius: 50%;
  background: #a56a2f;
}

.hero__saucer {
  position: absolute;
  right: 20rpx;
  bottom: 16rpx;
  width: 240rpx;
  height: 34rpx;
  border-radius: 50%;
  background: rgba(71, 100, 83, 0.2);
}

.hero__steam {
  position: absolute;
  bottom: 138rpx;
  width: 28rpx;
  height: 95rpx;
  border-left: 5rpx solid rgba(23, 63, 56, 0.18);
  border-radius: 50%;
  transform: rotate(16deg);
}

.hero__steam--one {
  right: 120rpx;
}

.hero__steam--two {
  right: 165rpx;
  height: 76rpx;
  transform: rotate(-12deg);
}
</style>
