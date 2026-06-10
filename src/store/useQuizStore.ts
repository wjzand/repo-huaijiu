import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Question, Coupon, QuizRecord } from '@/types';
import { getRandomQuestions, rankingList } from '@/data/quiz';
import { rankingList as rList } from '@/data/quiz';

type QuizPhase = 'idle' | 'answering' | 'finished';

interface QuizState {
  today: string;
  dailyChances: number;
  currentQuestions: Question[];
  currentIndex: number;
  correctCount: number;
  selectedIndexes: (number | null)[];
  showExplanation: boolean;
  phase: QuizPhase;
  reward: Coupon | null;
  ranking: typeof rankingList;

  startQuiz: () => boolean;
  selectAnswer: (index: number) => void;
  nextQuestion: () => void;
  finishQuiz: () => QuizRecord;
  resetQuiz: () => void;
  drawReward: () => Coupon | null;
  canPlayToday: () => boolean;
}

const TOTAL_CHANCES = 3;
const PASS_COUNT = 3;

const todayStr = () => new Date().toISOString().slice(0, 10);

const genCoupon = (): Coupon => {
  const pool: Coupon[] = [
    { id: '', name: '满30减10券', type: 'threshold', value: 10, threshold: 30, expireAt: getExpire(7), used: false },
    { id: '', name: '满50减20券', type: 'threshold', value: 20, threshold: 50, expireAt: getExpire(7), used: false },
    { id: '', name: '5元无门槛券', type: 'nothreshold', value: 5, expireAt: getExpire(14), used: false },
    { id: '', name: '包邮券', type: 'shipping', value: 8, expireAt: getExpire(30), used: false },
  ];
  return pool[Math.floor(Math.random() * pool.length)];
};

const getExpire = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      today: todayStr(),
      dailyChances: TOTAL_CHANCES,
      currentQuestions: [],
      currentIndex: 0,
      correctCount: 0,
      selectedIndexes: [],
      showExplanation: false,
      phase: 'idle',
      reward: null,
      ranking: rList,

      canPlayToday: () => {
        const s = get();
        if (s.today !== todayStr()) return true;
        return s.dailyChances > 0;
      },

      startQuiz: () => {
        const s = get();
        // 跨天重置
        if (s.today !== todayStr()) {
          set({ today: todayStr(), dailyChances: TOTAL_CHANCES });
        }
        if (get().dailyChances <= 0) return false;
        const qs = getRandomQuestions(5);
        set({
          currentQuestions: qs,
          currentIndex: 0,
          correctCount: 0,
          selectedIndexes: new Array(qs.length).fill(null),
          showExplanation: false,
          phase: 'answering',
          reward: null,
          dailyChances: get().dailyChances - 1,
        });
        return true;
      },

      selectAnswer: (index) => {
        const s = get();
        if (s.showExplanation) return;
        const arr = [...s.selectedIndexes];
        arr[s.currentIndex] = index;
        const correct = s.currentQuestions[s.currentIndex].answerIndex === index;
        set({
          selectedIndexes: arr,
          correctCount: correct ? s.correctCount + 1 : s.correctCount,
          showExplanation: true,
        });
      },

      nextQuestion: () => {
        const s = get();
        if (s.currentIndex < s.currentQuestions.length - 1) {
          set({ currentIndex: s.currentIndex + 1, showExplanation: false });
        }
      },

      finishQuiz: () => {
        set({ phase: 'finished' });
        const s = get();
        return {
          date: todayStr(),
          correctCount: s.correctCount,
          totalQuestions: s.currentQuestions.length,
          reward: s.reward ?? undefined,
        };
      },

      drawReward: () => {
        const s = get();
        if (s.correctCount >= PASS_COUNT && !s.reward) {
          const c = genCoupon();
          set({ reward: c });
          return c;
        }
        return null;
      },

      resetQuiz: () => {
        set({
          phase: 'idle',
          currentQuestions: [],
          currentIndex: 0,
          correctCount: 0,
          selectedIndexes: [],
          showExplanation: false,
          reward: null,
        });
      },
    }),
    {
      name: 'zzh_quiz',
      partialize: (s) => ({
        today: s.today,
        dailyChances: s.dailyChances,
        ranking: s.ranking,
      }),
    }
  )
);
