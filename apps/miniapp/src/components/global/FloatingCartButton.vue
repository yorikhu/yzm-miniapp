<template>
  <movable-area class="floating-cart-area" :style="areaStyle">
    <movable-view
      v-if="ready"
      class="floating-cart-movable"
      direction="all"
      :x="position.x"
      :y="position.y"
      :damping="30"
      :animation="true"
      :inertia="false"
      :out-of-bounds="false"
      @change="handleChange"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="handleClick"
    >
      <view class="floating-cart-button" role="button" aria-label="打开购物车">
        <image src="/static/icons/cart-active.png" mode="aspectFit" />
      </view>
    </movable-view>
  </movable-area>
</template>

<script setup lang="ts">
/**
 * 全局可拖动购物车悬浮按钮，限制在可视区域内并在松手后吸附至左右边缘。
 */
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue';
import { useNavigation } from '@/composables/useNavigation';

const BUTTON_SIZE_RPX = 80;
const EDGE_GAP_RPX = 24;
const BOTTOM_GAP_RPX = 48;
const DRAG_THRESHOLD_PX = 6;

interface MovableChangeEvent {
  detail: {
    x: number;
    y: number;
    source?: string;
  };
}

interface TouchPoint {
  clientX: number;
  clientY: number;
}

interface ComponentTouchEvent {
  touches: TouchPoint[];
  changedTouches: TouchPoint[];
}

const { goTab } = useNavigation();
const ready = ref(false);
const moved = ref(false);
const areaTop = ref(0);
const areaHeight = ref(0);
const dockSide = ref<'left' | 'right'>('right');
const dragStart = reactive({ x: 0, y: 0 });
const position = reactive({ x: 0, y: 0 });
const latestPosition = reactive({ x: 0, y: 0 });
const bounds = reactive({ edge: 0, maxX: 0, maxY: 0, initialY: 0 });
let snapTimer: ReturnType<typeof setTimeout> | undefined;
/** @returns 从页头安全边距下方开始、覆盖剩余屏幕高度的拖动区域样式。 */
const areaStyle = computed(() => ({
  top: `${areaTop.value}px`,
  height: `${areaHeight.value}px`,
}));

/**
 * 将数值限制在给定区间内。
 *
 * @param value - 待限制的数值。
 * @param min - 最小值。
 * @param max - 最大值。
 * @returns 限制后的数值。
 */
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * 将设计稿 rpx 尺寸换算为当前屏幕像素。
 *
 * @param value - 设计稿中的 rpx 数值。
 * @returns 换算后的像素值。
 */
const rpxToPx = (value: number) => uni.upx2px(value);

/**
 * 查询当前页面 Header 的实际底边位置。
 *
 * @returns Header 底边相对屏幕顶部的像素距离，查询失败时返回 0。
 */
const measureHeaderBottom = () =>
  new Promise<number>((resolve) => {
    uni
      .createSelectorQuery()
      .select('.app-header')
      .boundingClientRect((rect) => {
        const headerRect = rect as { bottom?: number } | null;
        resolve(typeof headerRect?.bottom === 'number' ? headerRect.bottom : 0);
      })
      .exec();
  });

/**
 * 使用与 AppHeader 一致的状态栏和胶囊规则计算页头最小高度。
 *
 * @returns 页头底边相对屏幕顶部的最小像素距离。
 */
const calculateHeaderBottom = () => {
  const system = uni.getSystemInfoSync();
  const statusBarHeight = system.statusBarHeight || 20;
  let navigationHeight = 44;

  if (typeof uni.getMenuButtonBoundingClientRect === 'function') {
    const capsule = uni.getMenuButtonBoundingClientRect();
    if (capsule?.height && capsule.top >= statusBarHeight) {
      navigationHeight = capsule.height + (capsule.top - statusBarHeight) * 2;
    }
  }

  const headerContentHeight = rpxToPx(96);
  return statusBarHeight + Math.max(navigationHeight, headerContentHeight);
};

/**
 * 读取屏幕与安全区尺寸，初始化或校正悬浮按钮位置。
 *
 * @param initial - 是否执行首次定位。
 * @returns 无返回值。
 */
const syncBounds = (initial = false) => {
  const system = uni.getSystemInfoSync();
  let windowWidth = system.windowWidth;
  let windowHeight = system.windowHeight;
  // #ifdef H5
  windowWidth = document.documentElement.clientWidth;
  windowHeight = window.innerHeight;
  // #endif
  const buttonSize = rpxToPx(BUTTON_SIZE_RPX);
  const edge = rpxToPx(EDGE_GAP_RPX);
  const bottomGap = rpxToPx(BOTTOM_GAP_RPX);
  const safeBottom = system.safeAreaInsets?.bottom ?? 0;
  areaHeight.value = Math.max(buttonSize + edge * 2, windowHeight - areaTop.value);

  bounds.edge = edge;
  bounds.maxX = Math.max(edge, windowWidth - buttonSize - edge);
  bounds.maxY = Math.max(edge, areaHeight.value - buttonSize - edge);
  bounds.initialY = clamp(
    areaHeight.value - buttonSize - bottomGap - safeBottom,
    edge,
    bounds.maxY,
  );

  position.x = dockSide.value === 'left' ? bounds.edge : bounds.maxX;
  position.y = initial ? bounds.initialY : clamp(position.y, bounds.edge, bounds.maxY);
  latestPosition.x = position.x;
  latestPosition.y = position.y;
  ready.value = true;
};

