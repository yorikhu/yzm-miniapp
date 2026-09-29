<template>
  <YzmCard>
    <view
      v-for="item in menus"
      :key="item.label"
      class="menu-row"
      @click="$emit('select', item.label)"
    >
      <text class="menu-row-icon">{{ item.icon }}</text>
      <view class="menu-row-body"
        ><text>{{ item.label }}</text
        ><text>{{ item.meta }}</text></view
      >
      <text class="menu-row-arrow">›</text>
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
  { icon: '址', label: '收货地址', meta: '2 个地址' },
  { icon: '券', label: '优惠券', meta: `${props.coupons} 张可用` },
  { icon: '记', label: '我的观察日记', meta: '12 封信' },
  { icon: '问', label: '联系客服', meta: '09:00–20:00' },
  { icon: '设', label: '设置', meta: '' },
  { icon: '茗', label: '关于韵盏茗', meta: '品牌故事' },
];
</script>

<style scoped>
.menu-row {
  display: flex;
  min-height: 96rpx;
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
  width: 44rpx;
  height: 44rpx;
  align-items: center;
  justify-content: center;
  border: 1rpx solid rgba(21, 94, 80, 0.18);
  border-radius: 50%;
  color: var(--yzm-jade);
  font-size: 18rpx;
}

.menu-row-body {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  font-size: 24rpx;
}

.menu-row-body text:last-child {
  color: var(--yzm-muted);
  font-size: 19rpx;
}

.menu-row-arrow {
  color: var(--yzm-muted);
  font-size: 36rpx;
}
</style>
