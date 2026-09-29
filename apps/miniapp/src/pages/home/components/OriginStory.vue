<template>
  <view class="page-section">
    <SectionHeading eyebrow="ORIGIN" title="一片叶子的来处" />
    <YzmCard>
      <view class="origin__landscape">
        <view class="origin__sun" />
        <view class="origin__mountain origin__mountain--back" />
        <view class="origin__mountain origin__mountain--front" />
        <text class="origin__location">北纬 22.2° · 云南景迈山</text>
      </view>
      <view class="origin__content">
        <text class="origin__title">云海、古林与共生茶园</text>
        <text class="origin__text">
          景迈山保存着古老的林下茶种植传统。茶树与高大乔木、香草和微生物共同生长，形成清晰的山野气韵与花蜜香。
        </text>
        <view class="origin__chips"
          ><text>千年古茶林</text><text>林下共生</text><text>手工采摘</text></view
        >
      </view>
    </YzmCard>
  </view>
</template>

<script setup lang="ts">
/**
 * 品牌起源故事组件，展示韵盏茗的地域与文化背景。
 */
import SectionHeading from '@/components/base/SectionHeading.vue';
import YzmCard from '@/components/base/YzmCard.vue';
</script>

<style scoped>
.origin__landscape {
  position: relative;
  overflow: hidden;
  height: 290rpx;
  background: linear-gradient(180deg, #dbe4d7, #f2e7cd);
}

.origin__sun {
  position: absolute;
  top: 38rpx;
  right: 62rpx;
  width: 82rpx;
  height: 82rpx;
  border-radius: 50%;
  background: rgba(245, 225, 174, 0.85);
}

.origin__mountain {
  position: absolute;
  right: -10%;
  bottom: -120rpx;
  left: -10%;
  height: 290rpx;
  border-radius: 50% 50% 0 0;
  background: #829a80;
  transform: rotate(7deg);
}

.origin__mountain--back {
  bottom: -150rpx;
  background: rgba(95, 126, 101, 0.45);
  transform: rotate(-9deg);
}

.origin__mountain--front {
  right: -28%;
  left: 20%;
  background: #486956;
}

.origin__location {
  position: absolute;
  bottom: 28rpx;
  left: 28rpx;
  color: #fff;
  font-size: 20rpx;
  letter-spacing: 2rpx;
}

.origin__content {
  padding: 28rpx;
}

.origin__title,
.origin__text {
  display: block;
}

.origin__title {
  font-size: 31rpx;
  font-weight: 650;
}

.origin__text {
  margin-top: 15rpx;
  color: var(--yzm-ink-soft);
  font-size: 22rpx;
  line-height: 1.8;
}

.origin__chips {
  display: flex;
  margin-top: 22rpx;
  flex-wrap: wrap;
  gap: 10rpx;
}

.origin__chips text {
  padding: 9rpx 16rpx;
  border-radius: 999rpx;
  color: var(--yzm-jade-dark);
  background: rgba(23, 107, 89, 0.08);
  font-size: 19rpx;
}
</style>
