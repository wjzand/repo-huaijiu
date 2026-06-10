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

// =========================
// 童年扭蛋机相关类型
// =========================

export type GachaPrizeTier = 'special' | 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'participation';
export type GachaPrizeType = 'giftpack' | 'coupon' | 'snack' | 'cardpiece';

export interface GachaPrize {
  tier: GachaPrizeTier;
  tierName: string;
  type: GachaPrizeType;
  name: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
  probability: number;
  couponId?: string;
  snackId?: string;
}

export interface GachaRecord {
  id: string;
  prize: GachaPrize;
  cardPieceId?: string;
  createdAt: string;
}

export interface MemoryCard {
  id: string;
  name: string;
  emoji: string;
  category: ProductCategory;
  era: Era;
  illustration: string;
  funFact: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  series: string;
}

export interface CardCollection {
  cardId: string;
  count: number;
  obtainedAt: string;
}

export interface ExchangeReward {
  id: string;
  name: string;
  description: string;
  emoji: string;
  requiredCards: number;
  rewardType: 'physical' | 'coupon' | 'certificate';
  value: number;
}

export type CoinSourceType =
  | 'order'
  | 'share_daily'
  | 'quiz_perfect'
  | 'rank_top3'
  | 'new_user'
  | 'card_gift'
  | 'exchange';

export interface CoinRecord {
  id: string;
  amount: number;
  sourceType: CoinSourceType;
  sourceDesc: string;
  createdAt: string;
  expireAt?: string;
}

export const COIN_SOURCE_LABEL: Record<CoinSourceType, string> = {
  order: '下单赠送',
  share_daily: '每日分享',
  quiz_perfect: '答题满分',
  rank_top3: '学神榜TOP3',
  new_user: '新用户注册',
  card_gift: '赠送卡片',
  exchange: '重复卡兑换',
};
