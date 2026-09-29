<template>
  <button
    class="yzm-button"
    :class="[`yzm-button--${variant}`, { 'yzm-button--block': block }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
/**
 * 通用按钮组件，统一按钮变体、块级布局和禁用状态。
 */
withDefaults(
  defineProps<{
    variant?: 'primary' | 'outline' | 'ghost' | 'gold';
    block?: boolean;
    disabled?: boolean;
  }>(),
  { variant: 'primary', block: false, disabled: false },
);

defineEmits<{ click: [] }>();
</script>

<style scoped>
.yzm-button {
  display: inline-flex;
  min-height: 84rpx;
  margin: 0;
  padding: 0 42rpx;
  align-items: center;
  justify-content: center;
  border-radius: 999rpx;
  font-size: 27rpx;
  font-weight: 600;
  line-height: 1;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.yzm-button:active {
  transform: scale(0.98);
}

.yzm-button--block {
  width: 100%;
}

.yzm-button--primary {
  color: #fffdf8;
  background: var(--yzm-jade);
  box-shadow: 0 8rpx 20rpx rgba(16, 75, 64, 0.12);
}

.yzm-button--outline {
  color: var(--yzm-jade-dark);
  border: 2rpx solid var(--yzm-jade);
  background: transparent;
}

.yzm-button--ghost {
  color: var(--yzm-ink-soft);
  background: transparent;
}

.yzm-button--gold {
  color: #fffaf0;
  background: var(--yzm-gold);
}

.yzm-button[disabled] {
  opacity: 0.42;
}
</style>
