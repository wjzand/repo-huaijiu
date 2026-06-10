import { useEffect, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { banners } from '@/data/quiz';
import { cn } from '@/lib/utils';

export default function HomeBanner() {
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();

  const total = banners.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx(i => (i + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [total]);

  const dots = useMemo(() => banners.map((_, i) => i), [banners]);

  return (
    <div className="px-4">
      <div className="relative rounded-2xl overflow-hidden border-4 border-wood-500 shadow-vintage group">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {banners.map(b => (
            <div
              key={b.id}
              onClick={() => navigate(b.link)}
              className={cn('w-full flex-shrink-0 relative cursor-pointer min-h-[140px]', 'bg-gradient-to-br', b.bgColor)}
            >
              <img src={b.image} alt={b.title} className="w-full h-full object-cover absolute inset-0 opacity-90" />
              <div className="relative z-10 p-5 flex flex-col justify-center min-h-[140px]">
                <h3 className="font-handwriting text-2xl text-wood-700 text-shadow-hand drop-shadow-sm">
                  {b.title}
                </h3>
                <p className="mt-1 text-sm text-wood-600 font-retro">{b.subtitle}</p>
                <span className="mt-2 inline-block self-start px-3 py-1 rounded-full bg-rust-500 text-warm-50 text-xs font-handwriting border-2 border-rust-700">
                  立即逛逛 →
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIdx(i => (i - 1 + total) % total)}
          className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-warm-50/80 border-2 border-wood-500
            flex items-center justify-center text-wood-700 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => setIdx(i => (i + 1) % total)}
          className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-warm-50/80 border-2 border-wood-500
            flex items-center justify-center text-wood-700 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={18} />
        </button>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {dots.map(i => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={cn(
                'h-2 rounded-full transition-all border border-warm-50/50',
                idx === i ? 'w-6 bg-rust-500' : 'w-2 bg-warm-200/80'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
