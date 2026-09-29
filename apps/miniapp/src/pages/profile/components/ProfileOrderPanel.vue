<template>
  <YzmCard>
    <view class="order-panel-title"><text>我的订单</text><text>全部订单 ›</text></view>
    <view class="order-panel-states">
      <view v-for="item in orderStates" :key="item.label">
        <view class="order-panel-icon"
          >{{ item.icon }}<text v-if="item.count">{{ item.count }}</text></view
        >
        <text>{{ item.label }}</text>
      </view>
    </view>
  </YzmCard>
</template>

<script setup lang="ts">
/**
 * 个人订单概览组件，展示各订单状态及待处理数量。
 */
import YzmCard from '@/components/base/YzmCard.vue';

const orderStates = [
  { icon: '付', label: '待付款', count: 0 },
  { icon: '备', label: '待发货', count: 1 },
  { icon: '运', label: '待收货', count: 0 },
  { icon: '评', label: '待评价', count: 0 },
];
</script>

<style scoped>
.order-panel-title {
  display: flex;
  padding: 24rpx 26rpx;
  justify-content: space-between;
  border-bottom: 1rpx solid var(--yzm-line);
  font-size: 25rpx;
  font-weight: 600;
}

.order-panel-title text:last-child {
  color: var(--yzm-muted);
  font-size: 20rpx;
  font-weight: 400;
}

.order-panel-states {
  display: flex;
  padding: 28rpx 12rpx;
}

.order-panel-states > view {
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  color: var(--yzm-ink-soft);
  font-size: 20rpx;
}

.order-panel-icon {
  position: relative;
  display: flex;
  width: 60rpx;
  height: 60rpx;
  margin-bottom: 9rpx;
  align-items: center;
  justify-content: center;
  border: 1rpx solid var(--yzm-line);
  border-radius: 50%;
  color: var(--yzm-jade);
  font-size: 21rpx;
}

.order-panel-icon text {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  color: #fff;
  background: var(--yzm-gold);
  font-size: 17rpx;
  line-height: 28rpx;
  text-align: center;
}
</style>
