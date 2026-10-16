<template>
  <view class="page-section">
    <SectionHeading eyebrow="OUR BELIEF" title="我选择的生活" />
    <YzmCard>
      <view class="belief-list">
        <view v-for="item in beliefs" :key="item.index" class="belief-item">
          <text class="belief-item-index">{{ item.index }}</text>
          <text class="belief-item-title">{{ item.title }}</text>
          <text class="belief-item-text">{{ item.text }}</text>
        </view>
      </view>
    </YzmCard>
  </view>
</template>

<script setup lang="ts">
/**
 * 品牌信念组件，展示韵盏茗的三项核心价值。
 */
import SectionHeading from '@/components/base/SectionHeading.vue';
import YzmCard from '@/components/base/YzmCard.vue';

const beliefs = [
  { title: '在浮躁中寻得一份净土', text: '在这个物资最为丰沛，却也是膨胀、焦虑的时代' },
  {
    title: '不被情绪裹挟，用平静的心态面对生活',
    text: '看见情绪，也看见事实，用平静的心态回应生活。',
  },
  { title: '做一个充满爱和善意的人', text: '对自己柔软，对他人真诚，让善意成为主动选择。' },
];
</script>

<style scoped>
.belief-list {
  display: flex;
  padding: 28rpx 26rpx;
  flex-direction: column;
}

.belief-item {
  padding: 22rpx 0;
}

.belief-item + .belief-item {
  border-top: 1rpx solid rgba(21, 94, 80, 0.1);
}

.belief-item-index,
.belief-item-title,
.belief-item-text {
  display: block;
}

.belief-item-index {
  color: var(--yzm-gold);
  font-family: Georgia, serif;
  font-size: 22rpx;
}

.belief-item-title {
  margin-top: 16rpx;
  font-size: 27rpx;
  font-weight: 650;
}

.belief-item-text {
  margin-top: 14rpx;
  color: var(--yzm-muted);
  font-size: 20rpx;
  line-height: 1.7;
}
</style>
