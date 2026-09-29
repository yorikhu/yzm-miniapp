<template>
  <YzmCard>
    <view
      v-for="item in menus"
      :key="item.label"
      class="menu-row"
      @click="$emit('select', item.label)"
    >
      <view class="menu-row-icon">
        <image :src="item.icon" mode="aspectFit" />
      </view>
      <view class="menu-row-body">
        <text class="menu-row-label">{{ item.label }}</text>
        <text v-if="item.meta" class="menu-row-meta">{{ item.meta }}</text>
      </view>
      <view class="menu-row-arrow" />
    </view>
  </YzmCard>
</template>

<script setup lang="ts">
/**
 * 个人中心菜单组件，展示账户功能入口及附加状态。
 */
import YzmCard from '@/components/base/YzmCard.vue';

const props = defineProps<{ coupons: number }>();
defineEmits<{ select: [label: string] }>();
const menus = [
  { icon: '/static/icons/profile/menu-address.svg', label: '收货地址', meta: '2 个地址' },
  {
    icon: '/static/icons/profile/menu-coupon.svg',
    label: '优惠券',
    meta: `${props.coupons} 张可用`,
  },
  { icon: '/static/icons/profile/menu-journal.svg', label: '我的观察日记', meta: '12 封信' },
  { icon: '/static/icons/profile/menu-support.svg', label: '联系客服', meta: '09:00–20:00' },
  { icon: '/static/icons/profile/menu-settings.svg', label: '设置', meta: '' },
  { icon: '/static/icons/profile/menu-about.svg', label: '关于韵盏茗', meta: '品牌故事' },
];
</script>

<style scoped>
.menu-row {
  display: flex;
  min-height: 108rpx;
  padding: 0 24rpx;
  align-items: center;
  border-bottom: 1rpx solid var(--yzm-line);
  gap: 18rpx;
}

.menu-row:last-child {
  border-bottom: 0;
}

.menu-row-icon {
  display: flex;
  flex: 0 0 60rpx;
  width: 60rpx;
  height: 60rpx;
  align-items: center;
  justify-content: center;
  border-radius: 18rpx;
  background: rgba(21, 94, 80, 0.08);
}

.menu-row-icon image {
  width: 34rpx;
  height: 34rpx;
}

.menu-row-body {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
}

.menu-row-label {
  color: var(--yzm-ink);
  font-size: 28rpx;
  font-weight: 500;
}

.menu-row-meta {
  color: var(--yzm-ink-soft);
  font-size: 22rpx;
}

.menu-row-arrow {
  width: 14rpx;
  height: 14rpx;
  border-top: 2rpx solid rgba(23, 60, 53, 0.5);
  border-right: 2rpx solid rgba(23, 60, 53, 0.5);
  transform: rotate(45deg);
}
</style>
