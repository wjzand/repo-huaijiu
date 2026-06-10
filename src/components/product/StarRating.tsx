import { cn } from '@/lib/utils';
import type { Product } from '@/types';
import { Star } from 'lucide-react';

interface StarRatingProps {
  stars: Product['nostalgiaStars'];
  size?: number;
  className?: string;
}

export default function StarRating({ stars, size = 14, className }: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={size}
          className={cn(
            'transition-all',
            n <= stars
              ? 'fill-rust-400 text-rust-500'
              : 'fill-transparent text-kraft-300'
          )}
        />
      ))}
    </div>
  );
}
