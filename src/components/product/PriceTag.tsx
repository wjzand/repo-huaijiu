import { cn } from '@/lib/utils';

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function PriceTag({ price, originalPrice, className, size = 'md' }: PriceTagProps) {
  const sizeCls = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  }[size];

  return (
    <div className={cn('inline-flex items-baseline gap-2', className)}>
      <span className={cn('price-tag text-rust-600 font-bold', sizeCls)}>
        <span className="font-normal mr-0.5">¥</span>
        {price.toFixed(2)}
      </span>
      {originalPrice !== undefined && originalPrice > price && (
        <span className="font-typewriter text-xs text-kraft-500 line-through decoration-rust-400/50">
          ¥{originalPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
}
