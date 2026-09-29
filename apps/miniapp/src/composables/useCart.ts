import { computed, ref } from 'vue';
import { mockProducts } from '@/services/mock/data';
import type { CartItem, Product } from '@/types';

const items = ref<CartItem[]>(
  mockProducts.slice(0, 3).map((product, index) => ({
    id: `${product.id}-${product.skus[0].id}`,
    product,
    skuId: product.skus[0].id,
    quantity: index === 1 ? 2 : 1,
    selected: index !== 2,
  })),
);

export function useCart() {
  const selectedItems = computed(() => items.value.filter((item) => item.selected));
  const selectedCount = computed(() => selectedItems.value.length);
  const total = computed(() =>
    selectedItems.value.reduce((sum, item) => {
      const sku = item.product.skus.find((candidate) => candidate.id === item.skuId);
      return sum + (sku?.price ?? item.product.price) * item.quantity;
    }, 0),
  );
  const allSelected = computed(
    () => items.value.length > 0 && items.value.every((item) => item.selected),
  );

  const addToCart = (product: Product, skuId: string, quantity = 1) => {
    const itemId = `${product.id}-${skuId}`;
    const existing = items.value.find((item) => item.id === itemId);
    if (existing) existing.quantity += quantity;
    else items.value.push({ id: itemId, product, skuId, quantity, selected: true });
    uni.showToast({ title: '已加入购物车', icon: 'success' });
  };

  const updateQuantity = (id: string, quantity: number) => {
    const item = items.value.find((candidate) => candidate.id === id);
    if (item) item.quantity = Math.max(1, quantity);
  };

  const toggleItem = (id: string) => {
    const item = items.value.find((candidate) => candidate.id === id);
    if (item) item.selected = !item.selected;
  };

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
