import { ChevronLeft, Volume2, VolumeX, ShoppingBasket } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';

import type { ReactNode } from 'react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showCart?: boolean;
  showMusic?: boolean;
  className?: string;
  rightContent?: ReactNode;
}

export default function Header({ title, showBack = true, showCart = true, showMusic, className, rightContent }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [musicOn, setMusicOn] = useState(false);
  const totalCount = useCartStore(s => s.totalCount);

  const isHome = location.pathname === '/';

  if (isHome) return null;

  return (
    <header className={cn(
      'sticky top-0 z-40 bg-warm-50/95 backdrop-blur-md border-b-2 border-kraft-200',
      className
    )}>
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="w-10 h-10 flex items-center justify-start">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-warm-200 border-2 border-wood-500 flex items-center justify-center
                text-wood-700 shadow-button-3d active:shadow-button-pressed active:translate-y-[2px]
                transition-all"
              aria-label="返回"
            >
              <ChevronLeft size={20} strokeWidth={3} />
            </button>
          )}
        </div>

        <h1 className="flex-1 text-center font-handwriting text-2xl text-wood-700 text-shadow-hand truncate px-2">
          {title || '电子杂货铺'}
        </h1>

        <div className="w-[100px] flex items-center justify-end gap-2">
          {rightContent ?? (
            <>
              {showMusic !== false && (
                <button
                  onClick={() => setMusicOn(!musicOn)}
                  className="w-9 h-9 rounded-full bg-warm-100 border-2 border-wood-400 flex items-center justify-center
                    text-wood-600 hover:bg-warm-200 transition-colors"
                  aria-label="音乐开关"
                >
                  {musicOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
              )}
              {showCart && (
                <button
                  onClick={() => navigate('/cart')}
                  className="relative w-10 h-10 rounded-full bg-warm-200 border-2 border-wood-500 flex items-center justify-center
                    text-wood-700 shadow-button-3d active:shadow-button-pressed active:translate-y-[2px]
                    transition-all"
                  aria-label="购物车"
                >
                  <ShoppingBasket size={18} strokeWidth={2.5} />
                  {totalCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center
                      rounded-full bg-rust-500 text-warm-50 text-[11px] font-bold border-2 border-warm-100">
                      {totalCount > 99 ? '99+' : totalCount}
                    </span>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
