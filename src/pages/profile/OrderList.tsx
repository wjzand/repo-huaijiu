import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Package } from 'lucide-react';
import Header from '@/components/layout/Header';
import { useUserStore } from '@/store/useUserStore';
import { cn } from '@/lib/utils';

const TABS = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待付款' },
  { key: 'paid', label: '待发货' },
  { key: 'shipped', label: '待收货' },
  { key: 'completed', label: '已完成' },
] as const;

const statusLabel: Record<string, { text: string; color: string; btn: string }> = {
  pending: { text: '待付款', color: 'text-rust-500 bg-retro-pink/40', btn: '立即付款' },
  paid: { text: '待发货', color: 'text-warm-600 bg-retro-yellow/40', btn: '提醒发货' },
  shipped: { text: '待收货', color: 'text-wood-600 bg-retro-blue/30', btn: '确认收货' },
  completed: { text: '已完成', color: 'text-wood-600 bg-mint-200/70', btn: '再次购买' },
};

export default function OrderList() {
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useUserStore();
  const [tab, setTab] = useState<typeof TABS[number]['key']>('all');

  const list = tab === 'all' ? orders : orders.filter(o => o.status === tab);

  return (
    <div className="min-h-screen pb-28 bg-warm-50">
      <Header title="📋 我的订单" />

      <div className="sticky top-[61px] z-30 bg-warm-50/95 backdrop-blur-sm px-4 pt-2 pb-2 border-b-2 border-kraft-200">
        <div className="flex p-1 rounded-xl bg-kraft-100 border-2 border-kraft-300 overflow-x-auto hide-scrollbar">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'flex-1 py-2 px-3 rounded-lg font-handwriting text-sm whitespace-nowrap transition-all min-w-[68px]',
                tab === t.key ? 'bg-wood-600 text-warm-50 shadow-vintage' : 'text-wood-600'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3.5">
        {list.length === 0 ? (
          <div className="card-kraft !p-10 text-center mt-8">
            <div className="relative z-10">
              <div className="text-6xl mb-3">📦</div>
              <p className="font-handwriting text-wood-700 mb-6">
                {tab === 'all' ? '还没有订单哦～' : `暂无「${TABS.find(t => t.key === tab)?.label}」订单`}
              </p>
              <button onClick={() => navigate('/')} className="btn-retro-primary">
                <Package size={16} /> 去逛逛
              </button>
            </div>
          </div>
        ) : list.map(o => {
          const sl = statusLabel[o.status];
          return (
            <div key={o.id} className="card-kraft !p-0 overflow-hidden">
              <div className="relative z-10">
                {/* 头部 */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b-2 border-dashed border-kraft-200">
                  <span className="text-[11px] text-kraft-500 font-typewriter">订单号：{o.id}</span>
                  <span className={cn('px-2 py-0.5 rounded-full text-xs font-handwriting border', sl.color)}>
                    {sl.text}
                  </span>
                </div>

                {/* 商品列表 */}
                <div className="p-3 space-y-2">
                  {o.items.slice(0, 2).map((it: any) => (
                    <div key={it.productId} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-warm-100 border-2 border-wood-400 flex-shrink-0">
                        <img src={it.product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 py-0.5">
                        <p className="font-handwriting text-wood-700 text-sm truncate">{it.product.name}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-xs text-kraft-500">x{it.quantity}</span>
                          <span className="font-typewriter text-rust-600 text-sm">¥{(it.product.price * it.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {o.items.length > 2 && (
                    <p className="text-center text-xs text-kraft-500 font-handwriting">
                      还有 {o.items.length - 2} 件商品...
                    </p>
                  )}
                </div>

                {/* 底部 */}
                <div className="px-4 py-2.5 border-t-2 border-dashed border-kraft-200 flex items-center justify-between gap-2">
                  <div className="text-sm text-kraft-500 font-handwriting">
                    共{o.items.reduce((s: number, i: any) => s + i.quantity, 0)}件 合计：
                    <span className="font-typewriter text-rust-600 text-base font-bold ml-1">
                      ¥{o.totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate('/profile')}
                      className="px-3 py-1.5 rounded-full bg-warm-100 border-2 border-kraft-300 text-xs font-handwriting text-wood-600"
                    >
                      详情
                    </button>
                    <button
                      onClick={() => {
                        if (o.status === 'pending') updateOrderStatus(o.id, 'paid');
                        else if (o.status === 'paid') updateOrderStatus(o.id, 'shipped');
                        else if (o.status === 'shipped') updateOrderStatus(o.id, 'completed');
                        else navigate('/');
                      }}
                      className="px-4 py-1.5 rounded-full bg-rust-500 border-2 border-rust-700 text-warm-50 text-xs font-handwriting shadow-md"
                    >
                      {sl.btn}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
