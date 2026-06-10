import { useNavigate } from 'react-router-dom';
import {
  Package, Ticket, Heart, Trophy, MapPin, MessageCircle,
  Headphones, ChevronRight, Settings, Gift, Calendar, History, Crown
} from 'lucide-react';
import Header from '@/components/layout/Header';
import { useUserStore } from '@/store/useUserStore';
import { useQuizStore } from '@/store/useQuizStore';
import { cn } from '@/lib/utils';

const tabs = [
  { status: 'pending', label: '待付款', icon: '💰' },
  { status: 'paid', label: '待发货', icon: '📦' },
  { status: 'shipped', label: '待收货', icon: '🚚' },
  { status: 'completed', label: '已完成', icon: '✅' },
];

const menuItems = [
  { id: 'coupons', icon: Ticket, label: '我的优惠券', hint: '2张可用' },
  { id: 'favorites', icon: Heart, label: '童年心愿清单', hint: '我收藏的宝贝' },
  { id: 'quiz', icon: Trophy, label: '答题记录', hint: '查看成绩单' },
  { id: 'danmaku', icon: MessageCircle, label: '我的弹幕', hint: '发过的回忆' },
  { id: 'address', icon: MapPin, label: '收货地址', hint: '管理收货信息' },
  { id: 'invite', icon: Gift, label: '邀请有礼', hint: '邀好友得券' },
  { id: 'cards', icon: Crown, label: '集卡活动', hint: '童年记忆卡' },
  { id: 'service', icon: Headphones, label: '找店小二', hint: '在线客服' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { orders, favorites, coupons, danmakuRecords, quizRecords } = useUserStore();
  const { ranking } = useQuizStore();

  const availableCoupons = coupons.filter(c => !c.used).length;
  const myRank = ranking.findIndex(r => r.nickname.includes('怀旧')) + 1 || 23;

  // 模拟用户数据
  const user = {
    nickname: '胡同里的怀旧王',
    avatar: '🧑',
    title: '怀旧达人 Lv.5',
    since: '2024.03.12 加入',
  };

  return (
    <div className="min-h-screen pb-28 bg-warm-50">
      <Header title="" showBack={false} />

      {/* 用户卡片区 - 木纹背景 */}
      <div className="relative overflow-hidden">
        <div className="wood-shelf px-4 pt-4 pb-8">
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative w-20 h-20 rounded-full bg-warm-200 border-4 border-warm-100 shadow-vintage flex items-center justify-center text-5xl">
              {user.avatar}
              <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-rust-500 text-warm-50 text-[10px] font-handwriting border-2 border-warm-100 whitespace-nowrap">
                {user.title.split(' ')[0]}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-handwriting text-2xl text-warm-50 text-shadow-hand truncate">
                {user.nickname}
              </h2>
              <p className="text-warm-200/80 text-xs mt-0.5">{user.title} · {user.since}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-warm-200/20 border border-warm-200/40 text-warm-100 text-[10px] font-handwriting">
                  🎖️ 怀旧达人
                </span>
                <span className="px-2 py-0.5 rounded-full bg-retro-yellow/30 border border-retro-yellow/50 text-retro-yellow text-[10px] font-handwriting">
                  👑 连续签到18天
                </span>
              </div>
            </div>
            <button
              className="w-9 h-9 rounded-full bg-warm-200/20 border-2 border-warm-200/40 flex items-center justify-center text-warm-100"
            >
              <Settings size={16} />
            </button>
          </div>

          {/* 数据统计 */}
          <div className="relative z-10 mt-5 rounded-2xl bg-warm-50/95 p-3 grid grid-cols-4 gap-2 text-center shadow-vintage">
            <Stat v={orders.length} l="订单" onClick={() => navigate('/profile/orders')} />
            <Stat v={availableCoupons} l="优惠券" onClick={() => navigate('/profile/coupons')} highlight />
            <Stat v={favorites.length} l="收藏" onClick={() => navigate('/profile/favorites')} />
            <Stat v={myRank} l="排名" onClick={() => navigate('/quiz')} />
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 relative z-20 space-y-4">
        {/* 订单模块 */}
        <div className="card-kraft !p-0 overflow-hidden">
          <div className="relative z-10 p-4 pb-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-handwriting text-xl text-wood-700 flex items-center gap-1.5">
                <Package size={18} /> 我的订单
              </h3>
              <button
                onClick={() => navigate('/profile/orders')}
                className="text-xs font-handwriting text-kraft-500 flex items-center gap-0.5"
              >
                全部订单 <ChevronRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1 pb-2">
              {tabs.map(t => (
                <button
                  key={t.status}
                  onClick={() => navigate('/profile/orders')}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-warm-100 transition-colors"
                >
                  <span className="text-2xl">{t.icon}</span>
                  <span className="text-xs font-handwriting text-wood-700">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 答题成就卡片 */}
        <div
          onClick={() => navigate('/quiz')}
          className="card-kraft cursor-pointer hover:shadow-vintage transition-shadow !bg-gradient-to-br !from-rust-400/20 !to-warm-200"
        >
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-rust-500 flex items-center justify-center border-4 border-warm-200 shadow-vintage text-warm-50">
              <Trophy size={26} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-handwriting text-xl text-wood-700 flex items-center gap-2">
                童年学神榜
                <span className="px-2 py-0.5 rounded-full bg-rust-500 text-warm-50 text-[11px] font-handwriting">
                  第 {myRank} 名
                </span>
              </h4>
              <p className="text-xs text-kraft-500 mt-0.5">
                共答对 {quizRecords.reduce((s, r) => s + r.correctCount, 0)} 题 · 参加 {quizRecords.length} 场
              </p>
            </div>
            <ChevronRight size={18} className="text-kraft-500" />
          </div>
        </div>

        {/* 功能菜单 */}
        <div className="card-kraft !p-0 overflow-hidden">
          <div className="relative z-10 divide-y divide-kraft-200">
            {menuItems.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => {
                  if (m.id === 'coupons') navigate('/profile/coupons');
                  else if (m.id === 'favorites') navigate('/profile/favorites');
                  else if (m.id === 'quiz') navigate('/quiz');
                  else if (m.id === 'address') navigate('/profile/orders');
                  else if (m.id === 'cards') navigate('/card-book');
                  else if (m.id === 'invite') navigate('/gacha');
                  else alert(`「${m.label}」模块即将上线～`);
                }}
                className={cn(
                  'w-full flex items-center gap-3 p-4 hover:bg-warm-100/60 transition-colors text-left',
                  idx === 0 && 'rounded-t-xl', idx === menuItems.length - 1 && 'rounded-b-xl'
                )}
              >
                <div className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center text-wood-700 border-2',
                  idx % 4 === 0 && 'bg-retro-pink/30 border-retro-pink/60',
                  idx % 4 === 1 && 'bg-mint-200/60 border-mint-400',
                  idx % 4 === 2 && 'bg-retro-blue/30 border-retro-blue/60',
                  idx % 4 === 3 && 'bg-retro-yellow/30 border-retro-yellow/60',
                )}>
                  <m.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-handwriting text-wood-700">{m.label}</p>
                  <p className="text-[11px] text-kraft-500 mt-0.5">{m.hint}</p>
                </div>
                <ChevronRight size={16} className="text-kraft-400" />
              </button>
            ))}
          </div>
        </div>

        {/* 最新动态 - 我的弹幕 */}
        {danmakuRecords.length > 0 && (
          <div className="card-kraft">
            <div className="relative z-10">
              <h3 className="font-handwriting text-xl text-wood-700 flex items-center gap-1.5 mb-3">
                <History size={18} /> 最近回忆
              </h3>
              <div className="space-y-2">
                {danmakuRecords.slice(0, 2).map((d: any) => (
                  <div key={d.id} className="p-3 rounded-xl bg-warm-100 border border-kraft-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-handwriting text-kraft-500">
                        📍{d.city} · 那年{d.age}岁
                      </span>
                      <span className="text-[10px] text-kraft-500 font-typewriter">{d.createdAt}</span>
                    </div>
                    <p className="text-sm font-handwriting text-wood-700">
                      「{d.productName}」{d.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 邀请有礼banner */}
        <div
          onClick={() => alert('🎁 邀请好友下单，双方各得 ¥15 优惠券！')}
          className="relative overflow-hidden rounded-2xl p-5 cursor-pointer border-4 border-wood-500 shadow-vintage"
          style={{ background: 'linear-gradient(135deg, #FFB6C1, #FFD28A)' }}
        >
          <div className="absolute -right-6 -top-6 text-[90px] opacity-20">🎁</div>
          <div className="relative z-10">
            <div className="inline-block px-2 py-0.5 rounded-full bg-rust-500 text-warm-50 text-[10px] font-handwriting border border-rust-700 mb-1.5">
              <Calendar size={10} className="inline mr-1" /> 限时活动
            </div>
            <h4 className="font-handwriting text-2xl text-wood-700 text-shadow-hand">邀请好友 · 双双得券</h4>
            <p className="text-xs text-wood-600 mt-0.5">邀好友下单，双方各领 ¥15 无门槛券</p>
          </div>
        </div>

        <p className="text-center text-xs text-kraft-400 font-typewriter pt-2 pb-4">
          电子杂货铺 v1.0 · © 1998-2024
        </p>
      </div>
    </div>
  );
}

function Stat({ v, l, onClick, highlight }: { v: number; l: string; onClick?: () => void; highlight?: boolean }) {
  return (
    <button onClick={onClick} className="py-1.5 rounded-lg hover:bg-warm-100 transition-colors">
      <div className={cn(
        'font-handwriting text-2xl leading-none',
        highlight ? 'text-rust-500' : 'text-wood-700'
      )}>
        {v}
      </div>
      <div className="text-[11px] text-kraft-500 mt-1 font-handwriting">{l}</div>
    </button>
  );
}
