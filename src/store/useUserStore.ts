import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order, Address, Coupon, QuizRecord, Danmaku } from '@/types';
import { mockCoupons } from '@/data/quiz';

interface UserState {
  orders: Order[];
  favorites: string[];
  coupons: Coupon[];
  addresses: Address[];
  danmakuRecords: Danmaku[];
  quizRecords: QuizRecord[];

  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  addCoupon: (coupon: Coupon) => void;
  useCoupon: (couponId: string) => void;

  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  getDefaultAddress: () => Address | undefined;

  addQuizRecord: (record: QuizRecord) => void;
  addDanmakuRecord: (danmaku: Danmaku) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

const defaultAddresses: Address[] = [
  {
    id: 'addr_demo', name: '小明', phone: '138****8888',
    province: '北京市', city: '北京市', district: '朝阳区',
    detail: '三里屯怀旧胡同88号童年杂货铺', isDefault: true,
  },
];

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      orders: [],
      favorites: [],
      coupons: mockCoupons,
      addresses: defaultAddresses,
      danmakuRecords: [],
      quizRecords: [],

      toggleFavorite: (pid) => {
        const { favorites } = get();
        if (favorites.includes(pid)) {
          set({ favorites: favorites.filter(x => x !== pid) });
        } else {
          set({ favorites: [...favorites, pid] });
        }
      },
      isFavorite: (pid) => get().favorites.includes(pid),

      addOrder: (order) => set({ orders: [order, ...get().orders] }),
      updateOrderStatus: (oid, status) =>
        set({
          orders: get().orders.map(o =>
            o.id === oid ? { ...o, status } : o
          ),
        }),

      addCoupon: (c) => set({ coupons: [{ ...c, id: uid() }, ...get().coupons] }),
      useCoupon: (cid) =>
        set({
          coupons: get().coupons.map(c =>
            c.id === cid ? { ...c, used: true } : c
          ),
        }),

      addAddress: (addr) => {
        const newAddr: Address = { ...addr, id: uid() };
        const list = get().addresses;
        if (newAddr.isDefault || list.length === 0) {
          set({
            addresses: [newAddr, ...list.map(a => ({ ...a, isDefault: false }))],
          });
        } else {
          set({ addresses: [...list, newAddr] });
        }
      },
      updateAddress: (addr) => {
        set({
          addresses: get().addresses
            .map(a => a.id === addr.id ? addr : { ...a, isDefault: addr.isDefault ? false : a.isDefault }),
        });
      },
      removeAddress: (id) =>
        set({ addresses: get().addresses.filter(a => a.id !== id) }),
      setDefaultAddress: (id) =>
        set({
          addresses: get().addresses.map(a => ({
            ...a, isDefault: a.id === id,
          })),
        }),
      getDefaultAddress: () => get().addresses.find(a => a.isDefault) || get().addresses[0],

      addQuizRecord: (r) => set({ quizRecords: [r, ...get().quizRecords] }),
      addDanmakuRecord: (d) => set({ danmakuRecords: [d, ...get().danmakuRecords] }),
    }),
    {
      name: 'zzh_user',
      partialize: (s) => ({
        orders: s.orders,
        favorites: s.favorites,
        coupons: s.coupons,
        addresses: s.addresses,
        danmakuRecords: s.danmakuRecords,
        quizRecords: s.quizRecords,
      }),
    }
  )
);
