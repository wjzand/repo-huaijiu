import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  GachaRecord,
  CardCollection,
  CoinRecord,
  CoinSourceType,
  MemoryCard,
} from '@/types';
import {
  gachaPrizePool,
  drawPrizeWithPity,
  getRandomCard,
  exchangeRewards,
} from '@/data/gacha';

interface GachaState {
  coins: number;
  coinRecords: CoinRecord[];
  gachaRecords: GachaRecord[];
  cardCollection: CardCollection[];
  pityCount: number;
  lastDailyShareDate: string | null;
  exchangedRewardIds: string[];

  addCoins: (amount: number, sourceType: CoinSourceType, sourceDesc: string) => void;
  canDailyShare: () => boolean;
  markDailyShare: () => void;

  doSingleGacha: () => GachaRecord;
  doTenGacha: () => GachaRecord[];
  addCardPiece: (card: MemoryCard) => CardCollection;
  exchangeDuplicates: () => number;

  canExchangeReward: (rewardId: string) => boolean;
  exchangeReward: (rewardId: string) => boolean;
  getUniqueCardsOwned: () => number;
}

const makeId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

const todayStr = () => new Date().toISOString().slice(0, 10);

export const useGachaStore = create<GachaState>()(
  persist(
    (set, get) => ({
      coins: 0,
      coinRecords: [],
      gachaRecords: [],
      cardCollection: [],
      pityCount: 0,
      lastDailyShareDate: null,
      exchangedRewardIds: [],

      addCoins(amount, sourceType, sourceDesc) {
        const rec: CoinRecord = {
          id: makeId(),
          amount,
          sourceType,
          sourceDesc,
          createdAt: new Date().toISOString(),
        };
        set(s => ({
          coins: s.coins + amount,
          coinRecords: [rec, ...s.coinRecords].slice(0, 100),
        }));
      },

      canDailyShare() {
        return get().lastDailyShareDate !== todayStr();
      },

      markDailyShare() {
        set({ lastDailyShareDate: todayStr() });
      },

      doSingleGacha() {
        const { prize, usedPity } = drawPrizeWithPity(get().pityCount);
        const rec: GachaRecord = {
          id: makeId(),
          prize,
          createdAt: new Date().toISOString(),
        };

        if (prize.type === 'cardpiece') {
          const card = getRandomCard();
          rec.cardPieceId = card.id;
        }

        set(s => {
          const newCollection = [...s.cardCollection];
          if (rec.cardPieceId) {
            const existing = newCollection.find(c => c.cardId === rec.cardPieceId!);
            if (existing) {
              existing.count += 1;
            } else {
              newCollection.push({
                cardId: rec.cardPieceId!,
                count: 1,
                obtainedAt: new Date().toISOString(),
              });
            }
          }
          return {
            coins: s.coins - 1,
            gachaRecords: [rec, ...s.gachaRecords].slice(0, 200),
            cardCollection: newCollection,
            pityCount: usedPity ? 0 : s.pityCount + 1,
          };
        });
        return rec;
      },

      doTenGacha() {
        const results: GachaRecord[] = [];
        let pityCount = get().pityCount;
        const newCollection = [...get().cardCollection];

        for (let i = 0; i < 10; i++) {
          const { prize, usedPity } = drawPrizeWithPity(pityCount);
          const rec: GachaRecord = {
            id: makeId(),
            prize,
            createdAt: new Date().toISOString(),
          };
          if (prize.type === 'cardpiece') {
            const card = getRandomCard();
            rec.cardPieceId = card.id;
            const existing = newCollection.find(c => c.cardId === card.id);
            if (existing) {
              existing.count += 1;
            } else {
              newCollection.push({
                cardId: card.id,
                count: 1,
                obtainedAt: new Date().toISOString(),
              });
            }
          }
          results.push(rec);
          pityCount = usedPity ? 0 : pityCount + 1;
        }

        set(s => ({
          coins: s.coins - 10,
          gachaRecords: [...results, ...s.gachaRecords].slice(0, 200),
          cardCollection: newCollection,
          pityCount,
        }));

        return results;
      },

      addCardPiece(card) {
        let updated: CardCollection | undefined;
        set(s => {
          const newCollection = [...s.cardCollection];
          const existing = newCollection.find(c => c.cardId === card.id);
          if (existing) {
            existing.count += 1;
            updated = existing;
          } else {
            updated = {
              cardId: card.id,
              count: 1,
              obtainedAt: new Date().toISOString(),
            };
            newCollection.push(updated);
          }
          return { cardCollection: newCollection };
        });
        return updated!;
      },

      exchangeDuplicates() {
        let gainedCoins = 0;
        set(s => {
          let extra = 0;
          const newCollection = s.cardCollection.map(c => {
            if (c.count > 1) {
              const dup = c.count - 1;
              extra += dup * 2;
              return { ...c, count: 1 };
            }
            return c;
          });
          gainedCoins = extra;
          if (extra > 0) {
            const rec: CoinRecord = {
              id: makeId(),
              amount: extra,
              sourceType: 'exchange' as CoinSourceType,
              sourceDesc: `重复记忆卡兑换`,
              createdAt: new Date().toISOString(),
            };
            return {
              coins: s.coins + extra,
              coinRecords: [rec, ...s.coinRecords].slice(0, 100),
              cardCollection: newCollection,
            };
          }
          return {};
        });
        return gainedCoins;
      },

      getUniqueCardsOwned() {
        return get().cardCollection.filter(c => c.count > 0).length;
      },

      canExchangeReward(rewardId) {
        const reward = exchangeRewards.find(r => r.id === rewardId);
        if (!reward) return false;
        if (get().exchangedRewardIds.includes(rewardId)) return false;
        return get().getUniqueCardsOwned() >= reward.requiredCards;
      },

      exchangeReward(rewardId) {
        if (!get().canExchangeReward(rewardId)) return false;
        set(s => ({
          exchangedRewardIds: [...s.exchangedRewardIds, rewardId],
        }));
        return true;
      },
    }),
    {
      name: 'zzh_gacha',
      partialize: state => ({
        coins: state.coins,
        coinRecords: state.coinRecords,
        gachaRecords: state.gachaRecords,
        cardCollection: state.cardCollection,
        pityCount: state.pityCount,
        lastDailyShareDate: state.lastDailyShareDate,
        exchangedRewardIds: state.exchangedRewardIds,
      }),
      onRehydrateStorage: () => state => {
        if (state && state.coins === 0 && state.coinRecords.length === 0) {
          state.addCoins(1, 'new_user', '新用户注册赠送');
        }
      },
    },
  ),
);
