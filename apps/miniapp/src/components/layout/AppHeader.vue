<template>
  <view class="app-header" :style="headerStyle">
    <view class="app-header__inner" :class="{ 'app-header__inner--center': centered }">
      <view
        v-if="back"
        class="app-header__back"
        hover-class="app-header__back--pressed"
        @click="goBack"
      >
        <view class="app-header__back-icon" />
      </view>
      <view class="app-header__brand">
        <image v-if="showLogo" class="app-header__logo" src="/static/logo.png" mode="aspectFill" />
        <view class="app-header__copy">
          <view class="app-header__heading">
            <text class="app-header__title">{{ title }}</text>
            <text v-if="badge !== undefined && badge !== ''" class="app-header__badge">{{
              badge
            }}</text>
          </view>
          <text v-if="subtitle" class="app-header__subtitle">{{ subtitle }}</text>
        </view>
      </view>
      <view v-if="back" class="app-header__spacer" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useNavigation } from '@/composables/useNavigation';

withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    back?: boolean;
    centered?: boolean;
    showLogo?: boolean;
    badge?: string | number;
  }>(),
  { subtitle: '', back: false, centered: false, showLogo: false },
);

const { goBack } = useNavigation();
const statusBarHeight = ref(20);
const navigationHeight = ref(44);
const capsuleInset = ref(0);

onMounted(() => {
  const system = uni.getSystemInfoSync();
  statusBarHeight.value = system.statusBarHeight || 20;

  if (typeof uni.getMenuButtonBoundingClientRect === 'function') {
    // 胶囊位置信息
    const capsule = uni.getMenuButtonBoundingClientRect();
    if (capsule?.height && capsule.top >= statusBarHeight.value) {
      const verticalGap = capsule.top - statusBarHeight.value;
      navigationHeight.value = capsule.height + verticalGap * 2;
      capsuleInset.value = Math.max(0, system.windowWidth - capsule.left - 16);
    }
  }
});

const headerStyle = computed(() => ({
  paddingTop: `${statusBarHeight.value}px`,
  paddingRight: `${capsuleInset.value}px`,
  minHeight: `${statusBarHeight.value + navigationHeight.value}px`,
}));
</script>

<style scoped>
.app-header {
  width: 100%;
}

.app-header__inner {
  display: flex;
  min-height: 88rpx;
  margin-bottom: 24rpx;
  align-items: center;
}

.app-header__inner--center {
  justify-content: space-between;
}

.app-header__inner--center .app-header__brand {
  flex: 1;
  justify-content: center;
  text-align: center;
}

.app-header__back,
.app-header__spacer {
  flex: 0 0 64rpx;
  width: 64rpx;
  height: 64rpx;
}

.app-header__back {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.app-header__back--pressed {
  background: rgba(21, 94, 80, 0.08);
}

.app-header__back-icon {
  width: 20rpx;
  height: 20rpx;
  border-bottom: 3rpx solid var(--yzm-ink);
  border-left: 3rpx solid var(--yzm-ink);
  transform: rotate(45deg);
}

.app-header__brand {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 14rpx;
}

.app-header__logo {
  flex: 0 0 56rpx;
  width: 56rpx;
  height: 56rpx;
  border: 1rpx solid rgba(21, 94, 80, 0.12);
  border-radius: 50%;
}

.app-header__copy {
  min-width: 0;
}

.app-header__heading {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.app-header__title,
.app-header__subtitle {
  display: block;
}

.app-header__title {
  overflow: hidden;
  font-size: 34rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-header__badge {
  flex-shrink: 0;
  min-width: 36rpx;
  height: 36rpx;
  padding: 0 10rpx;
  border-radius: 18rpx;
  color: var(--yzm-jade);
  background: rgba(21, 94, 80, 0.1);
  font-size: 19rpx;
  font-weight: 600;
  line-height: 36rpx;
  text-align: center;
}

.app-header__subtitle {
  overflow: hidden;
  margin-top: 2rpx;
  color: var(--yzm-muted);
  font-size: 18rpx;
  letter-spacing: 2rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
