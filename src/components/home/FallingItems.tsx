import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

const EMOJIS = ['🍬', '🐸', '🔮', '⭐', '🧸', '📦', '🪀', '🍫', '🦝', '🎈', '🍊'];

interface FallingItem {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

export default function FallingItems() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const items = useMemo<FallingItem[]>(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 12 + Math.random() * 14,
      size: 18 + Math.random() * 18,
      opacity: 0.35 + Math.random() * 0.35,
    }));
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {items.map(it => (
        <span
          key={it.id}
          className="absolute animate-float-down select-none"
          style={{
            left: `${it.left}%`,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
            fontSize: `${it.size}px`,
            opacity: it.opacity,
          }}
        >
          {it.emoji}
        </span>
      ))}
    </div>
  );
}
