/**
 * 前端领域模型与组件共享类型定义。
 */

/** 商品艺术图可用的视觉色调。 */
export type ArtworkTone = 'amber' | 'jade' | 'mist' | 'earth' | 'rose';

/** 商品的可购买规格。 */
export interface ProductSku {
  id: string;
  name: string;
  spec: string;
  price: number;
}

/** 商城茶品资料。 */
export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  origin: string;
  coreBenefit: string;
  price: number;
  originalPrice?: number;
  sales: number;
  latitude: string;
  tone: ArtworkTone;
  detail: string;
  skus: ProductSku[];
}

/** 购物车中的单个 SKU 条目。 */
export interface CartItem {
  id: string;
  product: Product;
  skuId: string;
  quantity: number;
  selected: boolean;
}

/** 静心练习媒体内容。 */
export interface Technique {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  format: '音频' | '视频' | '文章';
  duration: string;
  tone: ArtworkTone;
}

/** 用户发布的观察日记。 */
export interface JournalEntry {
  id: string;
  author: string;
  content: string;
  time: string;
  likes: number;
}

/** 个人中心会员资料。 */
export interface UserProfile {
  name: string;
  level: string;
  points: number;
  coupons: number;
}
