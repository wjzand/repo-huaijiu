import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Heart, MessageCircle, Plus, Minus, ShoppingCart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import StarRating from '@/components/product/StarRating';
import PriceTag from '@/components/product/PriceTag';
import ProductCard from '@/components/product/ProductCard';
import { useToast } from '@/components/common/Toast';
import { getProductById, products } from '@/data/products';
import { ERA_LABEL } from '@/types';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { useUserStore } from '@/store/useUserStore';

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { show } = useToast();
  const product = useMemo(() => (id ? getProductById(id) : undefined), [id]);
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const addItem = useCartStore(s => s.addItem);
  const { toggleFavorite, isFavorite } = useUserStore();

  const related = useMemo(() => {
    if (!product) return [];
    return products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header title="商品不存在" />
        <div className="py-24 text-center text-kraft-500 font-handwriting">
          <div className="text-6xl mb-4">😢</div>
          <p>这件宝贝从货架上掉下来了…</p>
          <button onClick={() => navigate(-1)} className="btn-retro mt-6">回到货架</button>
        </div>
      </div>
    );
  }

  const images = [product.image, ...(product.images || [])];

  const handleAddCart = () => {
    addItem(product, qty);
    show(`「${product.name}」x${qty} 已扔进竹篮 🧺`, 'success');
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    navigate('/checkout');
  };

  const fav = isFavorite(product.id);

  return (
    <div className="min-h-screen pb-28 bg-warm-50">
      <Header title="宝贝详情" />

      {/* 商品图轮播 */}
      <div className="px-4 pt-4">
        <div className="card-kraft !p-2">
          <div className="glass-jar aspect-square overflow-hidden bg-warm-100 relative z-10">
            <img src={images[imgIdx]} alt={product.name} className="w-full h-full object-cover" />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-warm-50/80 border border-wood-400 flex items-center justify-center text-wood-700"
                ><ChevronLeft size={18} /></button>
                <button
                  onClick={() => setImgIdx(i => (i + 1) % images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-warm-50/80 border border-wood-400 flex items-center justify-center text-wood-700"
                ><ChevronRight size={18} /></button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {images.map((_, i) => (
                    <span key={i} className={cn('h-1.5 rounded-full transition-all',
                      i === imgIdx ? 'w-5 bg-rust-500' : 'w-1.5 bg-warm-300')} />
                  ))}
                </div>
              </>
            )}
            <div className="absolute top-2 left-2 flex flex-col gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-wood-600/90 text-warm-100 text-xs font-handwriting border border-warm-200/30">
                {ERA_LABEL[product.era]}
              </span>
              {product.tags.slice(0, 2).map(t => (
                <span key={t} className="px-2 py-0.5 rounded-full bg-warm-200/90 text-wood-700 text-[10px] font-handwriting">
                  #{t}
                </span>
              ))}
            </div>
            <button
              onClick={() => { toggleFavorite(product.id); show(!fav ? '已加入童年心愿清单 ❤️' : '已移除收藏', !fav ? 'success' : 'info'); }}
              className={cn(
                'absolute top-2 right-2 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all',
                fav
                  ? 'bg-rust-500 border-rust-700 text-warm-50 shadow-lg'
                  : 'bg-warm-50/95 border-wood-500 text-wood-600'
              )}
            >
              <Heart size={18} className={cn(fav && 'fill-current animate-bounce-soft')} />
            </button>
          </div>
        </div>
      </div>

      {/* 基本信息 */}
      <div className="px-4 pt-4">
        <div className="card-kraft !p-5 space-y-3">
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3">
              <h1 className="flex-1 font-handwriting text-2xl text-wood-700 leading-tight">
                {product.name}
              </h1>
              <div className="stamp !text-lg !px-3 !py-0.5 flex-shrink-0">
                怀旧
                <div className="flex justify-center mt-0.5">
                  <StarRating stars={product.nostalgiaStars} size={10} />
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-end justify-between flex-wrap gap-2">
              <PriceTag price={product.price} originalPrice={product.originalPrice} size="lg" />
              <div className="text-xs text-kraft-500 font-typewriter space-x-3">
                <span>销量 {product.sales}</span>
                <span>库存 {product.stock}</span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.tags.map(t => (
                <span key={t} className="px-2 py-0.5 rounded-full bg-retro-pink/40 border border-retro-pink text-rust-600 text-xs font-handwriting">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 回忆故事 */}
      <div className="px-4 pt-4">
        <div className="card-kraft !p-5">
          <div className="relative z-10">
            <h3 className="font-handwriting text-xl text-wood-700 flex items-center gap-2 mb-3">
              <MessageCircle size={18} /> 回忆小故事
            </h3>
            <p className="font-handwriting text-wood-700 leading-relaxed text-[15px] whitespace-pre-wrap">
              {product.memoryStory}
            </p>
            {product.coldKnowledge && (
              <div className="mt-4 p-3 rounded-xl bg-retro-blue/20 border-2 border-dashed border-retro-blue/50">
                <p className="text-sm font-bold text-wood-700 flex items-center gap-1 mb-1">
                  <Sparkles size={14} /> 冷知识
                </p>
                <p className="text-sm text-wood-600 leading-relaxed">{product.coldKnowledge}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 晒单墙 */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="px-4 pt-4">
          <div className="card-kraft !p-5">
            <div className="relative z-10">
              <h3 className="font-handwriting text-xl text-wood-700 mb-3">📸 同好晒单墙</h3>
              <div className="space-y-3">
                {product.reviews.map(r => (
                  <div key={r.id} className="flex gap-3 p-3 rounded-xl bg-warm-50 border border-kraft-200">
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 border-wood-400">
                      <img src={r.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xl">{r.avatar}</span>
                          <span className="font-handwriting text-wood-700 text-sm">{r.nickname}</span>
                        </div>
                        <span className="text-[10px] text-kraft-500 font-typewriter">{r.createdAt}</span>
                      </div>
                      <p className="mt-1 text-sm text-wood-600">{r.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 相关推荐 */}
      {related.length > 0 && (
        <div className="px-4 pt-5">
          <h3 className="font-handwriting text-xl text-wood-700 mb-3">🛒 再来几件？</h3>
          <div className="grid grid-cols-2 gap-3">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}

      {/* 底部操作栏 */}
      <div className="fixed bottom-[78px] left-1/2 -translate-x-1/2 w-full max-w-[480px] z-40 px-3 pb-2">
        <div className="wood-shelf rounded-2xl p-1">
          <div className="rounded-xl bg-warm-50 p-2 flex items-center gap-2 relative z-10">
            <div className="flex items-center border-2 border-wood-500 rounded-xl overflow-hidden bg-warm-100">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-9 h-10 flex items-center justify-center text-wood-700 active:bg-warm-200"
              ><Minus size={16} /></button>
              <span className="w-10 text-center font-handwriting text-wood-700 text-lg">{qty}</span>
              <button
                onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                className="w-9 h-10 flex items-center justify-center text-wood-700 active:bg-warm-200"
              ><Plus size={16} /></button>
            </div>
            <button
              onClick={handleAddCart}
              className="flex-1 btn-retro py-2.5 text-base"
            >
              <ShoppingCart size={18} /> 扔进竹篮
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 btn-retro-primary py-2.5 text-base"
            >
              立即结账
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
