<template>
  <view class="page-section">
    <SectionHeading
      eyebrow="TEA LATITUDE"
      title="五种茶，五种山野性格"
      action="去商城"
      @action="$emit('shop')"
    />
    <scroll-view scroll-x class="scroll-row">
      <view class="tea-strip">
        <view
          v-for="product in products"
          :key="product.id"
          class="tea-mini"
          @click="$emit('select', product.id)"
        >
          <ProductArtwork :tone="product.tone" :name="product.name" />
          <text class="tea-mini__name">{{ product.name }}</text>
          <text class="tea-mini__latitude">{{ product.latitude }}</text>
          <text class="tea-mini__benefit">{{ product.subtitle }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
/**
 * 茶品产地组件，展示推荐茶品并向外发出购买与选择事件。
 */
import SectionHeading from '@/components/base/SectionHeading.vue';
import ProductArtwork from '@/components/product/ProductArtwork.vue';
import type { Product } from '@/types';

defineProps<{ products: Product[] }>();
defineEmits<{ shop: []; select: [id: string] }>();
</script>

<style scoped>
.tea-strip {
  display: inline-flex;
  padding-right: 28rpx;
  gap: 16rpx;
}

.tea-mini {
  display: inline-flex;
  width: 260rpx;
  padding: 12rpx 12rpx 22rpx;
  border: 1rpx solid var(--yzm-line);
  border-radius: 26rpx;
  background: rgba(255, 253, 248, 0.78);
  box-shadow: var(--yzm-shadow);
  flex-direction: column;
  white-space: normal;
}

.tea-mini :deep(.artwork) {
  height: 205rpx;
}

.tea-mini__name,
.tea-mini__latitude,
.tea-mini__benefit {
  display: block;
  padding: 0 8rpx;
}

.tea-mini__name {
  margin-top: 18rpx;
  font-size: 28rpx;
  font-weight: 650;
}

.tea-mini__latitude {
  margin-top: 5rpx;
  color: var(--yzm-gold);
  font-size: 18rpx;
}

.tea-mini__benefit {
  margin-top: 10rpx;
  color: var(--yzm-muted);
  font-size: 19rpx;
}
</style>
