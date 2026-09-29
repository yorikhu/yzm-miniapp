<template>
  <view class="success-page paper-texture">
    <AppHeader title="支付结果" centered />
    <view class="success-page-content">
      <view class="success-page-check">✓</view>
      <text class="success-page-title">支付成功</text>
      <view class="success-page-amount">
        <text>实付</text>
        <MoneyAmount :amount="amount" size="38rpx" />
      </view>
      <text class="success-page-message">我们将尽快为您发出</text>

      <view class="success-page-info">
        <YzmCard>
          <view class="success-page-info-row"
            ><text>订单号</text><text>{{ orderNumber }}</text></view
          >
          <view class="success-page-info-row"
            ><text>配送</text><text>顺丰快递 · 预计 1–3 日送达</text></view
          >
        </YzmCard>
      </view>

      <view class="success-page-action-area">
        <view class="success-page-actions">
          <YzmButton variant="outline" block @click="goTab('profile')">查看订单</YzmButton>
          <YzmButton variant="outline" block @click="goTab('mall')">继续逛逛</YzmButton>
        </view>

        <view class="success-page-complete">
          <YzmButton block @click="goTab('home')">完成</YzmButton>
        </view>
      </view>
    </view>
    <view class="success-page-mountain success-page-mountain-one" />
    <view class="success-page-mountain success-page-mountain-two" />
  </view>
</template>

<script setup lang="ts">
/**
 * 支付成功页面，展示实付金额、订单号和后续导航入口。
 */
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import AppHeader from '@/components/layout/AppHeader.vue';
import MoneyAmount from '@/components/base/MoneyAmount.vue';
import YzmButton from '@/components/base/YzmButton.vue';
import YzmCard from '@/components/base/YzmCard.vue';
import { mockOrderNumber } from '@/services/mock/data';
import { useNavigation } from '@/composables/useNavigation';

const amount = ref('0');
const orderNumber = mockOrderNumber();
const { goTab } = useNavigation();

/**
 * 从页面参数中读取实付金额。
 *
 * @param query - 页面启动查询参数。
 * @returns 无返回值。
 */
const loadPaymentAmount = (query?: Record<string, string>) => {
  amount.value = query?.amount ?? '0';
};

onLoad(loadPaymentAmount);
</script>

<style scoped>
.success-page {
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  min-height: 100vh;
  padding-top: 0;
  padding-right: 38rpx;
  padding-bottom: 32rpx;
  padding-left: 38rpx;
  padding-bottom: calc(32rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(32rpx + env(safe-area-inset-bottom));
  flex-direction: column;
  background-color: var(--yzm-paper);
}

.success-page-content {
  position: relative;
  z-index: 2;
  display: flex;
  width: 100%;
  max-width: 760rpx;
  min-height: 0;
  margin: 0 auto;
  flex: 1;
  flex-direction: column;
  text-align: center;
}

.success-page-check {
  display: flex;
  width: 128rpx;
  height: 128rpx;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(145deg, #247763, #0e5547);
  box-shadow: 0 18rpx 44rpx rgba(14, 85, 71, 0.2);
  font-family: Arial, sans-serif;
  font-size: 66rpx;
}

.success-page-title,
.success-page-message {
  display: block;
}

.success-page-title {
  margin-top: 32rpx;
  font-size: 50rpx;
  font-weight: 650;
  letter-spacing: 4rpx;
}

.success-page-amount {
  display: flex;
  margin-top: 22rpx;
  align-items: baseline;
  justify-content: center;
  color: var(--yzm-ink-soft);
  font-size: 21rpx;
  gap: 10rpx;
}

.success-page-message {
  margin-top: 8rpx;
  color: var(--yzm-muted);
  font-size: 21rpx;
}

.success-page-info {
  margin-top: 38rpx;
  text-align: left;
}

.success-page-info-row {
  display: flex;
  min-height: 86rpx;
  padding: 20rpx 28rpx;
  align-items: center;
  border-bottom: 1rpx solid var(--yzm-line);
  color: var(--yzm-ink-soft);
  font-size: 22rpx;
  gap: 20rpx;
}

.success-page-info-row:last-child {
  border-bottom: 0;
}

.success-page-info-row text:first-child {
  flex: 0 0 100rpx;
  color: var(--yzm-ink);
  font-weight: 600;
}

.success-page-info-row text:last-child {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}

.success-page-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}

.success-page-actions :deep(.yzm-button),
.success-page-complete :deep(.yzm-button) {
  min-height: 92rpx;
  font-size: 24rpx;
}

.success-page-action-area {
  margin-top: auto;
  padding-top: 64rpx;
}

.success-page-complete {
  margin-top: 24rpx;
}

.success-page-mountain {
  position: absolute;
  right: -18%;
  bottom: -130rpx;
  left: -20%;
  height: 360rpx;
  border-radius: 50% 50% 0 0;
  background: rgba(83, 112, 88, 0.12);
  transform: rotate(7deg);
}

.success-page-mountain-two {
  right: -40%;
  bottom: -180rpx;
  left: 20%;
  background: rgba(23, 63, 56, 0.11);
  transform: rotate(-7deg);
}
</style>
