<template>
  <view>
    <YzmCard>
      <view class="profile-card">
        <image class="profile-card__avatar" src="/static/logo.png" mode="aspectFill" />
        <view class="profile-card__body">
          <text class="profile-card__name">{{ profile.name }}</text>
          <text class="profile-card__level">会员等级 · {{ profile.level }}</text>
        </view>
        <text class="profile-card__arrow">›</text>
      </view>
    </YzmCard>

    <view class="profile-stats-card">
      <YzmCard flat>
        <view class="profile-stats">
          <view class="profile-stats__item">
            <text class="profile-stats__label">可用积分</text>
            <text class="profile-stats__value">{{ profile.points }}</text>
          </view>
          <view class="profile-stats__divider" />
          <view class="profile-stats__item">
            <text class="profile-stats__label">优惠券</text>
            <text class="profile-stats__value">{{ profile.coupons }} 张</text>
          </view>
          <view class="profile-stats__divider" />
          <view class="profile-stats__item">
            <text class="profile-stats__label">静心日</text>
            <text class="profile-stats__value">21 天</text>
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

.profile-card__avatar {
  width: 104rpx;
  height: 104rpx;
  border: 1rpx solid var(--yzm-line);
  border-radius: 50%;
}

.profile-card__body {
  flex: 1;
}

.profile-card__name,
.profile-card__level {
  display: block;
}

.profile-card__name {
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 32rpx;
  font-weight: 600;
}

.profile-card__level {
  margin-top: 8rpx;
  color: var(--yzm-muted);
  font-size: 21rpx;
}

.profile-card__arrow {
  color: var(--yzm-muted);
  font-size: 38rpx;
}

.profile-stats-card {
  margin-top: 16rpx;
}

.profile-stats {
  display: flex;
  padding: 24rpx 0;
  align-items: center;
}

.profile-stats__item {
  display: flex;
  flex: 1 1 0;
  min-width: 0;
  align-items: center;
  flex-direction: column;
}

.profile-stats__label,
.profile-stats__value {
  display: block;
  max-width: 100%;
  white-space: nowrap;
}

.profile-stats__label {
  color: var(--yzm-muted);
  font-size: 18rpx;
}

.profile-stats__value {
  margin-top: 8rpx;
  color: var(--yzm-gold);
  font-family: Georgia, serif;
  font-size: 29rpx;
  font-weight: 600;
}

.profile-stats__divider {
  width: 1rpx;
  height: 48rpx;
  background: var(--yzm-line);
}
</style>
