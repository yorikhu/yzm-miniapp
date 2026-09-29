<template>
  <view class="page-shell page-shell--no-tab checkout-page">
    <AppHeader title="确认订单" back centered />

    <YzmCard>
      <view class="address-card">
        <view class="address-card__pin">⌖</view>
        <view class="address-card__body">
          <text class="address-card__name">茗主　138****6688</text>
          <text class="address-card__text">云南省普洱市 · 澜沧县惠民镇景迈村 8 号</text>
        </view>
        <text class="address-card__arrow">›</text>
      </view>
    </YzmCard>

    <view class="page-section checkout-section">
      <SectionHeading title="商品清单" />
      <YzmCard>
        <view v-for="item in selectedItems" :key="item.id" class="order-item">
          <view class="order-item__art"
            ><ProductArtwork :tone="item.product.tone" :name="item.product.name"
          /></view>
          <view class="order-item__body">
            <text class="order-item__name">{{ item.product.name }}</text>
            <text class="order-item__sku"
              >{{ findSku(item)?.name }} · {{ findSku(item)?.spec }}</text
            >
          </view>
          <view class="order-item__price">
            <text>×{{ item.quantity }}</text>
            <text class="price"
              >¥{{ (findSku(item)?.price ?? item.product.price) * item.quantity }}</text
            >
          </view>
        </view>
      </YzmCard>
    </view>

    <YzmCard class="option-card">
      <view class="option-row"
        ><text>配送方式</text><text class="muted">顺丰快递 · 满额包邮 ›</text></view
      >
      <view class="option-row"
        ><text>订单备注</text><input v-model="remark" placeholder="冲泡或礼赠需求"
      /></view>
    </YzmCard>

    <YzmCard class="amount-card">
      <view
        ><text>商品总额</text><text>¥{{ total }}</text></view
      >
      <view><text>运费</text><text>¥0</text></view>
      <view class="amount-card__total"
        ><text>实付</text><text class="price">¥{{ total }}</text></view
      >
    </YzmCard>

    <view class="pay-bar">
      <view
        ><text>实付</text><text class="price">¥{{ total }}</text></view
      >
      <YzmButton @click="pay">立即支付</YzmButton>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 确认订单页面，展示已选商品、配送信息、备注和应付金额。
 */
import { ref } from 'vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import SectionHeading from '@/components/base/SectionHeading.vue';
import YzmButton from '@/components/base/YzmButton.vue';
import YzmCard from '@/components/base/YzmCard.vue';
import ProductArtwork from '@/components/product/ProductArtwork.vue';
import { useCart } from '@/composables/useCart';
import { useNavigation } from '@/composables/useNavigation';
import type { CartItem } from '@/types';

const remark = ref('');
const { selectedItems, total } = useCart();
const { goTo } = useNavigation();
/**
 * 查找购物车条目当前选中的 SKU。
 *
 * @param item - 购物车条目。
 * @returns 匹配的 SKU，未找到时返回 undefined。
 */
const findSku = (item: CartItem) => item.product.skus.find((sku) => sku.id === item.skuId);
/**
 * 携带当前应付金额进入支付成功页。
 *
 * @returns uni-app 的页面跳转结果。
 */
const pay = () => goTo(`/pages/payment/success?amount=${total.value}`);
</script>

<style scoped>
.checkout-page {
  padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
}

.address-card {
  display: flex;
  padding: 28rpx 24rpx;
  align-items: center;
  gap: 18rpx;
}

.address-card__pin {
  display: flex;
  width: 58rpx;
  height: 58rpx;
  align-items: center;
  justify-content: center;
  border: 2rpx solid var(--yzm-jade);
  border-radius: 50%;
  font-size: 29rpx;
}

.address-card__body {
  flex: 1;
}

.address-card__name,
.address-card__text {
  display: block;
}

.address-card__name {
  font-size: 26rpx;
  font-weight: 650;
}

.address-card__text {
  margin-top: 8rpx;
  color: var(--yzm-muted);
  font-size: 21rpx;
  line-height: 1.5;
}

.address-card__arrow {
  color: var(--yzm-muted);
  font-size: 40rpx;
}

.checkout-section {
  margin-top: 34rpx;
}

.order-item {
  display: flex;
  padding: 20rpx;
  align-items: center;
  border-bottom: 1rpx solid var(--yzm-line);
  gap: 18rpx;
}

.order-item:last-child {
  border-bottom: 0;
}

.order-item__art {
  width: 126rpx;
  height: 132rpx;
}

.order-item__art :deep(.artwork) {
  min-height: 132rpx;
}

.order-item__art :deep(.artwork__jar) {
  bottom: 12rpx;
  left: 12rpx;
  width: 48rpx;
  height: 68rpx;
}

.order-item__body {
  flex: 1;
}

.order-item__name,
.order-item__sku,
.order-item__price text {
  display: block;
}

.order-item__name {
  font-size: 27rpx;
  font-weight: 650;
}

.order-item__sku {
  margin-top: 8rpx;
  color: var(--yzm-muted);
  font-size: 20rpx;
}

.order-item__price {
  text-align: right;
}

.order-item__price text:first-child {
  color: var(--yzm-muted);
  font-size: 19rpx;
}

.order-item__price .price {
  margin-top: 12rpx;
  font-size: 25rpx;
}

.option-card,
.amount-card {
  margin-top: 20rpx;
}

.option-row {
  display: flex;
  min-height: 94rpx;
  padding: 0 26rpx;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1rpx solid var(--yzm-line);
  font-size: 23rpx;
}

.option-row:last-child {
  border-bottom: 0;
}

.option-row input {
  flex: 1;
  margin-left: 40rpx;
  font-size: 22rpx;
  text-align: right;
}

.amount-card {
  padding: 18rpx 26rpx;
}

.amount-card > view {
  display: flex;
  padding: 12rpx 0;
  justify-content: space-between;
  color: var(--yzm-ink-soft);
  font-size: 22rpx;
}

.amount-card .amount-card__total {
  margin-top: 6rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid var(--yzm-line);
  color: var(--yzm-ink);
  font-size: 26rpx;
  font-weight: 650;
}

.amount-card__total .price {
  font-size: 34rpx;
}

.pay-bar {
  position: fixed;
  z-index: 10;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  min-height: calc(118rpx + env(safe-area-inset-bottom));
  padding: 14rpx 28rpx env(safe-area-inset-bottom);
  align-items: center;
  justify-content: flex-end;
  background: rgba(255, 253, 248, 0.98);
  box-shadow: 0 -10rpx 35rpx rgba(55, 45, 28, 0.08);
  gap: 28rpx;
}

.pay-bar > view {
  display: flex;
  align-items: baseline;
  gap: 8rpx;
}

.pay-bar .price {
  font-size: 38rpx;
}

.pay-bar :deep(.yzm-button) {
  min-height: 80rpx;
  padding: 0 50rpx;
}
</style>
