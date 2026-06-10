import { useEffect, useMemo, useRef } from 'react';
import { Heart } from 'lucide-react';
import { useDanmakuStore } from '@/store/useDanmakuStore';
import { cn } from '@/lib/utils';

export default function DanmakuBar() {
  const { list, likeDanmaku } = useDanmakuStore();
  const trackRef = useRef<HTMLDivElement>(null);

  const displayList = useMemo(() => {
    // 复制一份让滚动无缝
    const base = list.slice(-12);
    return [...base, ...base];
  }, [list]);

  useEffect(() => {
    // 这里只是简单样式动画，关键帧已经在CSS里
  }, []);

  if (displayList.length === 0) return null;

  return (
    <div className="px-4">
      <div className="led-screen">
        <div className="relative z-10 flex items-center gap-3">
          <span className="flex-shrink-0 text-[10px] font-typewriter text-rust-300 px-2 py-0.5 rounded-full border border-rust-400/50 bg-rust-500/20">
            LIVE
          </span>
          <div className="flex-1 overflow-hidden relative h-7">
            <div
              ref={trackRef}
              className="flex items-center gap-12 whitespace-nowrap animate-danmaku-scroll"
              style={{ animationDuration: `${displayList.length * 8}s` }}
            >
              {displayList.map((d, idx) => (
                <div
                  key={`${d.id}-${idx}`}
                  className="flex items-center gap-2 text-warm-100 text-sm font-handwriting"
                >
                  <span className="text-warm-300">📍{d.city}</span>
                  <span>{d.nickname}</span>
                  <span className="text-retro-yellow">买了「{d.productName}」</span>
                  <span className="text-retro-pink/90">那年Ta{d.age}岁 · {d.message}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); likeDanmaku(d.id); }}
                    className="flex items-center gap-0.5 text-rust-300 hover:text-rust-400"
                  >
                    <Heart size={12} />
                    <span className="text-[10px]">{d.likes}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
