<template>
  <view class="page-shell">
    <AppHeader title="静心技法" subtitle="把注意力带回此刻" show-logo />
    <view class="page-main">
      <CategoryNav />
      <JournalSection />
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 静心练习页面，组合栏目入口与观察日记。
 */
import AppHeader from '@/components/layout/AppHeader.vue';
import CategoryNav from './components/CategoryNav.vue';
import JournalSection from './components/JournalSection.vue';
</script>
