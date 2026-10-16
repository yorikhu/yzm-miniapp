<template>
  <view class="page-shell">
    <AppHeader
      :title="book ? `《${book.title}》` : '书籍'"
      :subtitle="book?.author"
      back
      centered
      sticky
    />
    <view v-if="book" class="page-main">
      <view class="page-section">
        <SectionHeading eyebrow="OVERVIEW" title="书本概览" />
        <YzmCard>
          <view class="book-doc">
            <text class="book-doc-text">{{ book.overview }}</text>
          </view>
        </YzmCard>
      </view>

      <view class="page-section">
        <SectionHeading eyebrow="RECOMMEND" title="子芯推荐" />
        <YzmCard>
          <view class="book-doc">
            <view class="book-audio" hover-class="book-audio-pressed" @click="playAudio">
              <text class="book-audio-icon">♪</text>
              <view class="book-audio-body">
                <text class="book-audio-label">播放子芯推荐音频</text>
                <text class="book-audio-meta">为什么推荐这本书 · 约 3 分钟</text>
              </view>
            </view>
            <text class="book-doc-text">{{ book.reason }}</text>
            <view v-if="!isPlaceholder(book.quote)" class="book-quote">
              <text class="book-quote-mark">"</text>
              <text class="book-quote-text">{{ book.quote }}</text>
            </view>
          </view>
        </YzmCard>
      </view>

      <view class="page-section">
        <SectionHeading eyebrow="CHAPTERS" title="章节归纳" />
        <YzmCard>
          <view class="book-chapters">
            <view v-for="(chapter, i) in book.chapters" :key="chapter.title" class="book-chapter">
              <view class="book-chapter-head">
                <text class="book-chapter-index">{{ String(i + 1).padStart(2, '0') }}</text>
                <text class="book-chapter-title">{{ chapter.title }}</text>
              </view>
              <text class="book-chapter-summary">{{ chapter.summary }}</text>
            </view>
          </view>
        </YzmCard>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 书本详情页，展示概览、子芯推荐（音频+原因+语录）与章节总结。
 */
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import AppHeader from '@/components/layout/AppHeader.vue';
import SectionHeading from '@/components/base/SectionHeading.vue';
import YzmCard from '@/components/base/YzmCard.vue';
import { books, type Book } from '@/services/books';

const book = ref<Book | null>(null);

onLoad((options) => {
  const id = options?.id;
  book.value = books.find((b) => b.id === id) ?? null;
});

const isPlaceholder = (text: string) => text.startsWith('（');

const playAudio = () => {
  uni.showToast({ title: '子芯推荐音频即将上线', icon: 'none', duration: 1500 });
};
</script>

<style scoped>
.book-doc {
  padding: 28rpx;
}

.book-doc-text {
  display: block;
  color: var(--yzm-ink-soft);
  font-size: 23rpx;
  line-height: 1.9;
}

/* 推荐音频按钮 */
.book-audio {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
  padding: 22rpx 24rpx;
  border: 1rpx solid rgba(169, 111, 43, 0.25);
  border-radius: 18rpx;
  background: linear-gradient(135deg, #fbf6ec 0%, #f4ead6 100%);
}

.book-audio-pressed {
  background: linear-gradient(135deg, #f2e8d4 0%, #eadfc6 100%);
}

.book-audio-icon {
  flex: 0 0 60rpx;
  width: 60rpx;
  height: 60rpx;
  margin-right: 18rpx;
  border-radius: 50%;
  color: #fffdf5;
  background: linear-gradient(135deg, #a96f2b, #c89a55);
  font-size: 28rpx;
  line-height: 60rpx;
  text-align: center;
}

.book-audio-body {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
}

.book-audio-label,
.book-audio-meta {
  display: block;
}

.book-audio-label {
  color: var(--yzm-ink);
  font-size: 24rpx;
  font-weight: 600;
}

.book-audio-meta {
  margin-top: 6rpx;
  color: var(--yzm-muted);
  font-size: 19rpx;
}

/* 语录 */
.book-quote {
  position: relative;
  margin-top: 26rpx;
  padding: 24rpx 26rpx 24rpx 56rpx;
  border: 1rpx solid rgba(169, 111, 43, 0.22);
  border-radius: 16rpx;
  background: rgba(169, 111, 43, 0.05);
}

.book-quote-mark {
  position: absolute;
  top: 10rpx;
  left: 20rpx;
  color: rgba(169, 111, 43, 0.5);
  font-family: Georgia, serif;
  font-size: 56rpx;
  font-style: italic;
  line-height: 1;
}

.book-quote-text {
  display: block;
  color: var(--yzm-ink);
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 24rpx;
  font-style: italic;
  line-height: 1.9;
}

/* 章节 */
.book-chapters {
  padding: 10rpx 28rpx 28rpx;
}

.book-chapter {
  padding: 22rpx 0;
}

.book-chapter + .book-chapter {
  border-top: 1rpx solid rgba(21, 94, 80, 0.1);
}

.book-chapter-head {
  display: flex;
  align-items: baseline;
  gap: 14rpx;
}

.book-chapter-index {
  color: var(--yzm-gold);
  font-family: Georgia, serif;
  font-size: 21rpx;
}

.book-chapter-title {
  color: var(--yzm-ink);
  font-size: 25rpx;
  font-weight: 650;
  letter-spacing: 1rpx;
}

.book-chapter-summary {
  display: block;
  margin-top: 12rpx;
  color: var(--yzm-ink-soft);
  font-size: 22rpx;
  line-height: 1.8;
}
</style>
