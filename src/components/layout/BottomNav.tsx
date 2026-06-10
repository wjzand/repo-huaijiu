import { NavLink, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Trophy, ShoppingBasket, User } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: '首页', icon: Home },
  { to: '/category/snack', label: '货架', icon: LayoutGrid },
  { to: '/quiz', label: '答题', icon: Trophy },
  { to: '/cart', label: '竹篮', icon: ShoppingBasket, badge: true },
  { to: '/profile', label: '我的', icon: User },
];

export default function BottomNav() {
  const totalCount = useCartStore(s => s.totalCount);
  const location = useLocation();

  const showNav = !location.pathname.startsWith('/order-success') &&
    !location.pathname.startsWith('/checkout') &&
    !location.pathname.startsWith('/gacha') &&
    !location.pathname.startsWith('/card-book');

  if (!showNav) return null;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-40 pb-[env(safe-area-inset-bottom)]">
      <div className="wood-shelf px-2 pt-2 pb-3">
        <div className="flex items-center justify-around relative z-10">
          {navItems.map(({ to, label, icon: Icon, badge }) => {
            const isActive = location.pathname === to ||
              (to !== '/' && location.pathname.startsWith(to.split('/').slice(0, 3).join('/')));
            return (
              <NavLink
                key={to}
                to={to}
                className={cn(
                  'flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative',
                  isActive
                    ? 'bg-warm-200 text-wood-700 -translate-y-1 shadow-lg'
                    : 'text-warm-200/80 hover:text-warm-100'
                )}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {badge && totalCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center
                      rounded-full bg-rust-500 text-warm-50 text-[11px] font-bold border-2 border-wood-600">
                      {totalCount > 99 ? '99+' : totalCount}
                    </span>
                  )}
                </div>
                <span className={cn('text-xs font-handwriting', isActive ? 'font-bold' : '')}>{label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
