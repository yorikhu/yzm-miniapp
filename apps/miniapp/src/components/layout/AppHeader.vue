<template>
  <view class="app-header" :class="{ 'app-header-sticky': isSticky }" :style="headerStyle">
    <view class="app-header-inner" :class="{ 'app-header-inner-center': centered }">
      <view
        v-if="back"
        class="app-header-back"
        hover-class="app-header-back-pressed"
        @click="goBack"
      >
        <view class="app-header-back-icon" />
      </view>
      <view class="app-header-brand">
        <image v-if="showLogo" class="app-header-logo" src="/static/logo.png" mode="aspectFill" />
        <view class="app-header-copy">
          <view class="app-header-heading">
            <text class="app-header-title">{{ title }}</text>
            <text v-if="badge !== undefined && badge !== ''" class="app-header-badge">{{
              badge
            }}</text>
          </view>
          <text v-if="subtitle" class="app-header-subtitle">{{ subtitle }}</text>
        </view>
      </view>
      <view v-if="$slots.action" class="app-header-action">
        <slot name="action" />
      </view>
      <view v-else-if="back" class="app-header-spacer" />
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 应用页头组件，适配状态栏、小程序胶囊、返回入口与标题徽标。
 */
import { computed, onMounted, ref } from 'vue';
import { useNavigation } from '@/composables/useNavigation';

const props = withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    back?: boolean;
    centered?: boolean;
    showLogo?: boolean;
    badge?: string | number;
    sticky?: boolean;
  }>(),
  { subtitle: '', back: false, centered: false, showLogo: false, sticky: false },
);

const { goBack } = useNavigation();
const statusBarHeight = ref(20);
const navigationHeight = ref(44);
const capsuleInset = ref(0);
/** @returns 是否通过组件属性显式启用吸顶。 */
const isSticky = computed(() => props.sticky);

/**
 * 读取设备和胶囊位置，同步页头安全区尺寸。
 *
 * @returns 无返回值。
 */
const syncHeaderMetrics = () => {
  const system = uni.getSystemInfoSync();
  statusBarHeight.value = system.statusBarHeight || 20;

  if (typeof uni.getMenuButtonBoundingClientRect === 'function') {
    const capsule = uni.getMenuButtonBoundingClientRect();
    if (capsule?.height && capsule.top >= statusBarHeight.value) {
      const verticalGap = capsule.top - statusBarHeight.value;
      navigationHeight.value = capsule.height + verticalGap * 2;
      capsuleInset.value = Math.max(0, system.windowWidth - capsule.left - 16);
    }
  }
};

onMounted(syncHeaderMetrics);

/**
 * 生成适配当前设备安全区的页头内联样式。
 *
 * @returns 包含安全区尺寸、胶囊避让距离和标题居中偏移的样式对象。
 */
const headerStyle = computed(() => ({
  paddingTop: `${statusBarHeight.value}px`,
  minHeight: `${statusBarHeight.value + navigationHeight.value}px`,
  '--app-header-capsule-inset': `${capsuleInset.value}px`,
  '--app-header-center-offset': props.centered ? `${capsuleInset.value / 2}px` : '0px',
}));
</script>

<style scoped>
.app-header {
  width: 100%;
  padding-right: var(--app-header-capsule-inset);
}

.app-header-sticky {
  position: sticky;
  z-index: 40;
  top: 0;
  width: calc(100% + var(--yzm-page-gutter) + var(--yzm-page-gutter));
  margin-left: calc(0px - var(--yzm-page-gutter));
  padding-right: calc(var(--yzm-page-gutter) + var(--app-header-capsule-inset));
  padding-left: var(--yzm-page-gutter);
  border-bottom: 1rpx solid rgba(21, 94, 80, 0.08);
  background: rgba(246, 243, 236, 0.94);
  box-shadow: 0 8rpx 24rpx rgba(32, 66, 57, 0.04);
  backdrop-filter: blur(18rpx);
}

.app-header-inner {
  display: flex;
  min-height: 88rpx;
  margin-bottom: 24rpx;
  align-items: center;
}

.app-header-inner-center {
  justify-content: space-between;
}

.app-header-inner-center .app-header-brand {
  flex: 1;
  justify-content: center;
  text-align: center;
}

.app-header-inner-center .app-header-copy {
  transform: translateX(var(--app-header-center-offset));
}

.app-header-back,
.app-header-action,
.app-header-spacer {
  flex: 0 0 64rpx;
  width: 64rpx;
  height: 64rpx;
}

.app-header-action {
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-header-back {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.app-header-back-pressed {
  background: rgba(21, 94, 80, 0.08);
}

.app-header-back-icon {
  width: 20rpx;
  height: 20rpx;
  border-bottom: 3rpx solid var(--yzm-ink);
  border-left: 3rpx solid var(--yzm-ink);
  transform: rotate(45deg);
}

.app-header-brand {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 14rpx;
}

.app-header-logo {
  flex: 0 0 56rpx;
  width: 56rpx;
  height: 56rpx;
  border: 1rpx solid rgba(21, 94, 80, 0.12);
  border-radius: 50%;
}

.app-header-copy {
  min-width: 0;
}

.app-header-heading {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.app-header-title,
.app-header-subtitle {
  display: block;
}

.app-header-title {
  overflow: hidden;
  font-size: 34rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-header-badge {
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

.app-header-subtitle {
  overflow: hidden;
  margin-top: 2rpx;
  color: var(--yzm-muted);
  font-size: 18rpx;
  letter-spacing: 2rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
