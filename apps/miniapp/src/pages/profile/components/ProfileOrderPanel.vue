<template>
  <YzmCard>
    <view class="order-panel-title">
      <text>我的订单</text>
      <view class="order-panel-all">
        <text>全部订单</text>
        <view class="order-panel-arrow" />
      </view>
    </view>
    <view class="order-panel-states">
      <view v-for="item in orderStates" :key="item.label">
        <view class="order-panel-icon">
          <image :src="item.icon" mode="aspectFit" />
          <text v-if="item.count">{{ item.count }}</text>
        </view>
        <text class="order-panel-label">{{ item.label }}</text>
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
  { icon: '/static/icons/profile/order-payment.svg', label: '待付款', count: 0 },
  { icon: '/static/icons/profile/order-shipment.svg', label: '待发货', count: 1 },
  { icon: '/static/icons/profile/order-delivery.svg', label: '待收货', count: 0 },
  { icon: '/static/icons/profile/order-review.svg', label: '待评价', count: 0 },
];
</script>

<style scoped>
.order-panel-title {
  display: flex;
  padding: 24rpx 26rpx;
  justify-content: space-between;
  border-bottom: 1rpx solid var(--yzm-line);
  color: var(--yzm-ink);
  font-size: 28rpx;
  font-weight: 600;
}

.order-panel-all {
  display: flex;
  align-items: center;
  color: var(--yzm-ink-soft);
  font-size: 23rpx;
  font-weight: 400;
  gap: 10rpx;
}

.order-panel-arrow {
  width: 12rpx;
  height: 12rpx;
  border-top: 2rpx solid rgba(23, 60, 53, 0.5);
  border-right: 2rpx solid rgba(23, 60, 53, 0.5);
  transform: rotate(45deg);
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
  color: var(--yzm-ink);
  font-size: 24rpx;
}

.order-panel-icon {
  position: relative;
  display: flex;
  width: 68rpx;
  height: 68rpx;
  margin-bottom: 12rpx;
  align-items: center;
  justify-content: center;
  border-radius: 20rpx;
  background: rgba(21, 94, 80, 0.07);
}

.order-panel-icon image {
  width: 40rpx;
  height: 40rpx;
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

.order-panel-label {
  font-weight: 500;
}
</style>
