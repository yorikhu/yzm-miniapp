<template>
  <view class="page-section">
    <view class="category-nav">
      <button
        v-for="item in categories"
        :key="item.id"
        class="category-nav-item"
        hover-class="category-nav-item-pressed"
        @click="onTap(item)"
      >
        <view class="category-nav-item-symbol" :class="`category-nav-item-symbol-${item.id}`">
          <text>{{ item.symbol }}</text>
        </view>
        <view class="category-nav-item-body">
          <text class="category-nav-item-title">{{ item.title }}</text>
          <text class="category-nav-item-text">{{ item.text }}</text>
        </view>
        <text class="category-nav-item-arrow">›</text>
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 静心练习栏目入口，三个长条按钮分别通向「一盏三心 / 冥想 / 书籍」。
 */
import { useNavigation } from '@/composables/useNavigation';

const { goTo } = useNavigation();

const categories = [
  {
    id: 'sanzin',
    title: '一盏三心',
    text: '茶心 · 正念心 · 冥想心，建立可重复的日常练习。',
    symbol: '茶',
    route: '/pages/practice/sanzin/index',
  },
  {
    id: 'meditation',
    title: '冥想',
    text: '从一次呼吸开始，与自己安静共处。',
    symbol: '坐',
    route: '/pages/practice/meditation/index',
  },
  {
    id: 'books',
    title: '书籍',
    text: '在文字里安顿身心，慢读一章。',
    symbol: '书',
    route: '/pages/practice/books/index',
  },
];

const onTap = (item: { title: string; route?: string }) => {
  if (item.route) {
    goTo(item.route);
    return;
  }
  uni.showToast({ title: `${item.title} 即将开启`, icon: 'none' });
};
</script>

<style scoped>
.category-nav {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.category-nav-item {
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

.category-nav-item-pressed {
  background: linear-gradient(135deg, #f5efe2 0%, #ede4d2 100%);
}

.category-nav-item-symbol {
  flex: 0 0 76rpx;
  width: 76rpx;
  height: 76rpx;
  margin-right: 22rpx;
  border-radius: 22rpx;
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 32rpx;
  font-weight: 600;
  line-height: 76rpx;
  text-align: center;
}

.category-nav-item-symbol-sanzin {
  color: #fffdf5;
  background: linear-gradient(135deg, #2e6052, #466b5c);
}

.category-nav-item-symbol-meditation {
  color: #fffdf5;
  background: linear-gradient(135deg, #5f6e4d, #8a9472);
}

.category-nav-item-symbol-books {
  color: #fffdf5;
  background: linear-gradient(135deg, #a96f2b, #c89a55);
}

.category-nav-item-body {
  flex: 1;
  min-width: 0;
}

.category-nav-item-title,
.category-nav-item-text {
  display: block;
}

.category-nav-item-title {
  font-size: 30rpx;
  font-weight: 650;
  letter-spacing: 2rpx;
}

.category-nav-item-text {
  margin-top: 8rpx;
  color: var(--yzm-muted);
  font-size: 21rpx;
  line-height: 1.6;
}

.category-nav-item-arrow {
  margin-left: 12rpx;
  color: rgba(21, 94, 80, 0.45);
  font-size: 34rpx;
  line-height: 1;
}
</style>
