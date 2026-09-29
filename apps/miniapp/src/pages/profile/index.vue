<template>
  <view class="page-shell">
    <AppHeader title="我的" subtitle="与一盏茶相处的日子" />
    <ProfileOverview :profile="mockProfile" />
    <view class="profile-section">
      <ProfileOrderPanel />
    </view>
    <view class="profile-section">
      <ProfileMenu :coupons="mockProfile.coupons" @select="showComing" />
    </view>

    <view class="profile-quote">
      <image src="/static/logo.png" mode="aspectFill" />
      <text>愿每一次举杯，都更靠近真实的自己</text>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 个人中心页面，展示会员资料、订单状态与账户功能入口。
 */
import AppHeader from '@/components/layout/AppHeader.vue';
import ProfileOverview from './components/ProfileOverview.vue';
import ProfileOrderPanel from './components/ProfileOrderPanel.vue';
import ProfileMenu from './components/ProfileMenu.vue';
import { mockProfile } from '@/services/mock/data';

/**
 * 为尚未开放的菜单功能显示提示。
 *
 * @param label - 用户选择的功能名称。
 * @returns uni-app 的 Toast 调用结果。
 */
const showComing = (label: string) =>
  uni.showToast({ title: `${label}功能即将开放`, icon: 'none' });
</script>

<style scoped>
.profile-section {
  margin-top: 20rpx;
}

.profile-quote {
  display: flex;
  margin-top: 40rpx;
  align-items: center;
  justify-content: center;
  color: var(--yzm-ink-soft);
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 22rpx;
  gap: 12rpx;
}

.profile-quote image {
  width: 42rpx;
  height: 42rpx;
  border-radius: 50%;
}
</style>
