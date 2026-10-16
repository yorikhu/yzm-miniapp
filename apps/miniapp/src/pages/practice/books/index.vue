<template>
  <view class="page-shell">
    <AppHeader title="书籍" subtitle="在文字里安顿身心，慢读一章" back centered sticky />
    <view class="page-main">
      <view class="page-section">
        <SectionHeading eyebrow="READERS" title="子芯书单" />
        <view class="book-list">
          <button
            v-for="book in books"
            :key="book.id"
            class="book-item"
            hover-class="book-item-pressed"
            @click="openBook(book)"
          >
            <view class="book-item-cover">
              <text>{{ book.title.slice(0, 1) }}</text>
            </view>
            <view class="book-item-body">
              <text class="book-item-title">《{{ book.title }}》</text>
              <text class="book-item-author">{{ book.author }}</text>
            </view>
            <text class="book-item-arrow">›</text>
          </button>
        </view>
        <view class="book-note">社区达到 100 人后开启陪伴阅读 · 当前 68/100</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 书籍栏目页，展示子芯书单并进入各书详情。
 */
import AppHeader from '@/components/layout/AppHeader.vue';
import SectionHeading from '@/components/base/SectionHeading.vue';
import { books } from '@/services/books';
import { useNavigation } from '@/composables/useNavigation';

const { goTo } = useNavigation();

const openBook = (book: { id: string }) => {
  goTo(`/pages/practice/books/detail?id=${book.id}`);
};
</script>

<style scoped>
.book-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.book-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 24rpx;
  border: 1rpx solid rgba(21, 94, 80, 0.1);
  border-radius: 24rpx;
  background: linear-gradient(135deg, #fffdf8 0%, #f5efe2 100%);
  box-shadow: 0 8rpx 24rpx rgba(32, 66, 57, 0.04);
  text-align: left;
}

.book-item-pressed {
  background: linear-gradient(135deg, #f0eadc 0%, #e6dcc6 100%);
}

.book-item-cover {
  flex: 0 0 88rpx;
  width: 88rpx;
  height: 116rpx;
  margin-right: 22rpx;
  border: 1rpx solid rgba(169, 111, 43, 0.25);
  border-radius: 8rpx 14rpx 14rpx 8rpx;
  color: #fffdf5;
  background: linear-gradient(150deg, #8a5a24 0%, #a97a3d 55%, #c89a55 100%);
  box-shadow: inset 6rpx 0 0 rgba(255, 253, 245, 0.22);
  font-family: 'Songti SC', 'STSong', serif;
}

.book-item-cover text {
  display: block;
  margin-top: 16rpx;
  font-size: 34rpx;
  font-weight: 600;
  text-align: center;
}

.book-item-body {
  flex: 1;
  min-width: 0;
}

.book-item-title,
.book-item-author {
  display: block;
}

.book-item-title {
  color: var(--yzm-ink);
  font-size: 28rpx;
  font-weight: 650;
  letter-spacing: 1rpx;
}

.book-item-author {
  margin-top: 8rpx;
  color: var(--yzm-muted);
  font-size: 21rpx;
}

.book-item-arrow {
  margin-left: 12rpx;
  color: rgba(21, 94, 80, 0.45);
  font-size: 34rpx;
  line-height: 1;
}

.book-note {
  margin-top: 24rpx;
  padding: 18rpx 22rpx;
  border-radius: 14rpx;
  color: var(--yzm-muted);
  background: rgba(21, 94, 80, 0.05);
  font-size: 20rpx;
  text-align: center;
}
</style>
