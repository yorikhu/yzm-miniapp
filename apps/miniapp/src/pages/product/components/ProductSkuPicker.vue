<template>
  <view class="sku-picker">
    <view
      v-for="sku in skus"
      :key="sku.id"
      class="sku-picker-item"
      :class="{ 'sku-picker-item-active': modelValue === sku.id }"
      @click="$emit('update:modelValue', sku.id)"
    >
      <text class="sku-picker-name">{{ sku.name }}</text>
      <view class="sku-picker-meta">
        <text>{{ sku.spec }} ·</text>
        <MoneyAmount :amount="sku.price" size="21rpx" color="var(--yzm-muted)" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 商品 SKU 选择组件，展示可用规格并同步当前选中值。
 */
import MoneyAmount from '@/components/base/MoneyAmount.vue';
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

.sku-picker-item {
  min-width: 210rpx;
  padding: 18rpx 22rpx;
  border: 1rpx solid var(--yzm-line);
  border-radius: 18rpx;
  background: rgba(255, 255, 255, 0.35);
}

.sku-picker-item-active {
  border-color: var(--yzm-jade);
  background: rgba(23, 107, 89, 0.09);
  box-shadow: inset 0 0 0 1rpx var(--yzm-jade);
}

.sku-picker-name,
.sku-picker-meta {
  display: block;
}

.sku-picker-name {
  font-weight: 600;
}

.sku-picker-meta {
  display: flex;
  margin-top: 4rpx;
  align-items: baseline;
  color: var(--yzm-muted);
  font-size: 21rpx;
  gap: 5rpx;
}
</style>
