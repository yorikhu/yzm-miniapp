<template>
  <YzmCard>
    <view class="product-card" @click="$emit('select', product)">
      <view class="product-card__visual">
        <ProductArtwork :tone="product.tone" :name="product.name" />
      </view>
      <view class="product-card__body">
        <view>
          <text class="product-card__category">{{ product.category }}</text>
          <text class="product-card__name">{{ product.name }}</text>
          <text class="product-card__subtitle">{{ product.subtitle }}</text>
          <text class="product-card__benefit">{{ product.coreBenefit }}</text>
        </view>
        <view class="product-card__footer">
          <view>
            <text class="product-card__price price">¥{{ product.price }}</text>
            <text class="product-card__sales">已售 {{ product.sales }}</text>
          </view>
          <view class="product-card__arrow">选购 ›</view>
        </view>
      </view>
    </view>
  </YzmCard>
</template>

<script setup lang="ts">
/**
 * 商城茶品卡片组件，展示商品摘要并处理选择事件。
 */
import YzmCard from '@/components/base/YzmCard.vue';
import ProductArtwork from '@/components/product/ProductArtwork.vue';
import type { Product } from '@/types';

defineProps<{ product: Product }>();
defineEmits<{ select: [product: Product] }>();
</script>

<style scoped>
.product-card {
  display: flex;
  min-height: 286rpx;
  padding: 18rpx;
  gap: 22rpx;
}

.product-card__visual {
  flex: 0 0 238rpx;
  min-width: 0;
}

.product-card__body {
  display: flex;
  flex: 1;
  min-width: 0;
  padding: 8rpx 6rpx 6rpx 0;
  flex-direction: column;
  justify-content: space-between;
}

.product-card__category {
  color: var(--yzm-gold);
  font-size: 20rpx;
  letter-spacing: 3rpx;
}

.product-card__name,
.product-card__subtitle,
.product-card__benefit {
  display: block;
}

.product-card__name {
  margin-top: 8rpx;
  font-size: 35rpx;
  font-weight: 650;
}

.product-card__subtitle {
  margin-top: 5rpx;
  color: var(--yzm-ink-soft);
  font-size: 23rpx;
}

.product-card__benefit {
  overflow: hidden;
  margin-top: 18rpx;
  color: var(--yzm-muted);
  font-size: 20rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-card__footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.product-card__price {
  font-size: 34rpx;
}

.product-card__sales {
  display: block;
  margin-top: 3rpx;
  color: var(--yzm-muted);
  font-size: 18rpx;
}

.product-card__arrow {
  padding: 14rpx 20rpx;
  border-radius: 999rpx;
  color: #fff;
  background: var(--yzm-jade);
  font-size: 22rpx;
}
</style>
