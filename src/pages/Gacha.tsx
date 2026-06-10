import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Sparkles, Coins, History, BookOpen, RotateCcw, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGachaStore } from '@/store/useGachaStore';
import { useUserStore } from '@/store/useUserStore';
import type { GachaRecord, Coupon } from '@/types';
import { gachaPrizePool, memoryCards, getCardById } from '@/data/gacha';
import Header from '@/components/layout/Header';

const COLORS = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6BCB77', '#FF8C94', '#A8E6CF', '#FFAAA5', '#95E1D3'];

function makeCoupon(prize: GachaRecord['prize']): Coupon | null {
  if (prize.type !== 'coupon' || !prize.couponId) return null;
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  if (prize.couponId === 'gacha_first') {
    return {
      id: `gacha_first_${Date.now()}`,
      name: '满99减30优惠券',
      type: 'threshold',
      value: 30,
      threshold: 99,
      expireAt: expiresAt.toISOString(),
      used: false,
      code: prize.couponId,
    };
  }
  if (prize.couponId === 'gacha_second') {
    return {
      id: `gacha_second_${Date.now()}`,
      name: '满50减10优惠券',
      type: 'threshold',
      value: 10,
      threshold: 50,
      expireAt: expiresAt.toISOString(),
      used: false,
      code: prize.couponId,
    };
  }
  if (prize.couponId === 'gacha_fourth') {
    return {
      id: `gacha_fourth_${Date.now()}`,
      name: '5元无门槛优惠券',
      type: 'nothreshold',
      value: 5,
      expireAt: expiresAt.toISOString(),
      used: false,
      code: prize.couponId,
    };
  }
  if (prize.couponId === 'gacha_participation') {
    return {
      id: `gacha_participation_${Date.now()}`,
      name: '3元无门槛优惠券',
      type: 'nothreshold',
      value: 3,
      expireAt: expiresAt.toISOString(),
      used: false,
      code: prize.couponId,
    };
  }
  return null;
}

