<template>
  <view class="page-shell page-shell-no-tab">
    <AppHeader title="茶品详情" back centered />

    <view class="product-hero">
      <ProductArtwork :tone="product.tone" :name="product.name" />
      <view class="product-hero-badge">{{ product.origin }}</view>
    </view>

    <view class="product-main">
      <text class="product-main-category">{{ product.category }} · {{ product.latitude }}</text>
      <text class="product-main-title">{{ product.name }}</text>
      <text class="product-main-subtitle">{{ product.subtitle }}</text>
      <view class="product-main-meta">
        <MoneyAmount :amount="selectedSku?.price ?? product.price" size="44rpx" />
        <MoneyAmount
          v-if="product.originalPrice"
          :amount="product.originalPrice"
          size="22rpx"
          color="#a7aaa7"
          strikethrough
        />
        <text class="product-main-sales">已售 {{ product.sales }}</text>
      </view>
    </view>

    <YzmCard class="purchase-card">
      <view class="purchase-card-section">
        <text class="purchase-card-label">选择规格</text>
        <ProductSkuPicker v-model="selectedSkuId" :skus="product.skus" />
      </view>
      <view class="purchase-card-quantity">
        <text class="purchase-card-label">购买数量</text>
        <QuantityStepper v-model="quantity" />
      </view>
      <view class="purchase-card-actions">
        <YzmButton variant="outline" block @click="add">加入购物车</YzmButton>
        <YzmButton block @click="buyNow">立即购买</YzmButton>
      </view>
    </YzmCard>

    <view class="page-section">
      <SectionHeading eyebrow="PRODUCT STORY" title="这一盏的故事" />
      <YzmCard>
        <view class="story">
          <text class="story-lead">{{ product.coreBenefit }}</text>
          <text class="story-body">{{ product.detail }}</text>
          <view class="story-divider" />
          <view class="story-notes">
            <view><text>香气</text><text>花蜜香 · 山野气</text></view>
            <view><text>茶汤</text><text>温润 · 清甜 · 耐泡</text></view>
            <view><text>建议</text><text>90°C 水温 · 8 秒出汤</text></view>
          </view>
        </view>
      </YzmCard>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 茶品详情页面，管理商品加载、SKU 选择、数量与购买操作。
 */
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import AppHeader from '@/components/layout/AppHeader.vue';
import MoneyAmount from '@/components/base/MoneyAmount.vue';
import SectionHeading from '@/components/base/SectionHeading.vue';
import YzmButton from '@/components/base/YzmButton.vue';
import YzmCard from '@/components/base/YzmCard.vue';
import ProductArtwork from '@/components/product/ProductArtwork.vue';
import ProductSkuPicker from './components/ProductSkuPicker.vue';
import QuantityStepper from '@/components/product/QuantityStepper.vue';
import { mockProducts } from '@/services/mock/data';
import { useCart } from '@/composables/useCart';
import { useNavigation } from '@/composables/useNavigation';

const product = ref(mockProducts[0]);
const selectedSkuId = ref(product.value.skus[0].id);
const quantity = ref(1);
const { addToCart } = useCart();
const { goTo } = useNavigation();
/** @returns 当前选中的商品 SKU，未匹配时返回 undefined。 */
const selectedSku = computed(() =>
  product.value.skus.find((sku) => sku.id === selectedSkuId.value),
);

/**
 * 根据页面参数加载商品，并默认选中第一个 SKU。
 *
 * @param query - 包含商品 id 的页面查询参数。
 * @returns 无返回值。
 */
const loadProduct = (query?: Record<string, string>) => {
  const matched = mockProducts.find((item) => item.id === query?.id);
  if (matched) {
    product.value = matched;
    selectedSkuId.value = matched.skus[0].id;
  }
};

onLoad(loadProduct);

/**
 * 将当前 SKU 和数量加入购物车。
 *
 * @returns 无返回值。
 */
const add = () => addToCart(product.value, selectedSkuId.value, quantity.value);
/**
 * 将当前 SKU 加入购物车后直接进入确认订单页。
 *
 * @returns 无返回值。
 */
const buyNow = () => {
  addToCart(product.value, selectedSkuId.value, quantity.value);
  goTo('/pages/checkout/index');
};
</script>

<style scoped>
.product-hero {
  position: relative;
  height: 560rpx;
}

.product-hero :deep(.artwork) {
  border-radius: 32rpx;
}

.product-hero :deep(.artwork-jar) {
  bottom: 80rpx;
  left: 90rpx;
  width: 190rpx;
  height: 270rpx;
  border-radius: 30rpx 30rpx 46rpx 46rpx;
}

.product-hero :deep(.artwork-seal) {
  font-size: 74rpx;
}

.product-hero-badge {
  position: absolute;
  right: 24rpx;
  bottom: 22rpx;
  padding: 12rpx 20rpx;
  border-radius: 999rpx;
  color: #fff;
  background: rgba(23, 63, 56, 0.72);
  font-size: 20rpx;
}

.product-main {
  padding: 32rpx 6rpx;
}

.product-main-category,
.product-main-title,
.product-main-subtitle {
  display: block;
}

.product-main-category {
  color: var(--yzm-gold);
  font-size: 20rpx;
  letter-spacing: 2rpx;
}

.product-main-title {
  margin-top: 10rpx;
  font-size: 46rpx;
  font-weight: 650;
}

.product-main-subtitle {
  margin-top: 8rpx;
  color: var(--yzm-ink-soft);
  font-size: 25rpx;
}

.product-main-meta {
  display: flex;
  margin-top: 24rpx;
  align-items: baseline;
  gap: 14rpx;
}

.product-main-sales {
  margin-left: auto;
  color: var(--yzm-muted);
  font-size: 20rpx;
}

.purchase-card-section,
.purchase-card-quantity {
  padding: 28rpx;
}

.purchase-card-quantity {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1rpx solid var(--yzm-line);
}

.purchase-card-label {
  display: block;
  margin-bottom: 18rpx;
  font-size: 25rpx;
  font-weight: 650;
}

.purchase-card-quantity .purchase-card-label {
  margin-bottom: 0;
}

.purchase-card-actions {
  display: grid;
  padding: 0 28rpx 28rpx;
  grid-template-columns: 1fr 1fr;
  gap: 14rpx;
}

.story {
  padding: 32rpx;
}

.story-lead,
.story-body {
  display: block;
}

.story-lead {
  color: var(--yzm-gold);
  font-size: 24rpx;
  letter-spacing: 1rpx;
}

.story-body {
  margin-top: 18rpx;
  color: var(--yzm-ink-soft);
  font-size: 24rpx;
  line-height: 1.9;
}

.story-divider {
  height: 1rpx;
  margin: 26rpx 0;
  background: var(--yzm-line);
}

.story-notes view {
  display: grid;
  padding: 12rpx 0;
  grid-template-columns: 90rpx 1fr;
  color: var(--yzm-muted);
  font-size: 22rpx;
}

.story-notes view text:first-child {
  color: var(--yzm-ink);
  font-weight: 600;
}
</style>
