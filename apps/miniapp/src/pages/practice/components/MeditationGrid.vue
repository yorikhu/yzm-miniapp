<template>
  <view class="page-section">
    <SectionHeading eyebrow="MEDITATION" title="独立冥想" />
    <view class="meditation-grid">
      <YzmCard v-for="item in meditations" :key="item.title" flat>
        <view class="meditation-card">
          <text class="meditation-card-symbol">{{ item.symbol }}</text>
          <text class="meditation-card-title">{{ item.title }}</text>
          <text class="meditation-card-text">{{ item.text }}</text>
          <text class="meditation-card-meta">{{ item.duration }} ›</text>
        </view>
      </YzmCard>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 冥想练习网格组件，展示可选的冥想类型与时长。
 */
import SectionHeading from '@/components/base/SectionHeading.vue';
import YzmCard from '@/components/base/YzmCard.vue';

const meditations = [
  { symbol: '◉', title: '脉轮冥想', text: '依次感受身体七个区域的能量变化。', duration: '12 分钟' },
  {
    symbol: '○',
    title: '正念冥想',
    text: '观察呼吸、声音与念头，不跟随、不抗拒。',
    duration: '8 分钟',
  },
  {
    symbol: '☀',
    title: '元气冥想',
    text: '用温暖意象恢复清醒、稳定的行动力。',
    duration: '10 分钟',
  },
];
</script>

<style scoped>
.meditation-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14rpx;
}

.meditation-card {
  min-height: 0;
  padding: 28rpx 26rpx;
}

.meditation-card-symbol,
.meditation-card-title,
.meditation-card-text,
.meditation-card-meta {
  display: block;
}

.meditation-card-symbol {
  color: var(--yzm-gold);
  font-size: 44rpx;
}

.meditation-card-title {
  margin-top: 20rpx;
  font-size: 27rpx;
  font-weight: 650;
}

.meditation-card-text {
  margin-top: 12rpx;
  color: var(--yzm-muted);
  font-size: 20rpx;
  line-height: 1.6;
}

.meditation-card-meta {
  margin-top: 22rpx;
  color: var(--yzm-jade);
  font-size: 19rpx;
}

@media (min-width: 600px) {
  .meditation-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .meditation-card {
    min-height: 280rpx;
  }
}
</style>
