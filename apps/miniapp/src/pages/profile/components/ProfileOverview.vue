<template>
  <view>
    <YzmCard>
      <view class="profile-card">
        <image class="profile-card-avatar" src="/static/logo.png" mode="aspectFill" />
        <view class="profile-card-body">
          <text class="profile-card-name">{{ profile.name }}</text>
          <text class="profile-card-level">会员等级 · {{ profile.level }}</text>
        </view>
        <view class="profile-card-arrow" />
      </view>
    </YzmCard>

    <view class="profile-stats-card">
      <YzmCard flat>
        <view class="profile-stats">
          <view class="profile-stats-item">
            <text class="profile-stats-label">可用积分</text>
            <text class="profile-stats-value">{{ profile.points }}</text>
          </view>
          <view class="profile-stats-divider" />
          <view class="profile-stats-item">
            <text class="profile-stats-label">优惠券</text>
            <text class="profile-stats-value">{{ profile.coupons }} 张</text>
          </view>
          <view class="profile-stats-divider" />
          <view class="profile-stats-item">
            <text class="profile-stats-label">静心日</text>
            <text class="profile-stats-value">21 天</text>
          </view>
        </view>
      </YzmCard>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 个人资料概览组件，展示会员信息、积分和权益数据。
 */
import YzmCard from '@/components/base/YzmCard.vue';
import type { UserProfile } from '@/types';

defineProps<{ profile: UserProfile }>();
</script>

<style scoped>
.profile-card {
  display: flex;
  padding: 28rpx;
  align-items: center;
  gap: 22rpx;
}

.profile-card-avatar {
  width: 104rpx;
  height: 104rpx;
  border: 1rpx solid var(--yzm-line);
  border-radius: 50%;
}

.profile-card-body {
  flex: 1;
}

.profile-card-name,
.profile-card-level {
  display: block;
}

.profile-card-name {
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 32rpx;
  font-weight: 600;
}

.profile-card-level {
  margin-top: 8rpx;
  color: var(--yzm-ink-soft);
  font-size: 23rpx;
}

.profile-card-arrow {
  width: 15rpx;
  height: 15rpx;
  margin-right: 4rpx;
  border-top: 2rpx solid rgba(23, 60, 53, 0.5);
  border-right: 2rpx solid rgba(23, 60, 53, 0.5);
  transform: rotate(45deg);
}

.profile-stats-card {
  margin-top: 16rpx;
}

.profile-stats {
  display: flex;
  padding: 24rpx 0;
  align-items: center;
}

.profile-stats-item {
  display: flex;
  flex: 1 1 0;
  min-width: 0;
  align-items: center;
  flex-direction: column;
}

.profile-stats-label,
.profile-stats-value {
  display: block;
  max-width: 100%;
  white-space: nowrap;
}

.profile-stats-label {
  color: var(--yzm-ink-soft);
  font-size: 22rpx;
}

.profile-stats-value {
  margin-top: 8rpx;
  color: var(--yzm-gold);
  font-family: Georgia, serif;
  font-size: 32rpx;
  font-weight: 600;
}

.profile-stats-divider {
  width: 1rpx;
  height: 48rpx;
  background: var(--yzm-line);
}
</style>
