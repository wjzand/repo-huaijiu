import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBasket, Sparkles } from 'lucide-react';
import Header from '@/components/layout/Header';
import ProductCard from '@/components/product/ProductCard';
import PriceTag from '@/components/product/PriceTag';
import { useCartStore } from '@/store/useCartStore';
import { products } from '@/data/products';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, totalPrice, totalCount, clearCart } = useCartStore();

  const recommended = useMemo(() => {
    if (items.length === 0) return products.slice(0, 4);
    const cats = new Set(items.map(i => i.product.category));
    return products
      .filter(p => !cats.has(p.category) || !items.find(i => i.productId === p.id))
      .slice(0, 4);
  }, [items]);

  const shipping = totalPrice >= 50 ? 0 : 6;
  const finalTotal = Number((totalPrice + shipping).toFixed(2));

  return (
    <div className="min-h-screen pb-[200px] bg-warm-50">
      <Header title={`🧺 我的竹篮 (${totalCount})`} />

      {items.length === 0 ? (
        <div className="px-4 pt-16 pb-10">
          <div className="card-kraft !p-10 text-center">
            <div className="relative z-10">
              <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-warm-200 border-4 border-wood-500 flex items-center justify-center text-6xl shadow-vintage animate-bounce-soft">
                🧺
              </div>
              <h2 className="font-handwriting text-2xl text-wood-700 mb-2">竹篮空空</h2>
              <p className="text-sm text-kraft-500 mb-6">快去挑几样童年宝贝吧！</p>
              <button onClick={() => navigate('/')} className="btn-retro-primary">
                <ShoppingBasket size={18} /> 开始逛逛
              </button>
            </div>
          </div>

          <h3 className="font-handwriting text-xl text-wood-700 mt-8 mb-3 flex items-center gap-1.5">
            <Sparkles size={18} /> 掌柜推荐
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {recommended.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      ) : (
        <div className="px-4 pt-4 space-y-4">
          {/* 商品列表 - 竹编篮视觉 */}
          <div className="wood-shelf rounded-3xl p-1">
            <div className="rounded-2xl p-1 bg-gradient-to-br from-kraft-300 to-kraft-400 relative z-10">
              <div className="rounded-xl p-4 space-y-3" style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  rgba(139,69,19,0.05) 0 4px,
                  transparent 4px 12px
                )`
              }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-handwriting text-wood-700 text-lg">🧺 我的竹篮子</span>
                  <button
                    onClick={clearCart}
                    className="text-xs font-handwriting text-rust-500 flex items-center gap-0.5"
                  >
                    <Trash2 size={12} /> 倒空篮子
                  </button>
                </div>

                {items.map(item => (
                  <div
                    key={item.productId}
                    className="flex gap-3 p-3 rounded-xl bg-warm-50 border-2 border-kraft-300 shadow-sm"
                  >
                    <div
                      onClick={() => navigate(`/product/${item.productId}`)}
                      className="glass-jar w-20 h-20 flex-shrink-0 overflow-hidden bg-warm-100 cursor-pointer"
                    >
                      <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <h4
                          onClick={() => navigate(`/product/${item.productId}`)}
                          className="font-handwriting text-wood-700 truncate cursor-pointer hover:text-rust-500"
                        >
                          {item.product.name}
                        </h4>
                        <div className="mt-1">
                          <PriceTag price={item.product.price} originalPrice={item.product.originalPrice} size="sm" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border-2 border-wood-500 rounded-lg overflow-hidden bg-warm-100">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-wood-700 active:bg-warm-200"
                          ><Minus size={14} /></button>
                          <span className="w-8 text-center font-handwriting text-wood-700">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-wood-700 active:bg-warm-200"
                          ><Plus size={14} /></button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-typewriter text-rust-600 text-sm font-bold">
                            ¥{(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="w-7 h-7 rounded-full bg-retro-pink/40 border-2 border-rust-400 flex items-center justify-center text-rust-600"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 算盘合计栏 */}
          <div className="card-kraft">
            <div className="relative z-10 space-y-2.5">
              <h3 className="font-handwriting text-xl text-wood-700 mb-2">🧮 算盘算账</h3>
              <Row label="商品件数" value={`${totalCount} 件`} />
              <Row label="商品合计" value={`¥${totalPrice.toFixed(2)}`} />
              <Row
                label="运费"
                value={shipping === 0 ? (
                  <span className="text-mint-400 font-bold">🎉 包邮啦</span>
                ) : `¥${shipping.toFixed(2)}`}
              />
              {shipping > 0 && (
                <p className="text-[11px] text-rust-500 font-handwriting -mt-1">
                  再买 ¥{(50 - totalPrice).toFixed(2)} 即可包邮～
                </p>
              )}
              <div className="border-t-2 border-dashed border-kraft-300 my-2" />
              <div className="flex items-center justify-between">
                <span className="font-handwriting text-lg text-wood-700">应付总额</span>
                <span className="font-typewriter text-2xl text-rust-600 font-bold">
                  ¥{finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* 再来一包推荐 */}
          <div>
            <h3 className="font-handwriting text-xl text-wood-700 mb-3 flex items-center gap-1.5">
              🎁 再来一包？
            </h3>
            <div className="space-y-2.5">
              {recommended.slice(0, 3).map(p => (
                <ProductCard key={p.id} product={p} variant="horizontal" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 底部结算栏 */}
      {items.length > 0 && (
        <div className="fixed bottom-[78px] left-1/2 -translate-x-1/2 w-full max-w-[480px] z-40 px-3 pb-2">
          <div className="wood-shelf rounded-2xl p-1">
            <div className="rounded-xl bg-warm-50 p-3 flex items-center gap-3 relative z-10">
              <div className="flex-1">
                <div className="text-xs text-kraft-500 font-handwriting">合计（含运费¥{shipping}）</div>
                <div className="font-typewriter text-2xl text-rust-600 font-bold leading-tight">
                  ¥{finalTotal.toFixed(2)}
                </div>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className={cn(
                  'btn-retro-primary !px-6 !py-3 text-lg',
                  totalCount === 0 && 'opacity-50 cursor-not-allowed pointer-events-none'
                )}
              >
                去结账 →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-kraft-500 font-handwriting">{label}</span>
      <span className="text-wood-700 font-typewriter">{value}</span>
    </div>
  );
}
