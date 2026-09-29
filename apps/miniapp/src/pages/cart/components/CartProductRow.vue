<template>
  <view class="cart-row">
    <view
      class="cart-row__check"
      :class="{ 'cart-row__check--active': item.selected }"
      @click="$emit('toggle')"
    >
      {{ item.selected ? '✓' : '' }}
    </view>
    <view class="cart-row__art"
      ><ProductArtwork :tone="item.product.tone" :name="item.product.name"
    /></view>
    <view class="cart-row__body">
      <text class="cart-row__name">{{ item.product.name }}</text>
      <text class="cart-row__sku">{{ sku?.name }} · {{ sku?.spec }}</text>
      <view class="cart-row__footer">
        <text class="cart-row__price price">¥ {{ sku?.price ?? item.product.price }}</text>
        <QuantityStepper
          :model-value="item.quantity"
          @update:model-value="$emit('quantity', $event)"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ProductArtwork from '@/components/product/ProductArtwork.vue';
import QuantityStepper from '@/components/product/QuantityStepper.vue';
import type { CartItem } from '@/types';

const props = defineProps<{ item: CartItem }>();
defineEmits<{ toggle: []; quantity: [value: number] }>();
const sku = computed(() => props.item.product.skus.find((item) => item.id === props.item.skuId));
</script>

<style scoped>
.cart-row {
  display: flex;
  padding: 24rpx 20rpx;
  align-items: center;
  gap: 18rpx;
}

.cart-row__check {
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

.cart-row__check--active {
  border-color: var(--yzm-jade);
  background: var(--yzm-jade);
}

.cart-row__art {
  flex: 0 0 152rpx;
  height: 166rpx;
}

.cart-row__art :deep(.artwork) {
  min-height: 166rpx;
}

.cart-row__art :deep(.artwork__jar) {
  bottom: 18rpx;
  left: 16rpx;
  width: 58rpx;
  height: 84rpx;
}

.cart-row__body {
  flex: 1;
  min-width: 0;
}

.cart-row__name,
.cart-row__sku {
  display: block;
}

.cart-row__name {
  font-size: 29rpx;
  font-weight: 650;
}

.cart-row__sku {
  margin-top: 8rpx;
  color: var(--yzm-muted);
  font-size: 20rpx;
}

.cart-row__footer {
  display: flex;
  margin-top: 24rpx;
  align-items: center;
  justify-content: space-between;
}

.cart-row__price {
  font-size: 29rpx;
}

.cart-row__footer :deep(.stepper) {
  height: 52rpx;
}

.cart-row__footer :deep(.stepper__button),
.cart-row__footer :deep(.stepper__value) {
  min-width: 48rpx;
  line-height: 50rpx;
}
</style>
