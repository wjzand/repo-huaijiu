import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, SortAsc } from 'lucide-react';
import Header from '@/components/layout/Header';
import ProductCard from '@/components/product/ProductCard';
import Modal from '@/components/common/Modal';
import { products, getProductsByCategory } from '@/data/products';
import { CATEGORY_INFO, ERA_LABEL, ProductCategory, SortType, Era } from '@/types';
import { cn } from '@/lib/utils';

const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: 'default', label: '综合排序' },
  { value: 'sales', label: '销量优先' },
  { value: 'price_asc', label: '价格 低→高' },
  { value: 'price_desc', label: '价格 高→低' },
  { value: 'newest', label: '最新上架' },
  { value: 'nostalgia', label: '怀旧指数' },
];

export default function Category() {
  const { type } = useParams<{ type: string }>();
  const cat = (type as ProductCategory) || 'snack';
  const info = CATEGORY_INFO[cat];

  const [sortBy, setSortBy] = useState<SortType>('default');
  const [eraFilter, setEraFilter] = useState<Era | 'all'>('all');
  const [filterOpen, setFilterOpen] = useState(false);

  const list = useMemo(() => {
    let arr = (cat as any) === 'all' ? [...products] : getProductsByCategory(cat);
    if (eraFilter !== 'all') arr = arr.filter(p => p.era === eraFilter);

    switch (sortBy) {
      case 'sales': arr.sort((a, b) => b.sales - a.sales); break;
      case 'price_asc': arr.sort((a, b) => a.price - b.price); break;
      case 'price_desc': arr.sort((a, b) => b.price - a.price); break;
      case 'nostalgia': arr.sort((a, b) => b.nostalgiaStars - a.nostalgiaStars); break;
      case 'newest': arr.sort((a, b) => b.id.localeCompare(a.id)); break;
    }
    return arr;
  }, [cat, sortBy, eraFilter]);

  return (
    <div className="min-h-screen pb-28 bg-warm-50">
      <Header title={`${info.emoji} ${info.name}`} />

      {/* 分区横幅 */}
      <div className={cn('px-4 pt-4 pb-3 bg-gradient-to-br', info.bg)}>
        <div className="wood-shelf rounded-2xl p-1">
          <div className="rounded-xl px-5 py-4 flex items-center gap-4 bg-warm-50 relative z-10">
            <div className="w-16 h-16 rounded-full bg-warm-200 border-4 border-wood-500 flex items-center justify-center text-4xl shadow-vintage">
              {info.emoji}
            </div>
            <div className="flex-1">
              <h2 className="font-handwriting text-2xl text-wood-700">{info.name}</h2>
              <p className="text-xs text-kraft-500 mt-0.5">
                共 {list.length} 件童年宝贝等你认领
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 筛选排序栏 - 第一行：筛选 + 年代 */}
      <div className="sticky top-[61px] z-30 bg-warm-50/95 backdrop-blur-sm border-b-2 border-kraft-200 px-4 pt-2.5 pb-2">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-warm-100 border-2 border-kraft-300
              text-wood-600 text-sm font-handwriting flex-shrink-0"
          >
            <Filter size={14} />
            筛选
            {eraFilter !== 'all' && (
              <span className="w-4 h-4 rounded-full bg-rust-500 text-warm-50 text-[10px] flex items-center justify-center ml-0.5">1</span>
            )}
          </button>

          <div className="flex-1 overflow-x-auto hide-scrollbar -mx-1 px-1">
            <div className="flex gap-1.5 items-center min-w-max pr-1">
              {(['all', '80s', '90s', '00s'] as const).map(era => (
                <button
                  key={era}
                  onClick={() => setEraFilter(era)}
                  className={cn(
                    'px-3 py-1.5 rounded-full border-2 text-sm font-handwriting transition-all',
                    eraFilter === era
                      ? 'bg-wood-600 text-warm-100 border-wood-700'
                      : 'bg-warm-100 text-wood-600 border-kraft-300'
                  )}
                >
                  {era === 'all' ? '全部年代' : ERA_LABEL[era]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 第二行：排序方式 */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar -mx-1 px-1 pb-0.5">
          <div className="flex gap-1.5 min-w-max">
            {SORT_OPTIONS.map(o => (
              <button
                key={o.value}
                onClick={() => setSortBy(o.value)}
                className={cn(
                  'px-3 py-1 rounded-full border-2 text-xs font-handwriting transition-all whitespace-nowrap',
                  sortBy === o.value
                    ? 'bg-rust-500 text-warm-50 border-rust-700'
                    : 'bg-warm-100 text-wood-600 border-kraft-300'
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex-1 min-w-[2px]" />
        </div>
      </div>

      {/* 商品网格 */}
      <div className="px-4 pt-4">
        {list.length === 0 ? (
          <div className="py-20 text-center text-kraft-500 font-handwriting">
            <div className="text-6xl mb-3">🔍</div>
            这个年代的货架还空着～
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {list.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>

      {/* 筛选弹窗 */}
      <Modal open={filterOpen} onClose={() => setFilterOpen(false)} title="🎛️ 筛选设置">
        <div className="space-y-5">
          <div>
            <p className="font-handwriting text-wood-700 mb-2 text-lg">怀旧年代</p>
            <div className="flex flex-wrap gap-2">
              {(['all', '80s', '90s', '00s'] as const).map(era => (
                <button
                  key={era}
                  onClick={() => setEraFilter(era)}
                  className={cn(
                    'px-4 py-2 rounded-full border-2 text-sm font-handwriting transition-all',
                    eraFilter === era
                      ? 'bg-rust-500 text-warm-50 border-rust-700'
                      : 'bg-warm-100 text-wood-600 border-kraft-300'
                  )}
                >
                  {era === 'all' ? '不限' : ERA_LABEL[era]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-handwriting text-wood-700 mb-2 text-lg">排序方式</p>
            <div className="grid grid-cols-2 gap-2">
              {SORT_OPTIONS.map(o => (
                <button
                  key={o.value}
                  onClick={() => setSortBy(o.value)}
                  className={cn(
                    'px-3 py-2 rounded-xl border-2 text-sm font-handwriting transition-all',
                    sortBy === o.value
                      ? 'bg-wood-600 text-warm-100 border-wood-700'
                      : 'bg-warm-100 text-wood-600 border-kraft-300'
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setFilterOpen(false)}
            className="btn-retro-primary btn-retro-block mt-2"
          >
            查看 {list.length} 件宝贝
          </button>
        </div>
      </Modal>
    </div>
  );
}
