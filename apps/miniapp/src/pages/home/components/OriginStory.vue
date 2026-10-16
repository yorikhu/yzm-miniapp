<template>
  <view class="page-section">
    <SectionHeading eyebrow="ORIGIN" title="来自大自然的馈赠" />
    <YzmCard>
      <view class="origin-landscape">
        <view class="origin-sun" />
        <view class="origin-mountain origin-mountain-back" />
        <view class="origin-mountain origin-mountain-front" />
        <text class="origin-location">北纬 22.2°</text>
      </view>
      <view class="origin-content">
        <text class="origin-title">高山云雾出好茶</text>
        <text class="origin-text">
          平均海拔1000米以上，平均气温18-22°，气候条件优越，冬暖夏凉，雨量充沛，土壤富含矿物质。
        </text>
        <view class="origin-chips"
          ><text>千年古茶林</text><text>手工采摘</text><text>匠心工艺</text></view
        >
      </view>
      <view class="origin-categories">
        <view v-for="item in categories" :key="item.name" class="origin-category">
          <text class="origin-category-name">{{ item.name }}</text>
          <text class="origin-category-text">{{ item.text }}</text>
        </view>
      </view>
    </YzmCard>
  </view>
</template>

<script setup lang="ts">
/**
 * 品牌起源故事组件，展示韵盏茗的地域与文化背景。
 */
import SectionHeading from '@/components/base/SectionHeading.vue';
import YzmCard from '@/components/base/YzmCard.vue';

const categories = [
  {
    name: '有机茶',
    text: '只做除草和修枝（古树不修枝），不用任何肥料。',
  },
  {
    name: '头春茶',
    text: '经一冬休眠积累，茶氨酸含量全年最高，故滋味鲜浓醇厚、金毫密披。',
  },
];
</script>

<style scoped>
.origin-landscape {
  position: relative;
  overflow: hidden;
  height: 290rpx;
  background: linear-gradient(180deg, #dbe4d7, #f2e7cd);
}

.origin-sun {
  position: absolute;
  top: 38rpx;
  right: 62rpx;
  width: 82rpx;
  height: 82rpx;
  border-radius: 50%;
  background: rgba(245, 225, 174, 0.85);
}

.origin-mountain {
  position: absolute;
  right: -10%;
  bottom: -120rpx;
  left: -10%;
  height: 290rpx;
  border-radius: 50% 50% 0 0;
  background: #829a80;
  transform: rotate(7deg);
}

.origin-mountain-back {
  bottom: -150rpx;
  background: rgba(95, 126, 101, 0.45);
  transform: rotate(-9deg);
}

.origin-mountain-front {
  right: -28%;
  left: 20%;
  background: #486956;
}

.origin-location {
  position: absolute;
  bottom: 28rpx;
  left: 28rpx;
  color: #fff;
  font-size: 20rpx;
  letter-spacing: 2rpx;
}

.origin-content {
  padding: 28rpx;
}

.origin-title,
.origin-text {
  display: block;
}

.origin-title {
  font-size: 31rpx;
  font-weight: 650;
}

.origin-text {
  margin-top: 15rpx;
  color: var(--yzm-ink-soft);
  font-size: 22rpx;
  line-height: 1.8;
}

.origin-chips {
  display: flex;
  margin-top: 22rpx;
  flex-wrap: wrap;
  gap: 10rpx;
}

.origin-chips text {
  padding: 9rpx 16rpx;
  border-radius: 999rpx;
  color: var(--yzm-jade-dark);
  background: rgba(23, 107, 89, 0.08);
  font-size: 19rpx;
}

.origin-categories {
  display: flex;
  padding: 4rpx 28rpx 28rpx;
  flex-direction: column;
}

.origin-category {
  padding: 22rpx 0;
}

.origin-category + .origin-category {
  border-top: 1rpx solid rgba(21, 94, 80, 0.1);
}

.origin-category-name,
.origin-category-text {
  display: block;
}

.origin-category-name {
  font-size: 27rpx;
  font-weight: 650;
}

.origin-category-text {
  margin-top: 12rpx;
  color: var(--yzm-ink-soft);
  font-size: 22rpx;
  line-height: 1.8;
}
</style>
