export type ProductCategory = 'snack' | 'toy' | 'stationery' | 'seasonal';

export type Era = '80s' | '90s' | '00s';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  nostalgiaStars: 1 | 2 | 3 | 4 | 5;
  era: Era;
  memoryStory: string;
  coldKnowledge?: string;
  sales: number;
  stock: number;
  tags: string[];
  reviews?: Review[];
}

export interface Review {
  id: string;
  nickname: string;
  avatar: string;
  image: string;
  comment: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'completed';

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  address: Address;
  createdAt: string;
  danmakuMessage?: string;
  danmakuAge?: number;
  paidAt?: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

export type QuestionType = 'image' | 'price' | 'brand' | 'sound';

export interface Question {
  id: string;
  type: QuestionType;
  content: string;
  image?: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Danmaku {
  id: string;
  city: string;
  nickname: string;
  productName: string;
  message: string;
  age: number;
  likes: number;
  createdAt: string;
}

export type CouponType = 'threshold' | 'shipping' | 'nothreshold';

export interface Coupon {
  id: string;
  name: string;
  type: CouponType;
  value: number;
  threshold?: number;
  expireAt: string;
  used: boolean;
  code?: string;
}

export interface QuizRecord {
  date: string;
  correctCount: number;
  totalQuestions: number;
  reward?: Coupon;
  rank?: number;
}

export interface RankingItem {
  rank: number;
  nickname: string;
  avatar: string;
  city: string;
  score: number;
  title: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
  link: string;
}

export type SortType = 'default' | 'price_asc' | 'price_desc' | 'sales' | 'newest' | 'nostalgia';

export const CATEGORY_INFO: Record<ProductCategory, { name: string; emoji: string; color: string; bg: string }> = {
  snack: { name: '零食铺', emoji: '🍬', color: 'text-rust-500', bg: 'from-retro-pink/30 to-warm-200' },
  toy: { name: '玩具摊', emoji: '🪀', color: 'text-wood-600', bg: 'from-retro-blue/30 to-warm-200' },
  stationery: { name: '文具柜', emoji: '✏️', color: 'text-kraft-600', bg: 'from-mint-200 to-warm-200' },
  seasonal: { name: '季节限定', emoji: '🎄', color: 'text-warm-600', bg: 'from-retro-yellow/30 to-warm-200' },
};

export const ERA_LABEL: Record<Era, string> = {
  '80s': '80年代',
  '90s': '90年代',
  '00s': '00年代',
};
