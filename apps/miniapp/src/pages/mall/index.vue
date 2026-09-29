<template>
  <view class="page-shell">
    <AppHeader title="商城" subtitle="选一盏适合当下的茶" show-logo />

    <view class="search-bar">
      <text class="search-bar-icon">⌕</text>
      <input v-model="keyword" class="search-bar-input" placeholder="搜索茶名、香气或产地" />
    </view>

    <scroll-view v-if="categories?.length" scroll-x class="category-scroll">
      <view class="category-list">
        <text
          v-for="category in categories"
          :key="category"
          class="category-list-item"
          :class="{ 'category-list-item-active': activeCategory === category }"
          @click="activeCategory = category"
        >
          {{ category }}
        </text>
      </view>
    </scroll-view>

    <view class="mall-banner paper-texture">
      <view>
        <text class="mall-banner-eyebrow">SEASONAL TEA</text>
        <text class="mall-banner-title">山风入盏，秋日正暖</text>
        <text class="mall-banner-text">本月推荐 · 景迈功夫红</text>
      </view>
      <view class="mall-banner-seal">秋</view>
    </view>

    <view class="page-section product-list-section">
      <SectionHeading title="全部好茶" :eyebrow="`${filteredProducts.length} 款在售`" />
      <view class="product-list">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @select="openProduct"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 商城页面，提供茶品分类、关键词筛选与详情页导航。
 */
import { computed, ref } from 'vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import SectionHeading from '@/components/base/SectionHeading.vue';
import ProductCard from './components/ProductCard.vue';
import { mockProducts } from '@/services/mock/data';
import { useNavigation } from '@/composables/useNavigation';
import type { Product } from '@/types';

const keyword = ref('');
const activeCategory = ref('全部');
const categories = ['全部', ...new Set(mockProducts.map((product) => product.category))];
const { goTo } = useNavigation();

/** @returns 同时匹配当前分类和搜索关键词的商品列表。 */
const filteredProducts = computed(() =>
  mockProducts.filter((product) => {
    const categoryMatched =
      activeCategory.value === '全部' || product.category === activeCategory.value;
    const searchMatched =
      !keyword.value ||
      [product.name, product.subtitle, product.origin, product.coreBenefit].some((value) =>
        value.includes(keyword.value.trim()),
      );
    return categoryMatched && searchMatched;
  }),
);

/**
 * 打开选中商品的详情页。
 *
 * @param product - 待查看的商品。
 * @returns uni-app 的页面跳转结果。
 */
const openProduct = (product: Product) => goTo(`/pages/product/detail?id=${product.id}`);
</script>

<style scoped>
.search-bar {
  display: flex;
  height: 82rpx;
  padding: 0 24rpx;
  align-items: center;
  border: 1rpx solid var(--yzm-line);
  border-radius: 999rpx;
  background: rgba(255, 253, 248, 0.8);
  box-shadow: 0 8rpx 24rpx rgba(55, 45, 28, 0.05);
}

.search-bar-icon {
  margin-right: 12rpx;
  color: var(--yzm-jade);
  font-family: Arial, sans-serif;
  font-size: 40rpx;
}

.search-bar-input {
  flex: 1;
  font-size: 25rpx;
}

.category-scroll {
  width: calc(100% + 28rpx);
  margin: 20rpx -28rpx 0 0;
  white-space: nowrap;
}

.category-list {
  display: inline-flex;
  padding-right: 28rpx;
  gap: 12rpx;
}

.category-list-item {
  padding: 14rpx 24rpx;
  border: 1rpx solid var(--yzm-line);
  border-radius: 999rpx;
  color: var(--yzm-ink-soft);
  background: rgba(255, 253, 248, 0.55);
  font-size: 22rpx;
}

.category-list-item-active {
  color: #fff;
  border-color: var(--yzm-jade);
  background: var(--yzm-jade);
}

.mall-banner {
  display: flex;
  min-height: 230rpx;
  margin-top: 24rpx;
  padding: 38rpx;
  align-items: center;
  justify-content: space-between;
  border-radius: 30rpx;
  color: #fdf9ee;
  background-color: var(--yzm-ink);
  box-shadow: var(--yzm-shadow);
}

.mall-banner-eyebrow,
.mall-banner-title,
.mall-banner-text {
  display: block;
}

.mall-banner-eyebrow {
  color: #d9b976;
  font-size: 17rpx;
  letter-spacing: 4rpx;
}

.mall-banner-title {
  margin-top: 14rpx;
  font-size: 36rpx;
  font-weight: 650;
}

.mall-banner-text {
  margin-top: 12rpx;
  color: rgba(255, 255, 255, 0.7);
  font-size: 21rpx;
}

.mall-banner-seal {
  display: flex;
  width: 102rpx;
  height: 102rpx;
  align-items: center;
  justify-content: center;
  border: 2rpx solid rgba(217, 185, 118, 0.75);
  border-radius: 50%;
  color: #d9b976;
  font-size: 42rpx;
}

.product-list-section {
  margin-top: 34rpx;
}

.product-list {
  display: grid;
  gap: 18rpx;
}

@media (min-width: 760px) {
  .product-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
