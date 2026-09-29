<template>
  <view class="success-page paper-texture">
    <view class="success-page__content">
      <view class="success-page__check">✓</view>
      <text class="success-page__title">支付成功</text>
      <text class="success-page__amount">¥{{ amount }} · 我们将尽快为您发出</text>

      <YzmCard class="success-page__info">
        <view
          ><text>订单号</text><text>{{ orderNumber }}</text></view
        >
        <view><text>配送</text><text>顺丰快递 · 预计 1–3 日送达</text></view>
      </YzmCard>

      <view class="success-page__actions">
        <YzmButton variant="outline" block @click="goTab('profile')">查看订单</YzmButton>
        <YzmButton variant="ghost" block @click="goTab('mall')">继续逛逛</YzmButton>
      </view>
    </view>
    <view class="success-page__mountain success-page__mountain--one" />
    <view class="success-page__mountain success-page__mountain--two" />
    <view class="success-page__bottom"
      ><YzmButton block @click="goTab('home')">完成</YzmButton></view
    >
  </view>
</template>

<script setup lang="ts">
/**
 * 支付成功页面，展示实付金额、订单号和后续导航入口。
 */
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
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
  overflow: hidden;
  min-height: 100vh;
  padding: calc(150rpx + env(safe-area-inset-top)) 38rpx calc(150rpx + env(safe-area-inset-bottom));
  background-color: var(--yzm-paper);
}

.success-page__content {
  position: relative;
  z-index: 2;
  max-width: 760rpx;
  margin: 0 auto;
  text-align: center;
}

.success-page__check {
  display: flex;
  width: 150rpx;
  height: 150rpx;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(145deg, #247763, #0e5547);
  box-shadow: 0 20rpx 50rpx rgba(14, 85, 71, 0.22);
  font-family: Arial, sans-serif;
  font-size: 76rpx;
}

.success-page__title,
.success-page__amount {
  display: block;
}

.success-page__title {
  margin-top: 42rpx;
  font-size: 58rpx;
  font-weight: 650;
  letter-spacing: 4rpx;
}

.success-page__amount {
  margin-top: 20rpx;
  color: var(--yzm-muted);
  font-size: 23rpx;
}

.success-page__info {
  margin-top: 52rpx;
  text-align: left;
}

.success-page__info view {
  display: grid;
  padding: 22rpx 28rpx;
  grid-template-columns: 120rpx 1fr;
  border-bottom: 1rpx solid var(--yzm-line);
  color: var(--yzm-ink-soft);
  font-size: 22rpx;
}

.success-page__info view:last-child {
  border-bottom: 0;
}

.success-page__info view text:first-child {
  color: var(--yzm-ink);
  font-weight: 600;
}

.success-page__actions {
  display: grid;
  margin-top: 36rpx;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}

.success-page__mountain {
  position: absolute;
  right: -18%;
  bottom: -130rpx;
  left: -20%;
  height: 360rpx;
  border-radius: 50% 50% 0 0;
  background: rgba(83, 112, 88, 0.12);
  transform: rotate(7deg);
}

.success-page__mountain--two {
  right: -40%;
  bottom: -180rpx;
  left: 20%;
  background: rgba(23, 63, 56, 0.11);
  transform: rotate(-7deg);
}

.success-page__bottom {
  position: fixed;
  z-index: 4;
  right: 28rpx;
  bottom: calc(20rpx + env(safe-area-inset-bottom));
  left: 28rpx;
  max-width: 920rpx;
  margin: auto;
}
</style>
