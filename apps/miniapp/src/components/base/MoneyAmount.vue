<template>
  <text
    class="money-amount"
    :class="{ 'money-amount-strikethrough': strikethrough }"
    :style="moneyStyle"
  >
    <text class="money-amount-symbol">¥</text>
    <text class="money-amount-value">{{ formattedAmount }}</text>
  </text>
</template>

<script setup lang="ts">
/**
 * 统一金额展示组件，处理货币符号间距、千分位和两位小数。
 */
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    amount: number | string;
    size?: number | string;
    color?: string;
    strikethrough?: boolean;
  }>(),
  { size: 'inherit', color: 'var(--yzm-gold)', strikethrough: false },
);

/**
 * 格式化金额：整数不补零，存在小数时保留两位，并添加千分位。
 *
 * @param amount - 原始金额。
 * @returns 用于展示的金额字符串。
 */
const formatMoneyAmount = (amount: number | string) => {
  const numericAmount = Number(String(amount).replace(/,/g, ''));
  if (!Number.isFinite(numericAmount)) return '0';

  const roundedAmount = Math.round((numericAmount + Number.EPSILON) * 100) / 100;
  const fractionDigits = Number.isInteger(roundedAmount) ? 0 : 2;
  const [integer, fraction] = roundedAmount.toFixed(fractionDigits).split('.');
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return fraction ? `${formattedInteger}.${fraction}` : formattedInteger;
};

/**
 * 将数字字号转换为 rpx，字符串字号按原样使用。
 *
 * @param size - 金额文字字号。
 * @returns CSS 可用的字号值。
 */
const normalizeSize = (size: number | string) => (typeof size === 'number' ? `${size}rpx` : size);

/** @returns 已格式化的金额文本。 */
const formattedAmount = computed(() => formatMoneyAmount(props.amount));
/** @returns 金额组件的可配置颜色与字号样式。 */
const moneyStyle = computed(() => ({
  color: props.color,
  fontSize: normalizeSize(props.size),
}));
</script>

<style scoped>
.money-amount {
  display: inline-flex;
  align-items: baseline;
  font-family: 'Times New Roman', Georgia, serif;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}

.money-amount-value {
  margin-left: 7rpx;
}

.money-amount-strikethrough {
  text-decoration: line-through;
}
</style>