export default function Gacha() {
  const navigate = useNavigate();
  const store = useGachaStore();
  const addCoupon = useUserStore(s => s.addCoupon);
  const [spinning, setSpinning] = useState(false);
  const [showResult, setShowResult] = useState<GachaRecord[] | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [prizeIdx, setPrizeIdx] = useState(0);
  const [shakeAngle, setShakeAngle] = useState(0);
  const shakeTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (shakeTimer.current) window.clearInterval(shakeTimer.current);
    };
  }, []);

  const grantRewards = (records: GachaRecord[]) => {
    records.forEach(rec => {
      const coupon = makeCoupon(rec.prize);
      if (coupon) addCoupon(coupon);
    });
  };

  const startShake = () => {
    let frame = 0;
    const animate = () => {
      frame++;
      const angle = Math.sin(frame * 0.6) * (frame < 10 ? 4 : frame < 20 ? 3 : 1.5);
      setShakeAngle(angle);
      if (frame < 36) {
        shakeTimer.current = window.setTimeout(animate, 60);
      } else {
        setShakeAngle(0);
      }
    };
    animate();
  };

  const handleSingle = () => {
    if (spinning) return;
    if (store.coins < 1) return;
    setSpinning(true);
    startShake();
    setTimeout(() => {
      const rec = store.doSingleGacha();
      grantRewards([rec]);
      setSpinning(false);
      setShowResult([rec]);
      setPrizeIdx(0);
    }, 2200);
  };

  const handleTen = () => {
    if (spinning) return;
    if (store.coins < 10) return;
    setSpinning(true);
    startShake();
    setTimeout(() => {
      const recs = store.doTenGacha();
      grantRewards(recs);
      setSpinning(false);
      setShowResult(recs);
      setPrizeIdx(0);
    }, 2400);
  };

  return (
    <div className="min-h-screen pb-28 bg-gradient-to-b from-[#2D1B3D] via-[#3D2B5A] to-[#1A1026]">
      <Header title="童年扭蛋机" rightContent={
        <button onClick={() => navigate('/card-book')} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-yellow-300/90 border-2 border-yellow-600 text-yellow-900 font-handwriting text-sm shadow-md">
          <BookOpen size={14} />
          卡册
        </button>
      } />

      <div className="px-4 pt-4">
        <div className="wood-shelf rounded-2xl p-1">
          <div className="rounded-xl px-4 py-3 bg-gradient-to-r from-amber-100 to-yellow-50 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 border-3 border-amber-700 flex items-center justify-center shadow-md">
                <Coins size={18} className="text-amber-900" />
              </div>
              <div>
                <div className="text-[10px] text-amber-700 font-handwriting">童年硬币</div>
                <div className="font-typewriter text-xl text-amber-900 font-bold leading-tight">{store.coins}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="px-3 py-1 rounded-full bg-rose-200 border-2 border-rose-400 text-rose-800 font-handwriting">
                保底 {store.pityCount}/10
              </div>
              <button onClick={() => setShowHistory(true)} className="px-3 py-1 rounded-full bg-purple-200 border-2 border-purple-400 text-purple-800 font-handwriting flex items-center gap-1">
                <History size={12} />记录
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 pb-4">
        <div
          className="relative mx-auto max-w-[340px]"
          style={{ transform: `rotate(${shakeAngle}deg)`, transition: 'transform 0.06s ease-out' }}
        >
          <div className="absolute -top-3 left-0 right-0 flex justify-center gap-3 z-20">
            {COLORS.slice(0, 5).map((c, i) => (
              <div
                key={i}
                className={cn(
                  'w-3 h-3 rounded-full shadow-sm',
                  spinning && 'animate-pulse'
                )}
                style={{ background: c, animationDelay: `${i * 0.15}s`, boxShadow: `0 0 12px ${c}` }}
              />
            ))}
          </div>

          <div className="rounded-t-[32px] bg-gradient-to-b from-[#FF4D6D] via-[#E63946] to-[#C9184A] border-[6px] border-[#7A1029] pt-6 pb-2 px-4 shadow-[0_10px_40px_rgba(0,0,0,0.4)] relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-handwriting text-yellow-300 tracking-widest">CHILDHOOD GACHA</div>
            <div className="rounded-3xl bg-gradient-to-b from-sky-300/60 via-sky-200/50 to-sky-400/40 border-4 border-sky-900/40 p-4 overflow-hidden relative min-h-[200px] shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10 h-[180px] flex flex-wrap content-start justify-center gap-2 p-1">
                {Array.from({ length: spinning ? 28 : 18 }).map((_, i) => {
                  const color = COLORS[i % COLORS.length];
                  const isDropped = spinning && i < 3;
                  return (
                    <div
                      key={i}
                      className={cn(
                        'relative w-[44px] h-[50px] rounded-full shadow-lg transition-all',
                        spinning && i < 8 && 'animate-bounce'
                      )}
                      style={{
                        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7) 0%, ${color} 50%, ${color} 100%)`,
                        border: '2px solid rgba(255,255,255,0.5)',
                        transform: isDropped ? 'translateY(200px) scale(0.6)' : `rotate(${(i * 37) % 45}deg)`,
                        opacity: isDropped ? 0 : 1,
                        transition: isDropped ? 'all 0.9s ease-in' : undefined,
                        transitionDelay: isDropped ? `${i * 0.1}s` : undefined,
                        animationDuration: spinning ? `${0.4 + (i % 5) * 0.1}s` : undefined,
                      }}
                    >
                      <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white/60" />
                      <div className="absolute left-1/2 -translate-x-1/2 top-[38%] w-full h-[3px] bg-white/40" />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-2 h-3 rounded-full bg-gradient-to-r from-[#8B0000] via-[#FF4D6D] to-[#8B0000] border-2 border-[#7A1029]" />
          </div>

          <div className="bg-gradient-to-b from-[#C9184A] via-[#9D0208] to-[#6A040F] border-x-[6px] border-[#7A1029] px-4 py-5">
            <div className="mx-auto w-[88px] h-[88px] rounded-full bg-gradient-to-br from-gray-700 to-black border-[4px] border-gray-900 shadow-[inset_0_2px_8px_rgba(0,0,0,0.7)] relative flex items-center justify-center">
              <div className="w-[56px] h-[56px] rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-600 border-[3px] border-orange-900 shadow-lg relative">
                <div
                  className={cn(
                    'absolute inset-0 rounded-full flex items-center justify-center text-yellow-50 text-sm font-bold transition-transform',
                    spinning && 'animate-[spin_0.2s_linear_infinite]'
                  )}
                >
                  <RotateCcw size={20} />
                </div>
              </div>
              <div className="absolute -right-1 top-1/2 w-3 h-6 bg-gray-900 rounded-r-lg border border-gray-700" />
            </div>

            <div className="mt-5 mx-auto w-16 h-10 rounded-b-3xl bg-gradient-to-b from-[#3E1C28] to-[#2A121C] border-x-4 border-b-4 border-[#1A0A10] shadow-inner" />
          </div>

          <div className="rounded-b-[24px] bg-gradient-to-b from-[#6A040F] via-[#4A0308] to-[#2A0205] border-x-[6px] border-b-[6px] border-[#7A1029] px-4 pb-6 pt-4 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSingle}
                disabled={spinning || store.coins < 1}
                className={cn(
                  'rounded-xl border-4 py-3 font-handwriting text-base shadow-lg transition-all relative overflow-hidden',
                  spinning || store.coins < 1
                    ? 'bg-gray-400 border-gray-600 text-gray-200 cursor-not-allowed opacity-70'
                    : 'bg-gradient-to-b from-emerald-400 to-emerald-600 border-emerald-800 text-white active:translate-y-[2px] hover:brightness-105'
                )}
              >
                <div className="flex flex-col items-center gap-0.5 relative z-10">
                  <span className="text-xs opacity-90">单抽一次</span>
                  <div className="flex items-center gap-1">
                    <Coins size={14} />
                    <span className="font-typewriter font-bold text-lg">×1</span>
                  </div>
                </div>
                {!(spinning || store.coins < 1) && <div className="absolute inset-x-0 top-0 h-1/3 bg-white/25 rounded-t-lg" />}
              </button>

              <button
                onClick={handleTen}
                disabled={spinning || store.coins < 10}
                className={cn(
                  'rounded-xl border-4 py-3 font-handwriting text-base shadow-lg transition-all relative overflow-hidden',
                  spinning || store.coins < 10
                    ? 'bg-gray-400 border-gray-600 text-gray-200 cursor-not-allowed opacity-70'
                    : 'bg-gradient-to-b from-amber-400 via-orange-500 to-orange-600 border-orange-800 text-white active:translate-y-[2px] hover:brightness-105'
                )}
              >
                <div className="flex flex-col items-center gap-0.5 relative z-10">
                  <span className="text-xs opacity-90">十连抽 必出稀有</span>
                  <div className="flex items-center gap-1">
                    <Coins size={14} />
                    <span className="font-typewriter font-bold text-lg">×10</span>
                  </div>
                </div>
                {!(spinning || store.coins < 10) && <div className="absolute inset-x-0 top-0 h-1/3 bg-white/25 rounded-t-lg" />}
                {store.coins >= 10 && !spinning && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 border-2 border-white text-white text-[10px] flex items-center justify-center font-bold shadow-md">
                    ✦
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="card-kraft !p-3">
          <div className="relative z-10">
            <h3 className="font-handwriting text-lg text-wood-700 mb-3 flex items-center gap-1.5">
              <Sparkles size={16} className="text-amber-500" />
              奖品一览
            </h3>
            <div className="space-y-1.5">
              {gachaPrizePool.map(p => (
                <div key={p.tier} className="flex items-center gap-2 text-sm">
                  <div className={cn(
                    'w-7 h-7 rounded-lg border-2 flex items-center justify-center text-base flex-shrink-0',
                    p.tier === 'special' || p.tier === 'first'
                      ? 'bg-gradient-to-br from-yellow-200 to-amber-300 border-amber-600'
                      : p.tier === 'second' || p.tier === 'third'
                        ? 'bg-gradient-to-br from-purple-100 to-purple-200 border-purple-500'
                        : 'bg-warm-100 border-kraft-300'
                  )}>
                    {p.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-handwriting text-wood-700 leading-tight">{p.tierName} · {p.name}</div>
                    <div className="text-[10px] text-kraft-500 leading-tight">{p.description}</div>
                  </div>
                  <div className="font-typewriter text-xs text-rust-600 font-bold flex-shrink-0">
                    {(p.probability * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showResult && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowResult(null)}>
          <div className="w-full max-w-[480px] rounded-t-3xl bg-gradient-to-b from-[#FFF8E1] via-[#FFECB3] to-[#FFE082] border-t-8 border-x-4 border-amber-500 px-4 py-6 max-h-[82vh] overflow-y-auto animate-[slideUp_0.35s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-handwriting text-2xl text-amber-800 flex items-center gap-2">
                <Gift className="text-rose-500" size={22} />
                {showResult.length > 1 ? '🎉 十连抽结果' : '🎊 扭蛋开出'}
              </h3>
              <button onClick={() => setShowResult(null)} className="w-9 h-9 rounded-full bg-amber-400/70 border-2 border-amber-700 flex items-center justify-center text-amber-900">
                <ChevronLeft className="rotate-180" size={16} />
              </button>
            </div>

            {showResult.length > 1 && (
              <div className="mb-4 flex gap-1.5 overflow-x-auto hide-scrollbar pb-1 -mx-1 px-1">
                {showResult.map((r, i) => {
                  const rare = ['special', 'first', 'second', 'third'].includes(r.prize.tier);
                  return (
                    <button
                      key={i}
                      onClick={() => setPrizeIdx(i)}
                      className={cn(
                        'flex-shrink-0 w-14 h-14 rounded-xl border-2 flex items-center justify-center text-2xl transition-all',
                        prizeIdx === i
                          ? rare
                            ? 'bg-gradient-to-br from-yellow-300 to-orange-400 border-orange-600 scale-110 shadow-lg'
                            : 'bg-white border-wood-600 scale-110 shadow-md'
                          : rare
                            ? 'bg-yellow-100 border-amber-400 opacity-80'
                            : 'bg-warm-100 border-kraft-300 opacity-70'
                      )}
                    >
                      {r.prize.emoji}
                    </button>
                  );
                })}
              </div>
            )}

            {(() => {
              const r = showResult[prizeIdx];
              const card = r.cardPieceId ? getCardById(r.cardPieceId) : null;
              const rare = ['special', 'first', 'second', 'third'].includes(r.prize.tier);
              return (
                <div className="text-center">
                  <div className={cn(
                    'mx-auto w-full max-w-[260px] rounded-3xl p-6 mb-4',
                    rare
                      ? 'bg-gradient-to-br from-yellow-200 via-orange-300 to-rose-300 border-4 border-amber-600 shadow-[0_0_60px_rgba(255,150,0,0.5)] animate-[pulse_1.6s_ease-in-out_infinite]'
                      : 'bg-gradient-to-br from-white to-warm-100 border-4 border-kraft-400 shadow-xl'
                  )}>
                    <div className="mb-2">
                      <span className={cn(
                        'inline-block px-3 py-0.5 rounded-full text-xs font-handwriting mb-2',
                        rare ? 'bg-rose-500 text-white' : 'bg-wood-500 text-white'
                      )}>
                        {r.prize.tierName}
                      </span>
                    </div>
                    <div className="text-7xl mb-3 drop-shadow-lg" style={{ animation: 'bounce 1.2s ease-in-out infinite' }}>
                      {card ? card.emoji : r.prize.emoji}
                    </div>
                    <div className="font-handwriting text-2xl text-wood-800 mb-1">
                      {card ? card.name : r.prize.name}
                    </div>
                    <div className="text-xs text-wood-600 font-handwriting leading-relaxed px-4">
                      {card ? card.funFact : r.prize.description}
                    </div>
                    {card && (
                      <div className="mt-3 inline-block px-3 py-1 rounded-full bg-warm-200 border-2 border-wood-500 text-wood-700 text-xs font-handwriting">
                        {card.series} · {card.rarity === 'legendary' ? '传说' : card.rarity === 'epic' ? '史诗' : card.rarity === 'rare' ? '稀有' : '普通'}
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-amber-800/70 font-handwriting mb-2">已发放至账户，优惠券可在「我的优惠券」查看</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setShowResult(null)} className="btn-retro !py-2.5 !text-base">
                      继续扭蛋
                    </button>
                    <button onClick={() => { setShowResult(null); navigate('/card-book'); }} className="btn-retro-primary !py-2.5 !text-base">
                      去看卡册
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60" onClick={() => setShowHistory(false)}>
          <div className="w-full max-w-[480px] rounded-t-3xl bg-warm-50 border-t-8 border-x-4 border-wood-600 px-4 py-5 max-h-[75vh] overflow-y-auto animate-[slideUp_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-handwriting text-xl text-wood-700 flex items-center gap-1.5">
                <History size={18} /> 抽奖记录
              </h3>
              <button onClick={() => setShowHistory(false)} className="w-9 h-9 rounded-full bg-wood-200 border-2 border-wood-500 flex items-center justify-center text-wood-700">
                <ChevronLeft className="rotate-180" size={16} />
              </button>
            </div>
            {store.gachaRecords.length === 0 ? (
              <div className="py-12 text-center text-kraft-500 font-handwriting">
                <div className="text-5xl mb-2">🎰</div>
                <p>还没有扭蛋记录，快来试手气吧！</p>
              </div>
            ) : (
              <div className="space-y-2">
                {store.gachaRecords.slice(0, 50).map(r => {
                  const card = r.cardPieceId ? getCardById(r.cardPieceId) : null;
                  return (
                    <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl bg-white border-2 border-kraft-200">
                      <div className="w-11 h-11 rounded-xl bg-warm-100 border-2 border-kraft-300 flex items-center justify-center text-2xl flex-shrink-0">
                        {card ? card.emoji : r.prize.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-kraft-200 text-[10px] font-handwriting text-wood-700">
                            {r.prize.tierName}
                          </span>
                          <span className="font-handwriting text-wood-700 truncate">
                            {card ? card.name : r.prize.name}
                          </span>
                        </div>
                        <div className="text-[10px] text-kraft-500 mt-0.5">
                          {new Date(r.createdAt).toLocaleString('zh-CN')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
