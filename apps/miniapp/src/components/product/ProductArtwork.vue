<template>
  <view class="artwork" :class="`artwork-${tone}`">
    <view class="artwork-sun" />
    <view class="artwork-leaf artwork-leaf-one" />
    <view class="artwork-leaf artwork-leaf-two" />
    <view class="artwork-jar">
      <text class="artwork-seal">{{ name.slice(0, 1) }}</text>
    </view>
    <text class="artwork-caption">YZM · TEA</text>
  </view>
</template>

<script setup lang="ts">
/**
 * 茶品艺术图组件，根据色调和品名绘制商品占位视觉。
 */
import type { ArtworkTone } from '@/types';

defineProps<{ tone: ArtworkTone; name: string }>();
</script>

<style scoped>
.artwork {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 180rpx;
  border-radius: 24rpx;
  background: linear-gradient(145deg, #ede0c4, #c78f49);
}

.artwork-jade {
  background: linear-gradient(145deg, #dbe9d4, #7d9d78);
}

.artwork-mist {
  background: linear-gradient(145deg, #f0eee6, #b8c1b5);
}

.artwork-earth {
  background: linear-gradient(145deg, #d6c6ad, #755840);
}

.artwork-rose {
  background: linear-gradient(145deg, #f0d9d0, #b97870);
}

.artwork-sun {
  position: absolute;
  top: 18rpx;
  right: 18rpx;
  width: 54rpx;
  height: 54rpx;
  border-radius: 50%;
  background: rgba(255, 248, 220, 0.52);
}

.artwork-leaf {
  position: absolute;
  width: 110rpx;
  height: 52rpx;
  border-radius: 100% 0 100% 0;
  background: rgba(23, 63, 56, 0.58);
  transform: rotate(-26deg);
}

.artwork-leaf-one {
  right: -20rpx;
  bottom: 32rpx;
}

.artwork-leaf-two {
  right: 34rpx;
  bottom: -8rpx;
  transform: rotate(18deg) scale(0.75);
}

.artwork-jar {
  position: absolute;
  bottom: 28rpx;
  left: 24rpx;
  display: flex;
  width: 86rpx;
  height: 112rpx;
  align-items: center;
  justify-content: center;
  border: 2rpx solid rgba(255, 255, 255, 0.75);
  border-radius: 18rpx 18rpx 24rpx 24rpx;
  background: rgba(250, 245, 231, 0.74);
  box-shadow: 0 10rpx 22rpx rgba(48, 39, 25, 0.12);
}

.artwork-seal {
  color: var(--yzm-ink);
  font-size: 42rpx;
  font-weight: 650;
}

.artwork-caption {
  position: absolute;
  top: 22rpx;
  left: 22rpx;
  color: rgba(23, 63, 56, 0.68);
  font-family: Georgia, serif;
  font-size: 13rpx;
  letter-spacing: 2rpx;
}
</style>
