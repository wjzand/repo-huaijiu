import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight, CreditCard, Phone, Ticket } from 'lucide-react';
import Header from '@/components/layout/Header';
import PriceTag from '@/components/product/PriceTag';
import Modal from '@/components/common/Modal';
import { useToast } from '@/components/common/Toast';
import { useCartStore } from '@/store/useCartStore';
import { useUserStore } from '@/store/useUserStore';
import { useDanmakuStore } from '@/store/useDanmakuStore';
import type { Address, Coupon } from '@/types';
import { cn } from '@/lib/utils';

export default function Checkout() {
  const navigate = useNavigate();
  const { show } = useToast();
  const { items, totalPrice, totalCount, clearCart } = useCartStore();
  const { addresses, getDefaultAddress, addAddress, coupons, addOrder, addCoupon, addDanmakuRecord } = useUserStore();
  const { addDanmaku } = useDanmakuStore();

  const [addrOpen, setAddrOpen] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);
  const [danmakuOpen, setDanmakuOpen] = useState(false);
  const [selectedAddr, setSelectedAddr] = useState<Address | undefined>(() => getDefaultAddress());
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [danmakuAge, setDanmakuAge] = useState(10);
  const [danmakuMsg, setDanmakuMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 地址表单
  const [form, setForm] = useState<Omit<Address, 'id'>>({
    name: '', phone: '', province: '', city: '', district: '', detail: '', isDefault: true,
  });

  const shipping = totalPrice >= 50 ? 0 : 6;
  const couponDiscount = useMemo(() => {
    if (!selectedCoupon) return 0;
    if (selectedCoupon.type === 'shipping') return shipping;
    if (selectedCoupon.type === 'nothreshold') return selectedCoupon.value;
    if (selectedCoupon.type === 'threshold' && totalPrice >= (selectedCoupon.threshold || 0)) {
      return selectedCoupon.value;
    }
    return 0;
  }, [selectedCoupon, totalPrice, shipping]);

  const finalTotal = Number(Math.max(0, totalPrice + shipping - couponDiscount).toFixed(2));

  const availableCoupons = useMemo(() => coupons.filter(c => {
    if (c.used) return false;
    if (c.type === 'threshold') return totalPrice >= (c.threshold || 0);
    return true;
  }), [coupons, totalPrice]);

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSaveAddress = () => {
    if (!form.name || !form.phone || !form.detail) {
      show('请填写完整的收货信息', 'error');
      return;
    }
    addAddress(form);
    const list = addresses;
    const newAddr: any = { ...form, id: 'new_' + Date.now() };
    if (form.isDefault || list.length === 0) {
      setSelectedAddr(newAddr);
    }
    setAddrOpen(false);
    setForm({ name: '', phone: '', province: '', city: '', district: '', detail: '', isDefault: true });
    show('地址已保存 ✅', 'success');
  };

  const handleSubmit = () => {
    if (!selectedAddr) {
      show('请选择收货地址', 'error');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      // 创建订单
      const orderId = 'ZZH' + Date.now();
      const order: any = {
        id: orderId,
        items: [...items],
        totalAmount: finalTotal,
        status: 'paid',
        address: selectedAddr,
        createdAt: new Date().toISOString(),
        paidAt: new Date().toISOString(),
        danmakuMessage: danmakuMsg,
        danmakuAge,
      };
      addOrder(order);

      // 扣减优惠券
      if (selectedCoupon) {
        const s = useUserStore.getState();
        s.useCoupon(selectedCoupon.id);
      }

      // 发布弹幕
      if (danmakuMsg.trim()) {
        const dmk: any = {
          city: selectedAddr.city,
          nickname: selectedAddr.name + '同学',
          productName: items[0].product.name + (items.length > 1 ? '等' + items.length + '件' : ''),
          message: danmakuMsg,
          age: danmakuAge,
        };
        addDanmaku(dmk);
        addDanmakuRecord({ ...dmk, id: 'd_' + Date.now(), likes: 0, createdAt: new Date().toLocaleString() });
      }

      // 清空购物车
      clearCart();
      setSubmitting(false);

      // 新客奖励一张优惠券
      if (useUserStore.getState().orders.length <= 1) {
        addCoupon({
          id: '', name: '回购立减券', type: 'threshold', value: 8, threshold: 40,
          expireAt: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().slice(0, 10),
          used: false,
        });
      }

      navigate(`/order-success?id=${orderId}`, {
        state: { order, danmakuAge, danmakuMsg },
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen pb-[200px] bg-warm-50">
      <Header title="📝 填写订单" />

      <div className="px-4 pt-4 space-y-4">
        {/* 收货地址 */}
        <div className="card-kraft">
          <div className="relative z-10">
            <h3 className="font-handwriting text-xl text-wood-700 flex items-center gap-1.5 mb-3">
              <MapPin size={18} /> 收货地址
            </h3>

            {selectedAddr ? (
              <button
                onClick={() => setAddrOpen(true)}
                className="w-full text-left p-4 rounded-xl bg-warm-100 border-2 border-dashed border-kraft-400 flex items-center gap-3 hover:border-wood-500 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-handwriting text-wood-700">{selectedAddr.name}</span>
                    <span className="text-sm text-wood-600 font-typewriter">{selectedAddr.phone}</span>
                    {selectedAddr.isDefault && (
                      <span className="px-1.5 py-0.5 rounded-full bg-rust-500 text-warm-50 text-[10px] font-handwriting border border-rust-700">默认</span>
                    )}
                  </div>
                  <p className="text-sm text-kraft-500 leading-snug truncate">
                    {selectedAddr.province}{selectedAddr.city}{selectedAddr.district} {selectedAddr.detail}
                  </p>
                </div>
                <ChevronRight size={18} className="text-kraft-500 flex-shrink-0" />
              </button>
            ) : (
              <button
                onClick={() => setAddrOpen(true)}
                className="w-full p-6 rounded-xl bg-warm-100 border-2 border-dashed border-kraft-400 text-center text-kraft-500 font-handwriting hover:border-wood-500 transition-colors"
              >
                + 新增收货地址
              </button>
            )}
          </div>
        </div>

        {/* 商品清单 */}
        <div className="card-kraft">
          <div className="relative z-10">
            <h3 className="font-handwriting text-xl text-wood-700 mb-3">🛒 订单商品</h3>
            <div className="space-y-2.5">
              {items.map(i => (
                <div key={i.productId} className="flex gap-3 p-2 rounded-lg bg-warm-50 border border-kraft-200">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-warm-100 border-2 border-wood-400 flex-shrink-0">
                    <img src={i.product.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-handwriting text-wood-700 text-sm truncate">{i.product.name}</p>
                    <div className="mt-0.5 flex items-center justify-between">
                      <span className="text-xs text-kraft-500">x{i.quantity}</span>
                      <span className="font-typewriter text-rust-600 text-sm">¥{(i.product.price * i.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 优惠券 */}
        <div className="card-kraft">
          <div className="relative z-10">
            <button
              onClick={() => setCouponOpen(true)}
              className="w-full flex items-center gap-2"
            >
              <Ticket size={18} className="text-rust-500" />
              <span className="font-handwriting text-xl text-wood-700 flex-1 text-left">优惠券</span>
              <span className={cn(
                'font-typewriter',
                selectedCoupon ? 'text-rust-500' : 'text-kraft-500'
              )}>
                {selectedCoupon ? `-¥${couponDiscount.toFixed(2)}` : `${availableCoupons.length}张可用`}
              </span>
              <ChevronRight size={18} className="text-kraft-500" />
            </button>
          </div>
        </div>

        {/* 时光机留言 */}
        <div className="card-kraft">
          <div className="relative z-10">
            <button
              onClick={() => setDanmakuOpen(true)}
              className="w-full text-left"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">📺</span>
                <span className="font-handwriting text-xl text-wood-700 flex-1">时光机弹幕 · 那年寄语</span>
                {danmakuMsg && (
                  <span className="px-2 py-0.5 rounded-full bg-rust-500 text-warm-50 text-[10px] font-handwriting border border-rust-700">已填写</span>
                )}
              </div>
              {danmakuMsg ? (
                <p className="text-sm text-wood-600">
                  那年 <span className="font-bold text-rust-500">{danmakuAge}</span> 岁 · {danmakuMsg}
                </p>
              ) : (
                <p className="text-sm text-kraft-500">
                  下单后将以弹幕形式飘过首页，说说你那年的故事吧～
                </p>
              )}
            </button>
          </div>
        </div>

        {/* 支付方式 */}
        <div className="card-kraft">
          <div className="relative z-10">
            <h3 className="font-handwriting text-xl text-wood-700 flex items-center gap-1.5 mb-3">
              <CreditCard size={18} /> 支付方式
            </h3>
            <div className="space-y-2">
              {[
                { icon: '💚', name: '微信支付', desc: '推荐使用', active: true },
                { icon: '💙', name: '支付宝', desc: '', active: false },
              ].map(p => (
                <div
                  key={p.name}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl border-2',
                    p.active ? 'bg-mint-200/40 border-mint-400' : 'bg-warm-50 border-kraft-200'
                  )}
                >
                  <span className="text-2xl">{p.icon}</span>
                  <div className="flex-1">
                    <p className="font-handwriting text-wood-700">{p.name}</p>
                    {p.desc && <p className="text-xs text-kraft-500">{p.desc}</p>}
                  </div>
                  <div className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                    p.active ? 'bg-rust-500 border-rust-700' : 'border-kraft-400'
                  )}>
                    {p.active && <Phone size={12} className="text-warm-50" strokeWidth={4} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 合计明细 */}
        <div className="card-kraft">
          <div className="relative z-10 space-y-2">
            <Row label="商品金额" value={`¥${totalPrice.toFixed(2)}`} />
            <Row label="商品件数" value={`${totalCount} 件`} />
            <Row label="运费" value={shipping === 0 ? '🎉 包邮' : `¥${shipping.toFixed(2)}`} />
            {couponDiscount > 0 && (
              <Row label="优惠券" value={<span className="text-mint-400">-¥{couponDiscount.toFixed(2)}</span>} />
            )}
            <div className="border-t-2 border-dashed border-kraft-300 my-1.5" />
            <div className="flex items-center justify-between">
              <span className="font-handwriting text-lg text-wood-700">实付金额</span>
              <div>
                <span className="font-handwriting text-sm text-kraft-500 mr-2">共省 ¥{couponDiscount.toFixed(2)}</span>
                <span className="font-typewriter text-3xl text-rust-600 font-bold">¥{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部提交栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-40 px-3 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2">
        <div className="wood-shelf rounded-2xl p-1">
          <div className="rounded-xl bg-warm-50 p-3 flex items-center gap-3 relative z-10">
            <div className="flex-1">
              <div className="text-xs text-kraft-500 font-handwriting">实付金额</div>
              <div className="font-typewriter text-2xl text-rust-600 font-bold leading-tight">
                ¥{finalTotal.toFixed(2)}
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={cn(
                'btn-retro-primary !px-8 !py-3 text-lg min-w-[140px]',
                submitting && 'opacity-70 cursor-wait'
              )}
            >
              {submitting ? '支付中...' : '确认支付'}
            </button>
          </div>
        </div>
      </div>

      {/* 地址弹窗 */}
      <Modal open={addrOpen} onClose={() => setAddrOpen(false)} title="📮 新增收货地址">
        <div className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <Field label="收货人" value={form.name} onChange={v => setForm(s => ({ ...s, name: v }))} placeholder="请输入姓名" />
            <Field label="手机号码" value={form.phone} onChange={v => setForm(s => ({ ...s, phone: v }))} placeholder="11位手机号" />
          </div>
          <Field label="所在地区" value={`${form.province}${form.city}${form.district}`} onChange={() => {}} placeholder="点击选择省/市/区" readOnly />
          <div className="grid grid-cols-3 gap-2">
            <Field label="省份" value={form.province} onChange={v => setForm(s => ({ ...s, province: v }))} placeholder="北京市" />
            <Field label="城市" value={form.city} onChange={v => setForm(s => ({ ...s, city: v }))} placeholder="北京市" />
            <Field label="区县" value={form.district} onChange={v => setForm(s => ({ ...s, district: v }))} placeholder="朝阳区" />
          </div>
          <Field label="详细地址" value={form.detail} onChange={v => setForm(s => ({ ...s, detail: v }))} placeholder="街道门牌号等" multiline />
          <label className="flex items-center gap-2 text-sm text-wood-700 font-handwriting">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={e => setForm(s => ({ ...s, isDefault: e.target.checked }))}
              className="w-4 h-4 accent-rust-500"
            />
            设为默认地址
          </label>

          {addresses.length > 0 && (
            <div>
              <p className="text-xs text-kraft-500 font-handwriting mb-2">选择已有地址：</p>
              <div className="space-y-2 max-h-40 overflow-auto">
                {addresses.map(a => (
                  <button
                    key={a.id}
                    onClick={() => { setSelectedAddr(a); setAddrOpen(false); }}
                    className={cn(
                      'w-full text-left p-3 rounded-xl border-2',
                      selectedAddr?.id === a.id ? 'bg-warm-200 border-wood-500' : 'bg-warm-50 border-kraft-200'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-handwriting text-wood-700 text-sm">{a.name}</span>
                      <span className="text-xs text-kraft-500">{a.phone}</span>
                    </div>
                    <p className="text-[11px] text-kraft-500 truncate">
                      {a.province}{a.city}{a.district} {a.detail}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button onClick={handleSaveAddress} className="btn-retro-primary btn-retro-block !mt-2">
            保存并使用
          </button>
        </div>
      </Modal>

      {/* 优惠券弹窗 */}
      <Modal open={couponOpen} onClose={() => setCouponOpen(false)} title="🎫 选择优惠券">
        <div className="space-y-3">
          {availableCoupons.length === 0 ? (
            <div className="py-10 text-center text-kraft-500 font-handwriting">
              <div className="text-5xl mb-2">😢</div>暂无可用优惠券
            </div>
          ) : availableCoupons.map(c => {
            const active = selectedCoupon?.id === c.id;
            const valid = c.type !== 'threshold' || totalPrice >= (c.threshold || 0);
            return (
              <button
                key={c.id}
                onClick={() => valid && setSelectedCoupon(active ? null : c)}
                disabled={!valid}
                className={cn(
                  'w-full relative overflow-hidden rounded-xl border-2 p-0 flex transition-all',
                  active ? 'border-rust-500 shadow-vintage' : 'border-kraft-300',
                  !valid && 'opacity-50 cursor-not-allowed'
                )}
              >
                <div className={cn(
                  'w-24 flex flex-col items-center justify-center py-4 text-center text-warm-50',
                  c.type === 'shipping' ? 'bg-mint-400' : 'bg-gradient-to-br from-rust-400 to-rust-600'
                )}>
                  <div className="font-typewriter text-2xl font-bold">
                    {c.type === 'shipping' ? '包邮' : `¥${c.value}`}
                  </div>
                  {c.type === 'threshold' && (
                    <div className="text-xs opacity-90">满{c.threshold}可用</div>
                  )}
                </div>
                <div className="flex-1 p-3 text-left bg-warm-50 flex flex-col justify-between">
                  <div>
                    <p className="font-handwriting text-wood-700">{c.name}</p>
                    <p className="text-[11px] text-kraft-500 mt-0.5">有效期至 {c.expireAt}</p>
                  </div>
                  <div className={cn(
                    'self-end mt-2 w-5 h-5 rounded-full border-2 flex items-center justify-center',
                    active ? 'bg-rust-500 border-rust-700' : 'border-kraft-400'
                  )}>
                    {active && <span className="w-2 h-2 rounded-full bg-warm-50" />}
                  </div>
                </div>
              </button>
            );
          })}
          {selectedCoupon && (
            <button onClick={() => setSelectedCoupon(null)} className="text-xs text-rust-500 font-handwriting w-full text-center">
              不使用优惠券
            </button>
          )}
        </div>
      </Modal>

      {/* 时光机弹幕弹窗 */}
      <Modal open={danmakuOpen} onClose={() => setDanmakuOpen(false)} title="📺 时光机弹幕">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-warm-100 border-2 border-dashed border-kraft-400">
            <p className="text-sm text-wood-700 font-handwriting leading-relaxed">
              下单后，你留下的这句话将以弹幕形式飘过杂货铺首页，让所有小伙伴都看到你的童年回忆～✨
            </p>
          </div>
          <div>
            <label className="font-handwriting text-wood-700 mb-2 block">
              那年我 <span className="font-typewriter text-rust-600 font-bold text-lg mx-1">{danmakuAge}</span> 岁
            </label>
            <input
              type="range" min={4} max={25} value={danmakuAge}
              onChange={e => setDanmakuAge(Number(e.target.value))}
              className="w-full accent-rust-500"
            />
            <div className="flex justify-between text-[10px] text-kraft-500 font-typewriter">
              <span>4岁</span><span>14岁</span><span>25岁</span>
            </div>
          </div>
          <div>
            <label className="font-handwriting text-wood-700 mb-2 block">想说的话</label>
            <textarea
              value={danmakuMsg}
              onChange={e => setDanmakuMsg(e.target.value.slice(0, 40))}
              rows={3}
              placeholder="例：外婆偷偷塞给我的零花钱都买它了～"
              className="w-full p-3 rounded-xl bg-warm-50 border-2 border-kraft-300 outline-none focus:border-wood-500 font-handwriting text-wood-700 resize-none"
            />
            <div className="mt-1 text-right text-[11px] text-kraft-500 font-typewriter">
              {danmakuMsg.length}/40
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['省下的零花钱买的', '跟同桌一人一半', '长大后我就成了你'].map(s => (
              <button
                key={s}
                onClick={() => setDanmakuMsg(s)}
                className="px-2 py-1.5 rounded-full bg-kraft-100 border border-kraft-300 text-[11px] font-handwriting text-wood-700 text-center"
              >
                {s}
              </button>
            ))}
          </div>
          <button onClick={() => setDanmakuOpen(false)} className="btn-retro-primary btn-retro-block">
            确认寄语
          </button>
        </div>
      </Modal>
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

function Field({
  label, value, onChange, placeholder, multiline, readOnly,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; multiline?: boolean; readOnly?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-handwriting text-kraft-500 mb-1 block">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={2}
          placeholder={placeholder}
          readOnly={readOnly}
          className="w-full p-2.5 rounded-xl bg-warm-50 border-2 border-kraft-300 outline-none focus:border-wood-500 font-retro text-sm text-wood-700 resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          className="w-full p-2.5 rounded-xl bg-warm-50 border-2 border-kraft-300 outline-none focus:border-wood-500 font-retro text-sm text-wood-700"
        />
      )}
    </div>
  );
}
