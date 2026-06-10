import { create } from 'zustand';
import type { Danmaku } from '@/types';
import { mockDanmakuList } from '@/data/quiz';

interface DanmakuState {
  list: Danmaku[];
  addDanmaku: (d: Omit<Danmaku, 'id' | 'likes' | 'createdAt'>) => void;
  likeDanmaku: (id: string) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

export const useDanmakuStore = create<DanmakuState>((set, get) => ({
  list: [...mockDanmakuList],

  addDanmaku: (d) => {
    const newItem: Danmaku = {
      ...d,
      id: uid(),
      likes: 0,
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
    };
    set({ list: [...get().list, newItem] });
  },

  likeDanmaku: (id) => {
    set({
      list: get().list.map(x =>
        x.id === id ? { ...x, likes: x.likes + 1 } : x
      ),
    });
  },
}));
