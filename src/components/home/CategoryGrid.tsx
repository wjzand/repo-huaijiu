import { useNavigate } from 'react-router-dom';
import { CATEGORY_INFO, ProductCategory } from '@/types';
import { cn } from '@/lib/utils';

const items: ProductCategory[] = ['snack', 'toy', 'stationery', 'seasonal'];

export default function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <div className="px-4">
      <div className="wood-shelf rounded-2xl p-1">
        <div className="grid grid-cols-4 gap-2 bg-warm-100 rounded-xl p-3 relative z-10">
          {items.map(cat => {
            const info = CATEGORY_INFO[cat];
            return (
              <button
                key={cat}
                onClick={() => navigate(`/category/${cat}`)}
                className={cn(
                  'flex flex-col items-center gap-2 p-3 rounded-xl transition-all',
                  'bg-gradient-to-br', info.bg,
                  'hover:-translate-y-1 hover:rotate-[-2deg] hover:shadow-vintage active:translate-y-0'
                )}
              >
                <div className="w-14 h-14 rounded-full bg-warm-50 border-[3px] border-wood-500/70
                  flex items-center justify-center text-3xl shadow-vintage
                  group-hover:animate-bounce-soft">
                  <span>{info.emoji}</span>
                </div>
                <span className={cn('font-handwriting text-sm', info.color)}>{info.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
