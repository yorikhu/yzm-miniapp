<template>
  <view class="page-section">
    <SectionHeading eyebrow="READERS" title="念书人" />
    <YzmCard>
      <view class="book-list">
        <view v-for="(book, index) in books" :key="book.title" class="book-item">
          <view class="book-item__cover">{{ String(index + 1).padStart(2, '0') }}</view>
          <view class="book-item__body">
            <text class="book-item__title">《{{ book.title }}》</text>
            <text class="book-item__author">{{ book.author }}</text>
            <text class="book-item__reason">{{ book.reason }}</text>
          </view>
        </view>
        <view class="reading-note">社区达到 100 人后开启陪伴阅读 · 当前 68/100</view>
      </view>
    </YzmCard>
  </view>
</template>

<script setup lang="ts">
/**
 * 阅读推荐组件，展示静心与成长主题书单。
 */
import SectionHeading from '@/components/base/SectionHeading.vue';
import YzmCard from '@/components/base/YzmCard.vue';

const books = [
  { title: '认知觉醒', author: '周岭', reason: '理解大脑与自我成长，让改变变得可实践。' },
  { title: '非暴力沟通', author: '马歇尔·卢森堡', reason: '学习看见感受与需要，减少防御式表达。' },
  {
    title: '当下的力量',
    author: '埃克哈特·托利',
    reason: '把注意力从过度思虑带回正在发生的此刻。',
  },
];
</script>

<style scoped>
.book-list {
  padding: 8rpx 24rpx 24rpx;
}

.book-item {
  display: flex;
  padding: 22rpx 0;
  border-bottom: 1rpx solid var(--yzm-line);
  gap: 20rpx;
}

.book-item__cover {
  display: flex;
  flex: 0 0 74rpx;
  height: 104rpx;
  padding-bottom: 12rpx;
  align-items: flex-end;
  justify-content: center;
  border-radius: 6rpx 14rpx 14rpx 6rpx;
  color: #f4e7ce;
  background: var(--yzm-ink);
  font-family: Georgia, serif;
  font-size: 18rpx;
}

.book-item__body {
  flex: 1;
}

.book-item__title,
.book-item__author,
.book-item__reason {
  display: block;
}

.book-item__title {
  font-size: 26rpx;
  font-weight: 650;
}

.book-item__author {
  margin-top: 4rpx;
  color: var(--yzm-gold);
  font-size: 18rpx;
}

.book-item__reason {
  margin-top: 8rpx;
  color: var(--yzm-muted);
  font-size: 20rpx;
  line-height: 1.5;
}

.reading-note {
  margin-top: 22rpx;
  padding: 17rpx 20rpx;
  border-radius: 14rpx;
  color: var(--yzm-ink-soft);
  background: rgba(23, 107, 89, 0.07);
  font-size: 20rpx;
  text-align: center;
}
</style>
