<template>
  <view class="page-section">
    <SectionHeading eyebrow="CRAFT" title="滇红的四道工序" />
    <view class="craft-list">
      <view v-for="(step, index) in steps" :key="step.title" class="craft-item">
        <view class="craft-item-number">0{{ index + 1 }}</view>
        <view class="craft-item-line" />
        <view class="craft-item-body">
          <text class="craft-item-title">{{ step.title }}</text>
          <text class="craft-item-text">{{ step.text }}</text>
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
  { title: '萎凋', text: '鲜叶均匀摊放，适度散失水分，叶质由脆转柔。' },
  { title: '揉捻', text: '揉卷叶片、破损细胞，使茶汁溢出并塑造紧结条索。' },
  { title: '发酵', text: '控制温湿度，促使多酚氧化，形成滇红的红汤与甜香。' },
  { title: '干燥', text: '以高温制止发酵并散失水分，固定茶叶的色、香、味。' },
];
</script>

<style scoped>
.craft-list {
  padding: 12rpx 8rpx 0;
}

.craft-item {
  display: grid;
  min-height: 138rpx;
  grid-template-columns: 54rpx 22rpx 1fr;
  column-gap: 14rpx;
}

.craft-item:last-child {
  min-height: auto;
}

.craft-item-number {
  color: var(--yzm-gold);
  font-family: Georgia, serif;
  font-size: 23rpx;
  line-height: 1;
}

.craft-item-line {
  position: relative;
  height: 100%;
}

.craft-item-line::before {
  position: absolute;
  top: 0;
  left: 2rpx;
  z-index: 1;
  width: 16rpx;
  height: 16rpx;
  border: 3rpx solid var(--yzm-jade);
  border-radius: 50%;
  background: var(--yzm-paper);
  box-shadow: 0 0 0 5rpx rgba(21, 94, 80, 0.06);
  content: '';
}

.craft-item-line::after {
  position: absolute;
  top: 24rpx;
  bottom: 0;
  left: 11rpx;
  width: 2rpx;
  background: rgba(21, 94, 80, 0.14);
  content: '';
}

.craft-item:last-child .craft-item-line::after {
  display: none;
}

.craft-item-title,
.craft-item-text {
  display: block;
}

.craft-item-title {
  font-size: 28rpx;
  font-weight: 650;
  line-height: 1;
}

.craft-item-text {
  margin-top: 14rpx;
  padding-bottom: 32rpx;
  color: var(--yzm-muted);
  font-size: 21rpx;
  line-height: 1.65;
}

.craft-item:last-child .craft-item-text {
  padding-bottom: 0;
}
</style>
