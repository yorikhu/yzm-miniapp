<template>
  <view class="page-shell cart-page">
    <AppHeader title="购物车" subtitle="好茶已在盏边等你" :badge="`${items.length}件`" />

    <view class="cart-list">
      <YzmCard v-for="item in items" :key="item.id">
        <CartProductRow
          :item="item"
          @toggle="toggleItem(item.id)"
          @quantity="updateQuantity(item.id, $event)"
        />
      </YzmCard>
    </view>

    <view class="checkout-bar">
      <view class="checkout-bar-select" @click="toggleAll">
        <view class="checkout-bar-check" :class="{ 'checkout-bar-check-active': allSelected }">
          {{ allSelected ? '✓' : '' }}
        </view>
        <text>全选</text>
      </view>
      <view class="checkout-bar-summary">
        <view class="checkout-bar-amount">
          <text>合计</text><text class="price">¥ {{ total }}</text>
        </view>
        <text class="checkout-bar-tip" :class="{ 'checkout-bar-tip-fulfilled': isFreeShipping }">{{
          shippingTip
        }}</text>
      </view>
      <YzmButton :disabled="selectedCount === 0" @click="goCheckout">
        <text>结算</text>
        <text v-if="selectedCount > 0" class="checkout-bar-selected-count">{{
          selectedCount
        }}</text>
      </YzmButton>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 购物车页面，管理 SKU 选择、数量、包邮门槛和结算入口。
 */
import { computed } from 'vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import YzmButton from '@/components/base/YzmButton.vue';
import YzmCard from '@/components/base/YzmCard.vue';
import CartProductRow from './components/CartProductRow.vue';
import { useCart } from '@/composables/useCart';
import { useNavigation } from '@/composables/useNavigation';

const { items, selectedCount, total, allSelected, toggleItem, toggleAll, updateQuantity } =
  useCart();
const freeShippingThreshold = 199;
/** @returns 已选商品金额是否达到包邮门槛。 */
const isFreeShipping = computed(() => total.value >= freeShippingThreshold);
/** @returns 根据当前已选金额生成的包邮状态文案。 */
const shippingTip = computed(() =>
  isFreeShipping.value
    ? `已满 ¥ ${freeShippingThreshold}，享顺丰包邮`
    : `满 ¥ ${freeShippingThreshold} 顺丰包邮，还差 ¥ ${freeShippingThreshold - total.value}`,
);
const { goTo } = useNavigation();
/**
 * 在存在已选 SKU 时进入确认订单页。
 *
 * @returns 导航结果；无已选 SKU 时返回 false。
 */
const goCheckout = () => selectedCount.value > 0 && goTo('/pages/checkout/index');
</script>

<style scoped>
.cart-page {
  padding-bottom: 190rpx;
}

.cart-list {
  display: grid;
  gap: 18rpx;
}

.checkout-bar {
  position: fixed;
  z-index: 21;
  right: 20rpx;
  bottom: calc(20rpx + var(--window-bottom, 0px));
  left: 20rpx;
  display: flex;
  max-width: 940rpx;
  min-height: 124rpx;
  margin: 0 auto;
  padding: 12rpx 14rpx 12rpx 22rpx;
  align-items: center;
  border: 1rpx solid var(--yzm-line);
  border-radius: 28rpx;
  background: rgba(255, 253, 248, 0.97);
  box-shadow: 0 12rpx 40rpx rgba(55, 45, 28, 0.14);
  gap: 16rpx;
}

.checkout-bar-select {
  display: flex;
  align-items: center;
  font-size: 21rpx;
  gap: 16rpx;
}

.checkout-bar-summary {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  align-items: flex-end;
  gap: 6rpx;
}

.checkout-bar-check {
  display: flex;
  flex: 0 0 38rpx;
  height: 38rpx;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #9ba5a1;
  border-radius: 50%;
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 23rpx;
}

.checkout-bar-check-active {
  border-color: var(--yzm-jade);
  background: var(--yzm-jade);
}

.checkout-bar-amount {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  font-size: 21rpx;
  gap: 8rpx;
}

.checkout-bar-amount .price {
  font-size: 32rpx;
}

.checkout-bar-tip {
  width: 100%;
  overflow: hidden;
  color: var(--yzm-gold);
  font-size: 18rpx;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.checkout-bar-tip-fulfilled {
  color: var(--yzm-jade);
}

.checkout-bar :deep(.yzm-button) {
  flex-shrink: 0;
  min-width: 168rpx;
  min-height: 76rpx;
  padding: 0 26rpx;
  font-size: 23rpx;
}

.checkout-bar :deep(.yzm-button[disabled]) {
  border: 1rpx solid rgba(23, 60, 53, 0.08);
  color: #f8f7f3;
  background: #aeb8b5;
  box-shadow: none;
  opacity: 1;
}

.checkout-bar-selected-count {
  min-width: 30rpx;
  height: 30rpx;
  margin-left: 10rpx;
  padding: 0 7rpx;
  border-radius: 15rpx;
  color: var(--yzm-jade);
  background: rgba(255, 253, 248, 0.9);
  font-size: 18rpx;
  line-height: 30rpx;
  text-align: center;
}
</style>
