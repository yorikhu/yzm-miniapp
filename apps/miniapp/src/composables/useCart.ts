/**
 * 购物车组合式状态，统一管理 SKU、选中状态、数量与金额。
 */
import { computed, ref } from 'vue';
import { mockProducts } from '@/services/mock/data';
import type { CartItem, Product } from '@/types';

/**
 * 根据模拟商品创建初始购物车条目。
 *
 * @param product - 用于生成购物车条目的商品。
 * @param index - 商品在初始列表中的位置。
 * @returns 初始购物车条目。
 */
const createInitialCartItem = (product: Product, index: number): CartItem => ({
  id: `${product.id}-${product.skus[0].id}`,
  product,
  skuId: product.skus[0].id,
  quantity: index === 1 ? 2 : 1,
  selected: index !== 2,
});

const items = ref<CartItem[]>(mockProducts.slice(0, 3).map(createInitialCartItem));

/**
 * 提供购物车的响应式数据、派生状态和操作方法。
 *
 * @returns 购物车状态与操作集合。
 */
export function useCart() {
  /** @returns 当前已选中的 SKU 条目。 */
  const selectedItems = computed(() => items.value.filter((item) => item.selected));
  /** @returns 已选中的 SKU 种类数。 */
  const selectedCount = computed(() => selectedItems.value.length);
  /** @returns 已选商品按购买数量计算的总金额。 */
  const total = computed(() =>
    selectedItems.value.reduce((sum, item) => {
      const sku = item.product.skus.find((candidate) => candidate.id === item.skuId);
      return sum + (sku?.price ?? item.product.price) * item.quantity;
    }, 0),
  );
  /** @returns 购物车非空且所有 SKU 均已选中时返回 true。 */
  const allSelected = computed(
    () => items.value.length > 0 && items.value.every((item) => item.selected),
  );

  /**
   * 将指定 SKU 加入购物车，重复 SKU 累加数量。
   *
   * @param product - 待加入的商品。
   * @param skuId - 待加入的 SKU 标识。
   * @param quantity - 本次加入的数量，默认为 1。
   * @returns 无返回值。
   */
  const addToCart = (product: Product, skuId: string, quantity = 1) => {
    const itemId = `${product.id}-${skuId}`;
    const existing = items.value.find((item) => item.id === itemId);
    if (existing) existing.quantity += quantity;
    else items.value.push({ id: itemId, product, skuId, quantity, selected: true });
    uni.showToast({ title: '已加入购物车', icon: 'success' });
  };

  /**
   * 更新购物车条目的购买数量。
   *
   * @param id - 购物车条目标识。
   * @param quantity - 新数量，最小为 1。
   * @returns 无返回值。
   */
  const updateQuantity = (id: string, quantity: number) => {
    const item = items.value.find((candidate) => candidate.id === id);
    if (item) item.quantity = Math.max(1, quantity);
  };

  /**
   * 切换指定购物车条目的选中状态。
   *
   * @param id - 购物车条目标识。
   * @returns 无返回值。
   */
  const toggleItem = (id: string) => {
    const item = items.value.find((candidate) => candidate.id === id);
    if (item) item.selected = !item.selected;
  };

  /**
   * 在全选和全部取消之间切换。
   *
   * @returns 无返回值。
   */
  const toggleAll = () => {
    const nextValue = !allSelected.value;
    items.value.forEach((item) => (item.selected = nextValue));
  };

  return {
    items,
    selectedItems,
    selectedCount,
    total,
    allSelected,
    addToCart,
    updateQuantity,
    toggleItem,
    toggleAll,
  };
}
