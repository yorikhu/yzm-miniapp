<template>
  <view class="cart-row">
    <view
      class="cart-row-check"
      :class="{ 'cart-row-check-active': item.selected }"
      @click="$emit('toggle')"
    >
      {{ item.selected ? '✓' : '' }}
    </view>
    <view class="cart-row-art"
      ><ProductArtwork :tone="item.product.tone" :name="item.product.name"
    /></view>
    <view class="cart-row-body">
      <text class="cart-row-name">{{ item.product.name }}</text>
      <text class="cart-row-sku">{{ sku?.name }} · {{ sku?.spec }}</text>
      <view class="cart-row-footer">
        <MoneyAmount :amount="sku?.price ?? item.product.price" size="29rpx" />
        <QuantityStepper
          :model-value="item.quantity"
          @update:model-value="$emit('quantity', $event)"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 购物车商品行组件，展示 SKU、价格、数量和选中状态。
 */
import { computed } from 'vue';
import MoneyAmount from '@/components/base/MoneyAmount.vue';
import ProductArtwork from '@/components/product/ProductArtwork.vue';
import QuantityStepper from '@/components/product/QuantityStepper.vue';
import type { CartItem } from '@/types';

const props = defineProps<{ item: CartItem }>();
defineEmits<{ toggle: []; quantity: [value: number] }>();
/** @returns 当前购物车条目对应的 SKU 信息。 */
const sku = computed(() => props.item.product.skus.find((item) => item.id === props.item.skuId));
</script>

<style scoped>
.cart-row {
  display: flex;
  padding: 24rpx 20rpx;
  align-items: center;
  gap: 18rpx;
}

.cart-row-check {
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

.cart-row-check-active {
  border-color: var(--yzm-jade);
  background: var(--yzm-jade);
}

.cart-row-art {
  flex: 0 0 152rpx;
  height: 166rpx;
}

.cart-row-art :deep(.artwork) {
  min-height: 166rpx;
}

.cart-row-art :deep(.artwork-jar) {
  bottom: 18rpx;
  left: 16rpx;
  width: 58rpx;
  height: 84rpx;
}

.cart-row-body {
  flex: 1;
  min-width: 0;
}

.cart-row-name,
.cart-row-sku {
  display: block;
}

.cart-row-name {
  font-size: 29rpx;
  font-weight: 650;
}

.cart-row-sku {
  margin-top: 8rpx;
  color: var(--yzm-muted);
  font-size: 20rpx;
}

.cart-row-footer {
  display: flex;
  margin-top: 24rpx;
  align-items: center;
  justify-content: space-between;
}

.cart-row-footer :deep(.stepper) {
  height: 52rpx;
}

.cart-row-footer :deep(.stepper-button),
.cart-row-footer :deep(.stepper-value) {
  min-width: 48rpx;
  line-height: 50rpx;
}
</style>
