import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Plus, MessageCircle } from 'lucide-react';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';
import StarRating from './StarRating';
import PriceTag from './PriceTag';
import Modal from '../common/Modal';
import { useCartStore } from '@/store/useCartStore';
import { useUserStore } from '@/store/useUserStore';
import { useToast } from '../common/Toast';
import { ERA_LABEL } from '@/types';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'horizontal' | 'recommend';
  className?: string;
}

export default function ProductCard({ product, variant = 'default', className }: ProductCardProps) {
  const navigate = useNavigate();
  const { show } = useToast();
  const addItem = useCartStore(s => s.addItem);
  const { toggleFavorite, isFavorite } = useUserStore();
  const [storyOpen, setStoryOpen] = useState(false);
  const [animating, setAnimating] = useState(false);

  const fav = isFavorite(product.id);

  const handleAddCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 500);
    show(`「${product.name}」已扔进竹篮 🧺`, 'success');
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
    show(!fav ? '已加入童年心愿清单 ❤️' : '已移除收藏', !fav ? 'success' : 'info');
  };

  const handleStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStoryOpen(true);
  };

  // 推荐卡片：横向小卡片
  if (variant === 'recommend') {
    return (
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="w-[150px] flex-shrink-0 card-kraft cursor-pointer group hover:animate-bounce-soft"
      >
        <div className="glass-jar aspect-square mb-2 overflow-hidden bg-warm-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <h4 className="font-handwriting text-wood-700 text-sm truncate">{product.name}</h4>
        <div className="mt-1 flex items-center justify-between">
          <PriceTag price={product.price} originalPrice={product.originalPrice} size="sm" />
          <button
            onClick={handleAddCart}
            className="w-7 h-7 rounded-full bg-rust-500 text-warm-50 flex items-center justify-center
              border-2 border-rust-700 shadow-button-3d active:shadow-button-pressed active:translate-y-[1px]
              transition-all"
          >
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>
      </div>
    );
  }

  // 横向布局（购物车推荐等）
  if (variant === 'horizontal') {
    return (
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="flex gap-3 p-3 rounded-xl bg-warm-50 border-2 border-kraft-200 cursor-pointer hover:border-wood-500 transition-all"
      >
        <div className="glass-jar w-20 h-20 flex-shrink-0 overflow-hidden bg-warm-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <h4 className="font-handwriting text-wood-700 text-sm truncate">{product.name}</h4>
            <div className="mt-0.5"><StarRating stars={product.nostalgiaStars} size={12} /></div>
          </div>
          <div className="flex items-center justify-between">
            <PriceTag price={product.price} size="sm" />
            <button
              onClick={handleAddCart}
              className="text-xs px-3 py-1 rounded-full bg-rust-500 text-warm-50 border-2 border-rust-700 font-handwriting"
            >
              加购
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 默认：瀑布流商品卡片
  return (
    <>
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className={cn(
          'card-kraft cursor-pointer group transition-all duration-300',
          'hover:-translate-y-1 hover:rotate-[-1deg] hover:shadow-2xl',
          animating && 'animate-cart-bounce',
          className
        )}
      >
        <div className="relative mb-3">
          <div className="glass-jar aspect-square overflow-hidden bg-warm-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-wood-600/90 text-warm-100 text-[10px] font-handwriting border border-warm-200/30">
            {ERA_LABEL[product.era]}
          </div>
          <button
            onClick={handleToggleFav}
            className={cn(
              'absolute top-2 right-2 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all',
              fav
                ? 'bg-rust-500 border-rust-700 text-warm-50'
                : 'bg-warm-50/90 border-wood-400 text-wood-600 hover:bg-warm-100'
            )}
          >
            <Heart size={16} className={cn('transition-all', fav && 'fill-current animate-bounce-soft')} />
          </button>
          <button
            onClick={handleStory}
            className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-warm-100/95 border-2 border-wood-500
              flex items-center justify-center text-wood-700 hover:bg-warm-200 transition-colors group"
            title="回忆小故事"
          >
            <MessageCircle size={15} className="group-hover:animate-bounce-soft" />
          </button>
        </div>

        <div className="relative z-10">
          <h3 className="font-handwriting text-lg text-wood-700 leading-tight line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
          <div className="mt-1.5 flex items-center justify-between">
            <StarRating stars={product.nostalgiaStars} size={13} />
            <span className="text-[11px] text-kraft-500 font-typewriter">销量{product.sales > 999 ? `${(product.sales / 1000).toFixed(1)}k` : product.sales}</span>
          </div>
          <div className="mt-2 flex items-end justify-between gap-2">
            <PriceTag price={product.price} originalPrice={product.originalPrice} size="sm" />
            <button
              onClick={handleAddCart}
              className="w-9 h-9 rounded-full bg-rust-500 text-warm-50 flex items-center justify-center
                border-2 border-rust-700 shadow-button-3d active:shadow-button-pressed active:translate-y-[2px]
                transition-all hover:bg-rust-400"
              title="加入购物车"
            >
              <Plus size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      <Modal open={storyOpen} onClose={() => setStoryOpen(false)} title="💭 回忆小故事">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-warm-100 border-2 border-dashed border-kraft-400">
            <p className="font-handwriting text-wood-700 leading-relaxed text-[15px] whitespace-pre-wrap">
              {product.memoryStory}
            </p>
          </div>
          {product.coldKnowledge && (
            <div className="p-4 rounded-xl bg-retro-blue/20 border-2 border-retro-blue/50">
              <p className="text-sm font-bold text-wood-700 mb-1">🧠 冷知识</p>
              <p className="text-sm text-wood-600 leading-relaxed">{product.coldKnowledge}</p>
            </div>
          )}
          <button
            onClick={() => { setStoryOpen(false); navigate(`/product/${product.id}`); }}
            className="btn-retro-primary btn-retro-block mt-2"
          >
            去看看详情 →
          </button>
        </div>
      </Modal>
    </>
  );
}