/**
 * 重新测量页头与屏幕尺寸，并同步悬浮按钮可拖动范围。
 *
 * @param initial - 是否执行首次定位。
 * @returns 无返回值。
 */
const refreshLayout = async (initial = false) => {
  await nextTick();
  const measuredHeaderBottom = await measureHeaderBottom();
  const safeHeaderBottom = Math.max(measuredHeaderBottom, calculateHeaderBottom());
  areaTop.value = safeHeaderBottom + rpxToPx(EDGE_GAP_RPX);
  syncBounds(initial);
};

/**
 * 同步原生拖动组件回传的实时坐标。
 *
 * @param event - movable-view 位置变化事件。
 * @returns 无返回值。
 */
const handleChange = (event: MovableChangeEvent) => {
  if (event.detail.source === 'touch') moved.value = true;
  latestPosition.x = clamp(event.detail.x, 0, bounds.maxX + bounds.edge);
  latestPosition.y = clamp(event.detail.y, 0, bounds.maxY + bounds.edge);
};

/**
 * 记录手势起点，用于区分点击与拖动。
 *
 * @param event - 触摸开始事件。
 * @returns 无返回值。
 */
const handleTouchStart = (event: ComponentTouchEvent) => {
  if (snapTimer) clearTimeout(snapTimer);
  const touch = event.touches[0];
  if (!touch) return;
  dragStart.x = touch.clientX;
  dragStart.y = touch.clientY;
  moved.value = false;
};

/**
 * 根据手指位移标记当前手势是否为拖动。
 *
 * @param event - 触摸移动事件。
 * @returns 无返回值。
 */
const handleTouchMove = (event: ComponentTouchEvent) => {
  const touch = event.touches[0];
  if (!touch || moved.value) return;
  const distanceX = Math.abs(touch.clientX - dragStart.x);
  const distanceY = Math.abs(touch.clientY - dragStart.y);
  moved.value = distanceX > DRAG_THRESHOLD_PX || distanceY > DRAG_THRESHOLD_PX;
};

/**
 * 保留当前高度并将悬浮按钮吸附到最近的左右安全边缘。
 *
 * @returns 无返回值。
 */
const snapToNearestEdge = () => {
  const horizontalMidpoint = (bounds.maxX + bounds.edge) / 2;
  const retainedY = clamp(latestPosition.y, bounds.edge, bounds.maxY);
  const targetX = latestPosition.x <= horizontalMidpoint ? bounds.edge : bounds.maxX;
  dockSide.value = targetX === bounds.edge ? 'left' : 'right';

  position.x = latestPosition.x;
  position.y = retainedY;
  nextTick(() => {
    position.x = targetX;
    latestPosition.x = targetX;
    latestPosition.y = retainedY;
  });
};

/**
 * 等待原生拖动组件回传最终坐标后执行吸附。
 *
 * @returns 无返回值。
 */
const handleTouchEnd = () => {
  snapTimer = setTimeout(snapToNearestEdge, 0);
};

/**
 * 在非拖动点击时进入购物车页面。
 *
 * @returns 无返回值。
 */
const handleClick = () => {
  if (!moved.value) goTab('cart');
};

/**
 * 在窗口尺寸变化时重新计算边界，防止按钮停留在可视区域外。
 *
 * @returns 无返回值。
 */
const handleWindowResize = () => void refreshLayout();

onMounted(() => {
  void refreshLayout(true);
  if (typeof uni.onWindowResize === 'function') uni.onWindowResize(handleWindowResize);
});

onUnmounted(() => {
  if (snapTimer) clearTimeout(snapTimer);
  if (typeof uni.offWindowResize === 'function') uni.offWindowResize(handleWindowResize);
});
</script>

<style scoped>
.floating-cart-area {
  position: fixed;
  z-index: 60;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.floating-cart-movable {
  width: 80rpx;
  height: 80rpx;
  pointer-events: auto;
}

.floating-cart-button {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 15rpx;
  align-items: center;
  justify-content: center;
  border: 1rpx solid rgba(21, 94, 80, 0.18);
  border-radius: 50%;
  background: rgba(255, 253, 248, 0.98);
  box-shadow: 0 14rpx 36rpx rgba(23, 60, 53, 0.2);
}

.floating-cart-button image {
  width: 48rpx;
  height: 48rpx;
}
</style>
