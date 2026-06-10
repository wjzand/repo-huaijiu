import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Share2, Download, Sparkles } from 'lucide-react';
import { useMemo } from 'react';

interface OrderState {
  order: any;
  danmakuAge?: number;
  danmakuMsg?: string;
}

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as OrderState | null;

  const order = state?.order;
  const orderId = new URLSearchParams(location.search).get('id') || 'ZZH000000000000';
  const now = useMemo(() => new Date(), []);
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  if (!order) {
    return (
      <div className="min-h-screen pb-10 bg-warm-100 flex items-center justify-center p-4">
        <div className="card-kraft !p-8 text-center w-full max-w-sm">
          <div className="relative z-10">
            <div className="text-6xl mb-4">🧾</div>
            <p className="font-handwriting text-wood-700 mb-6">没有找到订单信息～</p>
            <button onClick={() => navigate('/')} className="btn-retro-primary btn-retro-block">
              <Home size={18} /> 回杂货铺
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalQty = order.items.reduce((s: number, i: any) => s + i.quantity, 0);

  return (
    <div className="min-h-screen py-8 px-4 bg-warm-100 bg-paper-texture">
      <div className="max-w-sm mx-auto space-y-4">
        {/* 成功提示 */}
        <div className="text-center py-4">
          <div className="inline-block animate-bounce-soft">
            <div className="text-6xl mb-2">🎉</div>
          </div>
          <h1 className="font-handwriting text-3xl text-wood-700 text-shadow-hand">
            下单成功！
          </h1>
          <p className="text-sm text-kraft-500 mt-1 font-handwriting">
            感谢你，为童年回忆买单
          </p>
        </div>

        {/* 怀旧小票 */}
        <div id="receipt-area" className="receipt">
          <div className="text-center mb-3">
            <h2 className="font-handwriting text-2xl text-wood-700 leading-tight">
              🏮 电子杂货铺 🏮
            </h2>
            <p className="text-[11px] text-kraft-500 font-typewriter mt-0.5">
              ELECTRONIC · GROCERY · STORE
            </p>
            <p className="text-[10px] text-kraft-500 mt-0.5">
              童年回忆供销社 · 童叟无欺
            </p>
          </div>

          <div className="border-t border-dashed border-kraft-400 my-3" />

          <div className="space-y-1 text-[12px] font-typewriter text-wood-600">
            <div className="flex justify-between">
              <span>单号：</span><span>{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>日期：</span><span>{dateStr}</span>
            </div>
            <div className="flex justify-between">
              <span>收银员：</span><span>店小二 007</span>
            </div>
            <div className="flex justify-between">
              <span>会员：</span><span>{order.address?.name || 'VIP0088'}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-kraft-400 my-3" />

          <table className="w-full text-[12px] font-typewriter text-wood-700">
            <thead>
              <tr className="text-kraft-500 text-[11px]">
                <th className="text-left pb-1 font-normal">商品</th>
                <th className="text-center pb-1 font-normal w-10">数量</th>
                <th className="text-right pb-1 font-normal w-16">金额</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((i: any) => (
                <tr key={i.productId}>
                  <td className="py-0.5 pr-2">
                    <div className="truncate max-w-[130px]">{i.product.name}</div>
                    <div className="text-[10px] text-kraft-500">¥{i.product.price.toFixed(2)}</div>
                  </td>
                  <td className="text-center">x{i.quantity}</td>
                  <td className="text-right">¥{(i.product.price * i.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t border-dashed border-kraft-400 my-3" />

          <div className="space-y-1 text-[12px] font-typewriter text-wood-700">
            <div className="flex justify-between">
              <span>件数：</span><span>{totalQty} 件</span>
            </div>
            <div className="flex justify-between">
              <span>合计：</span>
              <span className="font-bold text-rust-600 text-base">¥{order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[11px] text-kraft-500">
              <span>支付方式：</span><span>💚 微信支付</span>
            </div>
          </div>

          <div className="border-t border-dashed border-kraft-400 my-3" />

          {/* 时光机弹幕信息 */}
          {state?.danmakuMsg && (
            <div className="mb-3 p-2.5 rounded-lg bg-retro-blue/15 border border-retro-blue/40 text-center">
              <p className="text-[10px] text-kraft-500 font-handwriting mb-0.5">📺 时光机弹幕·已发出</p>
              <p className="text-sm font-handwriting text-wood-700">
                那年 <span className="text-rust-500 font-bold">{state.danmakuAge}</span> 岁 · {state.danmakuMsg}
              </p>
            </div>
          )}

          <div className="text-center space-y-2">
            <div className="inline-block stamp">
              童叟无欺
            </div>
            <p className="font-handwriting text-wood-700 text-lg">
              ✨ 为童年回忆买单 ✨
            </p>
            <p className="text-[11px] text-kraft-500 leading-relaxed">
              愿你走出半生，归来仍是少年
              <br />
              欢迎再次光临 🏮
            </p>
          </div>

          {/* 二维码区域 - 模拟 */}
          <div className="border-t border-dashed border-kraft-400 mt-4 mb-3 pt-3">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 p-1.5 bg-white border-2 border-kraft-300 flex-shrink-0">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `
                      conic-gradient(at 30% 30%, #8B4513 0 25%, transparent 0),
                      conic-gradient(at 70% 30%, #8B4513 0 25%, transparent 0),
                      conic-gradient(at 30% 70%, #8B4513 0 25%, transparent 0),
                      linear-gradient(45deg, #8B4513 25%, transparent 25%, transparent 75%, #8B4513 75%),
                      linear-gradient(45deg, #8B4513 25%, transparent 25%, transparent 75%, #8B4513 75%)
                    `,
                    backgroundSize: '8px 8px, 8px 8px, 8px 8px, 4px 4px, 4px 4px',
                    backgroundPosition: '0 0, 0 0, 0 0, 0 0, 2px 2px',
                    opacity: 0.85,
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-handwriting text-wood-700 leading-snug">
                  扫码领「新客大礼包」
                </p>
                <p className="text-[10px] text-kraft-500 mt-1 leading-snug">
                  分享小票给好友，好友扫码双方各得 ¥10 优惠券～
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-[9px] text-kraft-400 font-typewriter tracking-wider">
            *** 谢谢惠顾 · THANK YOU ***
          </p>
        </div>

        {/* 操作按钮 */}
        <div className="space-y-2.5">
          <button
            onClick={() => {
              // 模拟分享
              alert('📸 请截屏保存小票，分享给微信好友～');
            }}
            className="btn-retro btn-retro-block !py-3 text-lg flex items-center justify-center gap-2"
          >
            <Download size={20} /> 保存小票到相册
          </button>
          <button
            onClick={() => alert('🎁 正在生成分享海报...')}
            className="btn-retro btn-retro-block !py-2.5 !bg-retro-pink/30 border-rust-400 text-rust-700 flex items-center justify-center gap-2"
          >
            <Share2 size={18} /> 分享给好友，双方各得 ¥10
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-retro-primary btn-retro-block !py-2.5 flex items-center justify-center gap-2"
          >
            <Home size={18} /> 回杂货铺继续逛逛
          </button>
        </div>

        {/* 彩蛋 */}
        <p className="text-center text-xs text-kraft-400 font-handwriting pt-2 flex items-center justify-center gap-1">
          <Sparkles size={12} />
          每一张小票，都是一个童年的故事
          <Sparkles size={12} />
        </p>
      </div>
    </div>
  );
}
