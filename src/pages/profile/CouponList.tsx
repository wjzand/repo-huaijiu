import { useNavigate } from 'react-router-dom';
import { Ticket, ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import { useUserStore } from '@/store/useUserStore';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

const TABS = ['可用', '已用', '过期'] as const;

export default function CouponList() {
  const navigate = useNavigate();
  const { coupons, useCoupon } = useUserStore();
  const [tab, setTab] = useState<typeof TABS[number]>('可用');

  const now = new Date();

  const list = useMemo(() => {
    return coupons.filter(c => {
      const expired = new Date(c.expireAt) < now;
      if (tab === '可用') return !c.used && !expired;
      if (tab === '已用') return c.used;
      return expired;
    });
  }, [coupons, tab, now]);

  return (
    <div className="min-h-screen pb-28 bg-warm-50">
      <Header title="🎫 我的优惠券" />

      <div className="sticky top-[61px] z-30 bg-warm-50/95 backdrop-blur-sm px-4 pt-2 pb-2 border-b-2 border-kraft-200">
        <div className="flex p-1 rounded-xl bg-kraft-100 border-2 border-kraft-300">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'flex-1 py-2 rounded-lg font-handwriting text-sm transition-all',
                tab === t ? 'bg-rust-500 text-warm-50 shadow-vintage' : 'text-wood-600'
              )}
            >
              {t} ({t === '可用' ? coupons.filter(c => !c.used && new Date(c.expireAt) >= now).length :
                t === '已用' ? coupons.filter(c => c.used).length :
                  coupons.filter(c => new Date(c.expireAt) < now).length})
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {list.length === 0 ? (
          <div className="card-kraft !p-10 text-center mt-8">
            <div className="relative z-10">
              <div className="text-6xl mb-3">🎟️</div>
              <p className="font-handwriting text-wood-700 mb-6">暂无{tab}的优惠券～</p>
              <button
                onClick={() => navigate('/quiz')}
                className="btn-retro-primary"
              >
                <Ticket size={16} /> 答题赢券
              </button>
            </div>
          </div>
        ) : list.map(c => {
          const disabled = tab !== '可用';
          return (
            <div
              key={c.id}
              className={cn(
                'relative overflow-hidden rounded-2xl border-2 flex shadow-vintage',
                disabled ? 'opacity-60' : ''
              )}
            >
              {/* 左侧金额 */}
              <div className={cn(
                'w-28 flex flex-col items-center justify-center py-5 text-center text-warm-50',
                c.type === 'shipping' ? 'bg-gradient-to-br from-mint-400 to-mint-300 border-r-4 border-dashed border-warm-100/80'
                  : 'bg-gradient-to-br from-rust-500 to-rust-400 border-r-4 border-dashed border-warm-100/80'
              )}>
                {c.type === 'shipping' ? (
                  <>
                    <div className="font-handwriting text-xl font-bold">包邮</div>
                    <div className="text-xs opacity-90 mt-0.5">不限金额</div>
                  </>
                ) : (
                  <>
                    <div className="font-typewriter font-bold">
                      <span className="text-xl align-top">¥</span>
                      <span className="text-4xl leading-none">{c.value}</span>
                    </div>
                    {c.type === 'threshold' && (
                      <div className="text-[11px] opacity-90 mt-1">满{c.threshold}可用</div>
                    )}
                    {c.type === 'nothreshold' && (
                      <div className="text-[11px] opacity-90 mt-1">无门槛</div>
                    )}
                  </>
                )}
              </div>

              {/* 右侧信息 */}
              <div className="flex-1 bg-warm-50 p-3.5 flex flex-col justify-between">
                <div>
                  <p className="font-handwriting text-wood-700 text-base">{c.name}</p>
                  <p className="text-[11px] text-kraft-500 mt-0.5 font-typewriter">
                    有效期至 {c.expireAt}
                  </p>
                  {c.code && (
                    <p className="text-[10px] text-kraft-400 mt-1 font-typewriter">券码：{c.code}</p>
                  )}
                </div>
                <div className="flex items-end justify-between mt-2">
                  {!disabled && (
                    <button
                      onClick={() => { useCoupon(c.id); navigate('/'); }}
                      className="px-3 py-1 rounded-full bg-rust-500 text-warm-50 text-xs font-handwriting border-2 border-rust-700 shadow-md"
                    >
                      立即使用
                    </button>
                  )}
                  {tab === '已用' && (
                    <span className="px-2 py-0.5 rounded-full bg-kraft-200 text-kraft-500 text-[11px] font-handwriting">
                      已使用
                    </span>
                  )}
                  {tab === '过期' && (
                    <span className="px-2 py-0.5 rounded-full bg-kraft-200 text-kraft-500 text-[11px] font-handwriting">
                      已过期
                    </span>
                  )}
                  <ChevronRight size={14} className="text-kraft-400" />
                </div>
              </div>

              {/* 券边的半圆形撕痕装饰 */}
              <div className="absolute left-[104px] top-1/2 -translate-y-1/2 -ml-1.5 w-3 h-3 rounded-full bg-warm-100 z-10" />
              <div className="absolute left-[104px] top-1/2 -translate-y-1/2 -ml-1.5 w-3 h-3 rounded-full bg-warm-50 z-20 border-r border-kraft-200" />
            </div>
          );
        })}

        {tab === '可用' && (
          <button
            onClick={() => navigate('/quiz')}
            className="w-full mt-4 p-4 rounded-2xl border-4 border-dashed border-kraft-300 text-center text-kraft-500 font-handwriting hover:border-wood-500 hover:text-wood-600 transition-colors"
          >
            🎯 去答题赢更多优惠券 →
          </button>
        )}
      </div>
    </div>
  );
}
