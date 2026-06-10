import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Gift, Sparkles, Coins, RotateCcw, Lock, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGachaStore } from '@/store/useGachaStore';
import { memoryCards, exchangeRewards, getCardById } from '@/data/gacha';
import type { MemoryCard } from '@/types';
import Header from '@/components/layout/Header';

const RARITY_COLORS: Record<MemoryCard['rarity'], { label: string; bg: string; text: string; border: string; glow: string }> = {
  common:    { label: '普通', bg: 'from-gray-100 to-gray-200',      text: 'text-gray-700',   border: 'border-gray-400',    glow: '' },
  rare:      { label: '稀有', bg: 'from-sky-100 to-blue-200',       text: 'text-blue-800',   border: 'border-blue-500',    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.45)]' },
  epic:      { label: '史诗', bg: 'from-fuchsia-100 to-purple-300', text: 'text-purple-900', border: 'border-purple-600',  glow: 'shadow-[0_0_28px_rgba(168,85,247,0.55)]' },
  legendary: { label: '传说', bg: 'from-amber-100 to-yellow-300',   text: 'text-amber-900',  border: 'border-amber-600',   glow: 'shadow-[0_0_38px_rgba(245,158,11,0.65)]' },
};

export default function CardBook() {
  const navigate = useNavigate();
  const store = useGachaStore();
  const [selected, setSelected] = useState<MemoryCard | null>(null);
  const [showExchange, setShowExchange] = useState(false);
  const [filter, setFilter] = useState<'all' | MemoryCard['rarity']>('all');

  const ownedUnique = store.getUniqueCardsOwned();
  const progress = (ownedUnique / memoryCards.length) * 100;
  const totalDupCoins = store.cardCollection.reduce((s, c) => s + Math.max(0, c.count - 1) * 2, 0);

  const filteredCards = useMemo(() => {
    if (filter === 'all') return memoryCards;
    return memoryCards.filter(c => c.rarity === filter);
  }, [filter]);

  return (
    <div className="min-h-screen pb-28 bg-gradient-to-b from-[#2C1810] via-[#3E2416] to-[#1A0F08]">
      <Header title="童年记忆卡册" />

      <div className="px-4 pt-4">
        <div className="wood-shelf rounded-2xl p-1">
          <div className="rounded-xl bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 px-4 py-4 relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-600 border-4 border-white flex items-center justify-center shadow-lg text-2xl">
                📚
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-handwriting text-lg text-wood-800">收藏进度</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="font-typewriter text-2xl font-bold text-rose-600 leading-none">
                    {ownedUnique}
                    <span className="text-base text-kraft-500">/{memoryCards.length}</span>
                  </div>
                  <span className="text-xs text-wood-600 font-handwriting">（共{memoryCards.length}张）</span>
                </div>
              </div>
            </div>

            <div className="h-3 rounded-full bg-warm-200 border-2 border-wood-500 overflow-hidden mb-3">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  if (totalDupCoins === 0) return;
                  const gained = store.exchangeDuplicates();
                  if (gained > 0) {
                    window.alert(`成功兑换 ${gained} 枚童年硬币！`);
                  }
                }}
                className={cn(
                  'flex items-center justify-center gap-1.5 rounded-xl border-2 py-2 font-handwriting text-sm transition-all',
                  totalDupCoins > 0
                    ? 'bg-gradient-to-b from-sky-400 to-sky-600 text-white border-sky-800 active:translate-y-[1px] shadow-md'
                    : 'bg-gray-200 text-gray-500 border-gray-400 cursor-not-allowed'
                )}
              >
                <RotateCcw size={14} />
                兑换重复卡
                {totalDupCoins > 0 && <Coins size={12} />}
                {totalDupCoins > 0 && <span className="font-typewriter font-bold text-xs">+{totalDupCoins}</span>}
              </button>
              <button
                onClick={() => setShowExchange(true)}
                className="flex items-center justify-center gap-1.5 rounded-xl border-2 py-2 font-handwriting text-sm bg-gradient-to-b from-amber-400 to-orange-500 text-white border-orange-700 active:translate-y-[1px] shadow-md"
              >
                <Gift size={14} />
                兑换奖励
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar -mx-1 px-1">
          {(['all', 'common', 'rare', 'epic', 'legendary'] as const).map(r => {
            const count = r === 'all' ? memoryCards.length : memoryCards.filter(c => c.rarity === r).length;
            const owned = r === 'all'
              ? ownedUnique
              : memoryCards.filter(c => c.rarity === r && store.cardCollection.find(x => x.cardId === c.id)).length;
            const label = r === 'all' ? '全部' : RARITY_COLORS[r].label;
            return (
              <button
                key={r}
                onClick={() => setFilter(r)}
                className={cn(
                  'flex-shrink-0 px-3 py-1.5 rounded-full border-2 text-xs font-handwriting transition-all',
                  filter === r
                    ? 'bg-rose-500 text-white border-rose-700 shadow-md'
                    : 'bg-warm-100 text-wood-700 border-kraft-400'
                )}
              >
                {label} {owned}/{count}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 pt-4 pb-6">
        <div className="grid grid-cols-3 gap-3">
          {filteredCards.map(card => {
            const col = store.cardCollection.find(x => x.cardId === card.id);
            const owned = !!col;
            const count = col?.count ?? 0;
            const rc = RARITY_COLORS[card.rarity];

            return (
              <button
                key={card.id}
                onClick={() => setSelected(card)}
                className={cn(
                  'relative aspect-[3/4] rounded-xl overflow-hidden border-3 transition-all',
                  owned
                    ? `bg-gradient-to-br ${rc.bg} ${rc.border} ${rc.glow} hover:scale-[1.03] active:scale-95`
                    : 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-gray-700 opacity-85'
                )}
              >
                <div className="absolute inset-0 p-1.5 flex flex-col">
                  <div className={cn(
                    'flex justify-between items-center mb-1',
                    owned ? 'opacity-100' : 'opacity-60'
                  )}>
                    <span className={cn(
                      'px-1.5 py-0.5 rounded-full text-[9px] font-handwriting border flex-shrink-0',
                      owned
                        ? `${rc.text} bg-white/70 border-current`
                        : 'text-gray-400 bg-black/30 border-gray-600'
                    )}>
                      {rc.label}
                    </span>
                    {owned && count > 1 && (
                      <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-typewriter font-bold flex items-center justify-center border-2 border-white shadow-md flex-shrink-0">
                        ×{count}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    {owned ? (
                      <div className="text-5xl drop-shadow-md" style={{ filter: 'saturate(1.1)' }}>{card.emoji}</div>
                    ) : (
                      <div className="relative">
                        <div className="text-5xl opacity-20 blur-[1px]" style={{ filter: 'grayscale(100%)' }}>❓</div>
                        <Lock className="absolute inset-0 m-auto text-gray-500" size={22} />
                      </div>
                    )}
                  </div>

                  <div className={cn(
                    'mt-1 py-1 rounded-md text-center font-handwriting text-xs truncate px-1',
                    owned
                      ? `bg-white/80 ${rc.text}`
                      : 'bg-black/40 text-gray-500'
                  )}>
                    {owned ? card.name : '???'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selected && (() => {
        const col = store.cardCollection.find(x => x.cardId === selected.id);
        const owned = !!col;
        const rc = RARITY_COLORS[selected.rarity];
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4" onClick={() => setSelected(null)}>
            <div className="w-full max-w-[320px] animate-[popIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]" onClick={e => e.stopPropagation()}>
              <div className={cn(
                'rounded-3xl border-[6px] p-4 relative overflow-hidden',
                `bg-gradient-to-br ${rc.bg} ${rc.border} ${rc.glow}`
              )}>
                <div className="absolute top-2 right-2 z-10">
                  <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full bg-white/80 border-2 border-wood-500 flex items-center justify-center text-wood-700">
                    <ChevronLeft className="rotate-180" size={14} />
                  </button>
                </div>

                <div className="relative z-10 text-center">
                  <div className={cn(
                    'inline-block px-3 py-1 rounded-full text-xs font-handwriting mb-3 border-2',
                    `${rc.text} bg-white/70 border-current`
                  )}>
                    <Sparkles size={11} className="inline mr-1" />
                    {rc.label}卡 · {selected.series}
                  </div>

                  <div className="aspect-[3/4] max-w-[210px] mx-auto rounded-2xl bg-white/60 border-4 border-wood-500 shadow-xl flex flex-col items-center justify-center overflow-hidden">
                    {owned ? (
                      <>
                        <div className="text-7xl mb-2 drop-shadow-lg">{selected.emoji}</div>
                        <div className="font-handwriting text-xl text-wood-800">{selected.name}</div>
                      </>
                    ) : (
                      <>
                        <div className="text-7xl mb-2 opacity-25" style={{ filter: 'grayscale(100%)' }}>❓</div>
                        <div className="font-handwriting text-base text-gray-500">未解锁</div>
                        <div className="mt-1 px-2 py-0.5 rounded-full bg-gray-300/60 text-[10px] text-gray-600 font-handwriting">
                          扭蛋随机获得
                        </div>
                      </>
                    )}
                  </div>

                  {owned && (
                    <div className="mt-4 text-left p-3 rounded-xl bg-white/70 border-2 border-wood-400">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-handwriting text-sm text-wood-700">小知识</span>
                        {col!.count > 1 && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-[10px] font-typewriter">
                            拥有 ×{col!.count}
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-wood-700 font-handwriting leading-relaxed">
                        {selected.funFact}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {showExchange && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70" onClick={() => setShowExchange(false)}>
          <div className="w-full max-w-[480px] rounded-t-3xl bg-warm-50 border-t-8 border-x-4 border-amber-600 px-4 py-5 max-h-[78vh] overflow-y-auto animate-[slideUp_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-handwriting text-xl text-wood-800 flex items-center gap-1.5">
                <Gift size={18} className="text-rose-500" />
                收集奖励兑换
              </h3>
              <button onClick={() => setShowExchange(false)} className="w-9 h-9 rounded-full bg-wood-200 border-2 border-wood-500 flex items-center justify-center text-wood-700">
                <ChevronLeft className="rotate-180" size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {exchangeRewards.map(rw => {
                const can = store.canExchangeReward(rw.id);
                const done = store.exchangedRewardIds.includes(rw.id);
                const reach = ownedUnique >= rw.requiredCards;
                return (
                  <div key={rw.id} className={cn(
                    'rounded-2xl border-3 p-4 transition-all',
                    done
                      ? 'bg-green-50 border-green-400'
                      : reach
                        ? 'bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 border-amber-500 shadow-md'
                        : 'bg-warm-100 border-kraft-300'
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-16 h-16 rounded-2xl border-3 flex items-center justify-center text-4xl flex-shrink-0 shadow-inner',
                        reach
                          ? 'bg-gradient-to-br from-yellow-200 to-orange-300 border-amber-600'
                          : 'bg-warm-200 border-kraft-400'
                      )}>
                        {rw.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-handwriting text-lg text-wood-800">{rw.name}</span>
                          {done && <Check size={16} className="text-green-600" />}
                        </div>
                        <div className="text-[11px] text-kraft-600 mt-0.5 font-handwriting">{rw.description}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="h-2 flex-1 rounded-full bg-warm-200 border border-kraft-300 overflow-hidden">
                            <div
                              className={cn('h-full transition-all', reach ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-amber-300 to-orange-400')}
                              style={{ width: `${Math.min(100, (ownedUnique / rw.requiredCards) * 100)}%` }}
                            />
                          </div>
                          <span className="font-typewriter text-xs text-wood-700 font-bold flex-shrink-0">
                            {ownedUnique}/{rw.requiredCards}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs font-handwriting text-amber-700">
                        <Sparkles size={12} />
                        价值 ¥{rw.value}
                      </div>
                      <button
                        onClick={() => {
                          if (!can) return;
                          const ok = store.exchangeReward(rw.id);
                          if (ok) window.alert(`🎉 兑换成功！客服将在3个工作日内联系您确认${rw.rewardType === 'certificate' ? '证书' : '实物'}发放～`);
                        }}
                        disabled={!can}
                        className={cn(
                          'px-4 py-1.5 rounded-xl border-2 text-sm font-handwriting transition-all',
                          done
                            ? 'bg-green-400 text-white border-green-600'
                            : can
                              ? 'bg-gradient-to-b from-amber-400 to-orange-500 text-white border-orange-700 active:translate-y-[1px] shadow-md'
                              : 'bg-gray-200 text-gray-500 border-gray-400 cursor-not-allowed'
                        )}
                      >
                        {done ? '已兑换' : can ? '立即兑换' : '继续收集'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-[10px] text-kraft-500 font-handwriting text-center leading-relaxed">
              * 重复记忆卡可兑换童年硬币（1张重复卡=2枚硬币）<br />
              * 实物奖品需在客服联系确认后免费寄出
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
