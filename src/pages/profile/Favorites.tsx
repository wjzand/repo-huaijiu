import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Header from '@/components/layout/Header';
import ProductCard from '@/components/product/ProductCard';
import { useUserStore } from '@/store/useUserStore';
import { products } from '@/data/products';
import { useMemo } from 'react';

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites } = useUserStore();

  const favProducts = useMemo(() => {
    return products.filter(p => favorites.includes(p.id));
  }, [favorites]);

  return (
    <div className="min-h-screen pb-28 bg-warm-50">
      <Header title="❤️ 我的童年心愿清单" />

      <div className="px-4 pt-4">
        {favProducts.length === 0 ? (
          <div className="card-kraft !p-10 text-center mt-8">
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-retro-pink/40 border-4 border-rust-400 flex items-center justify-center text-6xl shadow-vintage animate-bounce-soft">
                <Heart size={48} className="text-rust-500" />
              </div>
              <h3 className="font-handwriting text-2xl text-wood-700 mb-2">清单空空</h3>
              <p className="text-sm text-kraft-500 mb-6">把童年的宝贝都加入心愿清单吧～</p>
              <button onClick={() => navigate('/')} className="btn-retro-primary">
                去逛逛
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-3 flex items-end justify-between">
              <div>
                <h2 className="font-handwriting text-xl text-wood-700">
                  我收藏的 {favProducts.length} 件宝贝
                </h2>
                <p className="text-xs text-kraft-500 mt-0.5">
                  总价值 ¥{favProducts.reduce((s, p) => s + p.price, 0).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => navigate('/cart')}
                className="px-3 py-1 rounded-full bg-rust-500 text-warm-50 text-xs font-handwriting border-2 border-rust-700"
              >
                一键加购 →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {favProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
