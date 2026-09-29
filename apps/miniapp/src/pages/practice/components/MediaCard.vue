<template>
  <YzmCard>
    <view class="media-card">
      <view class="media-card-art" :class="`media-card-art-${technique.tone}`">
        <text>{{
          technique.format === '音频' ? '声' : technique.format === '视频' ? '映' : '阅'
        }}</text>
      </view>
      <view class="media-card-body">
        <text class="media-card-eyebrow">{{ technique.eyebrow }}</text>
        <text class="media-card-title">{{ technique.title }}</text>
        <text class="media-card-description">{{ technique.description }}</text>
        <view class="media-card-meta">
          <text>{{ technique.format }}</text>
          <text>{{ technique.duration }}</text>
          <text class="media-card-play">开始 ›</text>
        </view>
      </view>
    </view>
  </YzmCard>
</template>

<script setup lang="ts">
/**
 * 练习媒体卡片组件，展示一项音频、视频或文章练习。
 */
import YzmCard from '@/components/base/YzmCard.vue';
import type { Technique } from '@/types';

defineProps<{ technique: Technique }>();
</script>

<style scoped>
.media-card {
  display: flex;
  padding: 18rpx;
  gap: 22rpx;
}

.media-card-art {
  display: flex;
  flex: 0 0 150rpx;
  min-height: 172rpx;
  align-items: center;
  justify-content: center;
  border-radius: 22rpx;
  color: rgba(255, 255, 255, 0.9);
  background: linear-gradient(145deg, #d5a85c, #8b5a2b);
  font-size: 42rpx;
}

.media-card-art-jade {
  background: linear-gradient(145deg, #8fb398, #376b58);
}

.media-card-art-mist {
  background: linear-gradient(145deg, #c7cec3, #7c8c83);
}

.media-card-art-earth {
  background: linear-gradient(145deg, #a88d6d, #58483c);
}

.media-card-art-rose {
  background: linear-gradient(145deg, #d7aaa4, #95615e);
}

.media-card-body {
  flex: 1;
  min-width: 0;
}

.media-card-eyebrow,
.media-card-title,
.media-card-description {
  display: block;
}

.media-card-eyebrow {
  color: var(--yzm-gold);
  font-size: 19rpx;
}

.media-card-title {
  margin-top: 6rpx;
  font-size: 30rpx;
  font-weight: 650;
}

.media-card-description {
  margin-top: 8rpx;
  color: var(--yzm-muted);
  font-size: 21rpx;
  line-height: 1.6;
}

.media-card-meta {
  display: flex;
  margin-top: 12rpx;
  color: var(--yzm-ink-soft);
  font-size: 19rpx;
  gap: 18rpx;
}

.media-card-play {
  margin-left: auto;
  color: var(--yzm-jade);
  font-weight: 600;
}
</style>
