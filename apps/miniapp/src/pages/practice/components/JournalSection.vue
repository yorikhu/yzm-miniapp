<template>
  <view class="page-section">
    <SectionHeading eyebrow="OBSERVATION LETTER" title="观察日记" />
    <DiaryComposer @published="publishEntry" />
    <view class="journal-list">
      <YzmCard v-for="entry in entries" :key="entry.id" flat>
        <view class="journal-card">
          <view class="journal-card-head">
            <view class="journal-card-avatar">{{ entry.author.slice(0, 1) }}</view>
            <view
              ><text>{{ entry.author }}</text
              ><text>{{ entry.time }}</text></view
            >
          </view>
          <text class="journal-card-content">{{ entry.content }}</text>
          <text class="journal-card-like">♡ {{ entry.likes }}</text>
        </view>
      </YzmCard>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 观察日记分区组件，组合日记发布器与时间线列表。
 */
import { ref } from 'vue';
import SectionHeading from '@/components/base/SectionHeading.vue';
import YzmCard from '@/components/base/YzmCard.vue';
import DiaryComposer from './DiaryComposer.vue';
import { mockJournalEntries } from '@/services/mock/data';

const entries = ref([...mockJournalEntries]);
/**
 * 将新发布的日记添加到列表顶部。
 *
 * @param content - 用户提交的日记内容。
 * @returns 无返回值。
 */
const publishEntry = (content: string) => {
  entries.value.unshift({
    id: `local-${Date.now()}`,
    author: '待审核 · 小雀',
    content,
    time: '刚刚',
    likes: 0,
  });
};
</script>

<style scoped>
.journal-list {
  display: grid;
  margin-top: 18rpx;
  gap: 16rpx;
}

.journal-card {
  padding: 25rpx;
}

.journal-card-head {
  display: flex;
  align-items: center;
  gap: 14rpx;
}

.journal-card-avatar {
  display: flex;
  width: 60rpx;
  height: 60rpx;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  background: var(--yzm-jade);
  font-size: 21rpx;
}

.journal-card-head text {
  display: block;
  font-size: 22rpx;
}

.journal-card-head text:last-child {
  margin-top: 4rpx;
  color: var(--yzm-muted);
  font-size: 17rpx;
}

.journal-card-content {
  display: block;
  margin-top: 20rpx;
  color: var(--yzm-ink-soft);
  font-size: 23rpx;
  line-height: 1.8;
}

.journal-card-like {
  display: block;
  margin-top: 18rpx;
  color: var(--yzm-gold);
  font-size: 20rpx;
}
</style>
