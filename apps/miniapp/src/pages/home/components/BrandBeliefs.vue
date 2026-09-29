<template>
  <view class="page-section">
    <SectionHeading eyebrow="OUR BELIEF" title="我们选择的生活" />
    <view class="belief-grid">
      <YzmCard v-for="item in beliefs" :key="item.index" flat>
        <view class="belief-card">
          <text class="belief-card__index">{{ item.index }}</text>
          <text class="belief-card__title">{{ item.title }}</text>
          <text class="belief-card__text">{{ item.text }}</text>
        </view>
      </YzmCard>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 品牌信念组件，展示韵盏茗的三项核心价值。
 */
import SectionHeading from '@/components/base/SectionHeading.vue';
import YzmCard from '@/components/base/YzmCard.vue';

const beliefs = [
  { index: '01', title: '寻一份净土', text: '在浮躁里为自己留出一段安静、不被催促的时间。' },
  { index: '02', title: '不被情绪裹挟', text: '看见情绪，也看见事实，用平静的心态回应生活。' },
  { index: '03', title: '选择爱与善意', text: '对自己柔软，对他人真诚，让善意成为主动选择。' },
];
</script>

<style scoped>
.belief-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14rpx;
}

.belief-card {
  min-height: 0;
  padding: 28rpx 26rpx;
}

.belief-card__index,
.belief-card__title,
.belief-card__text {
  display: block;
}

.belief-card__index {
  color: var(--yzm-gold);
  font-family: Georgia, serif;
  font-size: 22rpx;
}

.belief-card__title {
  margin-top: 16rpx;
  font-size: 27rpx;
  font-weight: 650;
}

.belief-card__text {
  margin-top: 14rpx;
  color: var(--yzm-muted);
  font-size: 20rpx;
  line-height: 1.7;
}

@media (min-width: 600px) {
  .belief-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .belief-card {
    min-height: 240rpx;
  }
}
</style>
