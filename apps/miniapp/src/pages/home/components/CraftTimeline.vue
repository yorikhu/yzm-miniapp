<template>
  <view class="page-section">
    <SectionHeading eyebrow="CRAFT" title="功夫红茶的四道工序" />
    <view class="craft-list">
      <view v-for="(step, index) in steps" :key="step.title" class="craft-item">
        <view class="craft-item__number">0{{ index + 1 }}</view>
        <view class="craft-item__line" />
        <view class="craft-item__body">
          <text class="craft-item__title">{{ step.title }}</text>
          <text class="craft-item__text">{{ step.text }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 制茶工艺时间线组件，按步骤展示茶叶制作过程。
 */
import SectionHeading from '@/components/base/SectionHeading.vue';

const steps = [
  { title: '萎凋', text: '鲜叶在山风中缓慢失水，花香开始苏醒。' },
  { title: '揉捻', text: '以手感知叶片，让茶汁与香气充分交融。' },
  { title: '发酵', text: '控制温湿度，形成红茶温润甜醇的底色。' },
  { title: '慢焙', text: '低温收香，使茶汤稳定、耐泡而有余韵。' },
];
</script>

<style scoped>
.craft-list {
  padding: 10rpx 8rpx;
}

.craft-item {
  display: grid;
  min-height: 126rpx;
  grid-template-columns: 58rpx 20rpx 1fr;
  gap: 12rpx;
}

.craft-item__number {
  color: var(--yzm-gold);
  font-family: Georgia, serif;
  font-size: 23rpx;
}

.craft-item__line {
  position: relative;
  width: 2rpx;
  height: 100%;
  background: var(--yzm-line);
}

.craft-item__line::before {
  position: absolute;
  top: 0;
  left: -6rpx;
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: var(--yzm-jade);
  content: '';
}

.craft-item__title,
.craft-item__text {
  display: block;
}

.craft-item__title {
  font-size: 28rpx;
  font-weight: 650;
}

.craft-item__text {
  margin-top: 8rpx;
  color: var(--yzm-muted);
  font-size: 21rpx;
  line-height: 1.65;
}
</style>
