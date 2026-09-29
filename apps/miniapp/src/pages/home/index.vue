<template>
  <view class="page-shell">
    <AppHeader title="韵盏茗" subtitle="茶里见山，也见自己" show-logo />
    <HomeHero @shop="goTab('mall')" @practice="goTab('practice')" />
    <FounderStory />
    <BrandBeliefs />
    <OriginStory />
    <CraftTimeline />
    <TeaLatitude :products="mockProducts" @shop="goTab('mall')" @select="openProduct" />
  </view>
</template>

<script setup lang="ts">
/**
 * 首页，组合品牌故事、制茶工艺和推荐茶品内容。
 */
import AppHeader from '@/components/layout/AppHeader.vue';
import HomeHero from './components/HomeHero.vue';
import FounderStory from './components/FounderStory.vue';
import BrandBeliefs from './components/BrandBeliefs.vue';
import OriginStory from './components/OriginStory.vue';
import CraftTimeline from './components/CraftTimeline.vue';
import TeaLatitude from './components/TeaLatitude.vue';
import { mockProducts } from '@/services/mock/data';
import { useNavigation } from '@/composables/useNavigation';

const { goTab, goTo } = useNavigation();
/**
 * 打开指定茶品的详情页。
 *
 * @param id - 商品标识。
 * @returns uni-app 的页面跳转结果。
 */
const openProduct = (id: string) => goTo(`/pages/product/detail?id=${id}`);
</script>
