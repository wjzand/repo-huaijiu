import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import FallingItems from '@/components/home/FallingItems';
import HomeBanner from '@/components/home/HomeBanner';
import CategoryGrid from '@/components/home/CategoryGrid';
import DanmakuBar from '@/components/home/DanmakuBar';
import ProductCard from '@/components/product/ProductCard';
import { products, getRecommendedProducts } from '@/data/products';
import { useQuizStore } from '@/store/useQuizStore';
import { useGachaStore } from '@/store/useGachaStore';
import { cn } from '@/lib/utils';

export default function Home() {
  const navigate = useNavigate();
  const [musicOn, setMusicOn] = useState(false);
  const canPlay = useQuizStore(s => s.canPlayToday());
  const chances = useQuizStore(s => s.dailyChances);
  const coins = useGachaStore(s => s.coins);

  const recommended = getRecommendedProducts();
  const hotList = [...products].sort((a, b) => b.sales - a.sales).slice(0, 4);

  return (
    <div className="relative pb-28">
      <FallingItems />

      {/* ===== 店招区域 ===== */}
      <section className="relative pt-4 pb-6 px-4 overflow-hidden">
        {/* 渐变背景 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-wood-600 via-wood-500 to-warm-100" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "radial-gradient(circle at 20% 30%, #FFD700 0%, transparent 30%), radial-gradient(circle at 80% 20%, #FF6B35 0%, transparent 35%)"
          }} />
        </div>

        {/* 店招栏 */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏮</span>
            <span className="font-handwriting text-warm-100 text-lg opacity-80">自1998年营业</span>
          </div>
          <button
            onClick={() => setMusicOn(!musicOn)}
            className="w-9 h-9 rounded-full bg-warm-200/90 border-2 border-warm-50 flex items-center justify-center text-wood-600 shadow-lg"
          >
            {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>

        {/* 霓虹灯招牌 */}
        <div className="text-center py-4 relative z-10">
          <h1 className="neon-title animate-neon-flicker">
            电子杂货铺
          </h1>
          <p className="mt-2 font-handwriting text-warm-100/90 text-lg tracking-wider">
            · 童 年 的 味 道 ·
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-warm-200/80 text-xs font-typewriter">
            <span className="w-8 h-px bg-warm-200/40" />
            开 门 大 吉 · 童 叟 无 欺
            <span className="w-8 h-px bg-warm-200/40" />
          </div>
        </div>
      </section>

      {/* ===== Banner ===== */}
      <section className="mb-5">
        <HomeBanner />
      </section>

      {/* ===== 四大分区 ===== */}
      <section className="mb-5">
        <SectionTitle title="🗄️ 货架分区" subtitle="每个格子藏着一段童年" />
        <CategoryGrid />
      </section>

      {/* ===== 今日怀旧推荐 ===== */}
      <section className="mb-5">
        <SectionTitle
          title="🌟 今日怀旧推荐"
          subtitle="店小二精挑细选"
          action={
            <button
              onClick={() => navigate('/category/snack')}
              className="text-xs font-handwriting text-rust-500 flex items-center gap-0.5"
            >
              更多 <ArrowRight size={14} />
            </button>
          }
        />
        <div className="px-4">
          <div className="h-scroll">
            {recommended.map(p => (
              <ProductCard key={p.id} product={p} variant="recommend" />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 答题闯关入口 ===== */}
      <section className="mb-5 px-4">
        <button
          onClick={() => navigate('/quiz')}
          className={cn(
            'w-full relative overflow-hidden rounded-2xl p-5 text-left',
            'border-4 border-rust-600 shadow-vintage',
            'bg-gradient-to-br from-rust-400 via-rust-500 to-rust-600 transition-all',
            'hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0'
          )}
        >
          <div className="absolute -right-8 -top-8 text-[140px] opacity-20 select-none">🎯</div>
          <div className="relative z-10 pr-12">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles size={20} className="text-retro-yellow" />
              <span className="font-handwriting text-2xl text-warm-50 text-shadow-hand">
                测测你的童年记忆值
              </span>
            </div>
            <p className="text-warm-100/90 text-sm font-retro mb-3">
              5道题·答对3道即可抽奖·赢优惠券/包邮券
            </p>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-warm-50 text-rust-600 text-sm font-handwriting border-2 border-rust-700 shadow-md">
                开始答题 →
              </span>
              <span className="text-warm-100/80 text-xs font-typewriter">
                今日剩余 {canPlay ? chances : 0} 次
              </span>
            </div>
          </div>
        </button>
      </section>

      {/* ===== 热销榜 ===== */}
      <section className="mb-5">
        <SectionTitle title="🔥 怀旧热销榜" subtitle="大家都在回味什么" />
        <div className="px-4 grid grid-cols-2 gap-3">
          {hotList.map((p, i) => (
            <div key={p.id} className="relative">
              {i < 3 && (
                <div className="absolute -top-1 -left-1 z-20 px-2 py-0.5 rounded-full
                  bg-rust-500 text-warm-50 text-[10px] font-handwriting border-2 border-warm-100
                  shadow-vintage flex items-center gap-0.5">
                  <TrendingUp size={10} /> TOP{i + 1}
                </div>
              )}
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== 时光机弹幕 ===== */}
      <section className="mb-5">
        <SectionTitle title="📺 时光机弹幕" subtitle="看看谁也在怀念那年" />
        <DanmakuBar />
      </section>

      {/* ===== 小卖部黑板报 ===== */}
      <section className="mb-5 px-4">
        <div className="wood-shelf rounded-2xl p-1">
          <div className="rounded-xl p-5 relative z-10" style={{
            background: 'linear-gradient(180deg, #1a3d2e 0%, #0f2920 100%)',
          }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📋</span>
              <h3 className="font-handwriting text-2xl text-mint-300">
                小卖部黑板报
              </h3>
            </div>
            <div className="space-y-2 text-warm-100/90 font-handwriting text-[15px] leading-relaxed"
              style={{ fontFamily: '"Zhi Mang Xing", cursive' }}>
              <p>· 本周怀旧主题：<span className="text-retro-yellow">80后vs90后零食大PK</span></p>
              <p>· 下午4点「放学时间」，限时秒杀开启！</p>
              <p>· 购买满3件赠送「童年记忆卡」一张～</p>
              <p className="text-mint-200/80 text-xs mt-3 font-typewriter">
                —— 店小二 亲笔 2024.05
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 浮动扭蛋机入口 ===== */}
      <button
        onClick={() => navigate('/gacha')}
        className="fixed right-3 bottom-[110px] z-40 animate-[floatY_2.8s_ease-in-out_infinite]"
      >
        <div className="relative">
          <div className="w-[66px] h-[86px] rounded-t-2xl rounded-b-3xl bg-gradient-to-b from-rose-400 via-rose-500 to-rose-700 border-[3px] border-rose-900 shadow-[0_6px_20px_rgba(244,63,94,0.45)] relative overflow-hidden">
            <div className="absolute top-1 left-0 right-0 h-1/2 rounded-xl mx-1 mt-1 bg-gradient-to-b from-sky-200/60 to-sky-300/40 border-2 border-sky-900/30 flex items-center justify-center">
              <div className="text-2xl animate-[bounce_1.5s_ease-in-out_infinite]">🎁</div>
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500 border-2 border-orange-800 shadow-md" />
          </div>
          <div className="absolute -top-2 -right-2 min-w-[24px] h-6 px-1.5 rounded-full bg-amber-400 border-2 border-amber-700 text-amber-900 text-[11px] font-typewriter font-bold flex items-center justify-center shadow-md">
            {coins}
          </div>
          <div className="mt-1 text-center">
            <span className="inline-block px-1.5 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-[9px] font-handwriting whitespace-nowrap">
              扭蛋赢奖
            </span>
          </div>
        </div>
      </button>

      {/* ===== 页脚 ===== */}
      <footer className="px-4 pb-4">
        <div className="text-center py-4 border-t-2 border-dashed border-kraft-300">
          <p className="font-handwriting text-wood-500 text-sm">
            🏮 电子杂货铺 · 为童年回忆买单 🏮
          </p>
          <p className="mt-1 text-xs text-kraft-500 font-typewriter">
            © 1998-2024 Memories Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="px-4 mb-3 flex items-end justify-between">
      <div>
        <h2 className="font-handwriting text-2xl text-wood-700 text-shadow-hand">{title}</h2>
        {subtitle && <p className="text-xs text-kraft-500 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
