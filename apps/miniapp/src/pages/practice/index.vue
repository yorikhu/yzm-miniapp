<template>
  <view class="page-shell">
    <AppHeader title="静心技法" subtitle="把注意力带回此刻" show-logo />
    <PracticeHero />

    <view class="page-section">
      <SectionHeading eyebrow="GUIDED PRACTICE" title="跟随练习" />
      <view class="media-list">
        <MediaCard v-for="item in mockTechniques" :key="item.id" :technique="item" />
      </view>
    </view>

    <MeditationGrid />
    <ReadingList />
    <JournalSection />
  </view>
</template>

<script setup lang="ts">
/**
 * 静心练习页面，组合媒体练习、冥想、阅读与观察日记。
 */
import AppHeader from '@/components/layout/AppHeader.vue';
import SectionHeading from '@/components/base/SectionHeading.vue';
import PracticeHero from './components/PracticeHero.vue';
import MediaCard from './components/MediaCard.vue';
import MeditationGrid from './components/MeditationGrid.vue';
import ReadingList from './components/ReadingList.vue';
import JournalSection from './components/JournalSection.vue';
import { mockTechniques } from '@/services/mock/data';
</script>

<style scoped>
.media-list {
  display: grid;
  gap: 16rpx;
}
</style>
