<template>
  <view class="sku-picker">
    <view
      v-for="sku in skus"
      :key="sku.id"
      class="sku-picker__item"
      :class="{ 'sku-picker__item--active': modelValue === sku.id }"
      @click="$emit('update:modelValue', sku.id)"
    >
      <text class="sku-picker__name">{{ sku.name }}</text>
      <text class="sku-picker__meta">{{ sku.spec }} · ¥{{ sku.price }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 商品 SKU 选择组件，展示可用规格并同步当前选中值。
 */
import type { ProductSku } from '@/types';

defineProps<{ skus: ProductSku[]; modelValue: string }>();
defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<style scoped>
.sku-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 14rpx;
}

.sku-picker__item {
  min-width: 210rpx;
  padding: 18rpx 22rpx;
  border: 1rpx solid var(--yzm-line);
  border-radius: 18rpx;
  background: rgba(255, 255, 255, 0.35);
}

.sku-picker__item--active {
  border-color: var(--yzm-jade);
  background: rgba(23, 107, 89, 0.09);
  box-shadow: inset 0 0 0 1rpx var(--yzm-jade);
}

.sku-picker__name,
.sku-picker__meta {
  display: block;
}

.sku-picker__name {
  font-weight: 600;
}

.sku-picker__meta {
  margin-top: 4rpx;
  color: var(--yzm-muted);
  font-size: 21rpx;
}
</style>
