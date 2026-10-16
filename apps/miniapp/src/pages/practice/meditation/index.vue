<template>
  <view class="page-shell">
    <AppHeader title="冥想" subtitle="从一次呼吸开始，与自己安静共处" back centered sticky />
    <view class="page-main">
      <view class="page-section">
        <SectionHeading eyebrow="MEDITATION" title="冥想主题" />
        <view class="meditation-list">
          <button
            v-for="item in meditations"
            :key="item.title"
            class="meditation-item"
            :class="{ 'meditation-item-locked': item.locked }"
            :hover-class="item.locked ? 'none' : 'meditation-item-pressed'"
            @click="onTap(item)"
          >
            <view class="meditation-item-symbol" :class="`meditation-item-symbol-${item.tone}`">
              <text>{{ item.symbol }}</text>
            </view>
            <view class="meditation-item-body">
              <view class="meditation-item-title-row">
                <text class="meditation-item-title">{{ item.title }}</text>
                <text v-if="item.duration" class="meditation-item-duration">{{
                  item.duration
                }}</text>
              </view>
              <text class="meditation-item-text">{{ item.text }}</text>
            </view>
            <view class="meditation-item-action">
              <text v-if="item.locked" class="meditation-item-lock">等待开放</text>
              <text v-else class="meditation-item-play">▶</text>
            </view>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 冥想主题列表页，提供可播放的冥想音频与待开放主题入口。
 */
import AppHeader from '@/components/layout/AppHeader.vue';
import SectionHeading from '@/components/base/SectionHeading.vue';

interface MeditationTheme {
  title: string;
  text: string;
  duration?: string;
  symbol: string;
  tone: 'jade' | 'mist' | 'amber' | 'earth' | 'rose';
  locked?: boolean;
}

const meditations: MeditationTheme[] = [
  {
    title: '十分钟轻松元气冥想',
    text: '用十分钟呼吸与放松，唤醒轻盈而柔和的状态。',
    duration: '10 分钟',
    symbol: '息',
    tone: 'jade',
  },
  {
    title: '八周觉醒之旅',
    text: '系统化的八周正念练习计划，逐周深入觉知。',
    symbol: '行',
    tone: 'mist',
    locked: true,
  },
];

const onTap = (item: MeditationTheme) => {
  if (item.locked) {
    uni.showToast({ title: '该主题等待开放中', icon: 'none' });
    return;
  }
  uni.showToast({ title: `开始播放：${item.title}`, icon: 'none', duration: 1500 });
};
</script>

<style scoped>
.meditation-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.meditation-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 26rpx 24rpx;
  border: 1rpx solid rgba(21, 94, 80, 0.1);
  border-radius: 24rpx;
  background: linear-gradient(135deg, #fffdf8 0%, #f5efe2 100%);
  box-shadow: 0 8rpx 24rpx rgba(32, 66, 57, 0.04);
  text-align: left;
}

.meditation-item-pressed {
  background: linear-gradient(135deg, #f0eadc 0%, #e6dcc6 100%);
}

.meditation-item-locked {
  background: linear-gradient(135deg, #f8f6f0 0%, #efece3 100%);
  opacity: 0.72;
}

.meditation-item-symbol {
  flex: 0 0 72rpx;
  width: 72rpx;
  height: 72rpx;
  margin-right: 20rpx;
  border-radius: 20rpx;
  color: #fffdf5;
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 30rpx;
  font-weight: 600;
  line-height: 72rpx;
  text-align: center;
}

.meditation-item-symbol-jade {
  background: linear-gradient(135deg, #2e6052, #466b5c);
}

.meditation-item-symbol-mist {
  background: linear-gradient(135deg, #5f6e4d, #8a9472);
}

.meditation-item-symbol-amber {
  background: linear-gradient(135deg, #a96f2b, #c89a55);
}

.meditation-item-symbol-earth {
  background: linear-gradient(135deg, #6b5a44, #8d7a5f);
}

.meditation-item-symbol-rose {
  background: linear-gradient(135deg, #9c5c5c, #b98585);
}

.meditation-item-body {
  flex: 1;
  min-width: 0;
}

.meditation-item-title-row {
  display: flex;
  align-items: baseline;
  gap: 12rpx;
}

.meditation-item-title {
  color: var(--yzm-ink);
  font-size: 27rpx;
  font-weight: 650;
  letter-spacing: 1rpx;
}

.meditation-item-duration {
  flex-shrink: 0;
  color: var(--yzm-jade-dark);
  font-size: 19rpx;
}

.meditation-item-text {
  display: block;
  margin-top: 8rpx;
  color: var(--yzm-muted);
  font-size: 21rpx;
  line-height: 1.6;
}

.meditation-item-action {
  flex-shrink: 0;
  margin-left: 14rpx;
}

.meditation-item-play {
  display: block;
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  color: #fffdf5;
  background: linear-gradient(135deg, #2e6052, #466b5c);
  font-size: 24rpx;
  line-height: 64rpx;
  text-align: center;
}

.meditation-item-locked .meditation-item-play {
  display: none;
}

.meditation-item-lock {
  display: block;
  padding: 8rpx 18rpx;
  border: 1rpx solid rgba(21, 94, 80, 0.25);
  border-radius: 999rpx;
  color: var(--yzm-muted);
  background: rgba(21, 94, 80, 0.05);
  font-size: 19rpx;
  letter-spacing: 2rpx;
}
</style>
