import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showClose?: boolean;
}

export default function Modal({ open, onClose, title, children, className, showClose = true }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative w-full max-w-[480px] max-h-[90vh] overflow-auto bg-warm-50 rounded-t-3xl sm:rounded-2xl',
          'border-4 border-wood-500 shadow-2xl animate-in slide-in-from-bottom sm:slide-in-from-bottom-10 duration-300',
          className
        )}
        onClick={e => e.stopPropagation()}
      >
        <div className="wood-shelf px-5 py-3 rounded-t-2xl">
          <div className="flex items-center justify-between relative z-10">
            <div className="w-8" />
            {title && <h3 className="text-warm-50 font-handwriting text-xl text-shadow-hand">{title}</h3>}
            {showClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-warm-200 border-2 border-wood-600 flex items-center justify-center
                  text-wood-700 hover:bg-warm-100 transition-colors"
              >
                <X size={18} />
              </button>
            )}
            {!title && <div className="w-8" />}
          </div>
        </div>

        <div className="p-5 bg-paper-texture">
          {children}
        </div>
      </div>
    </div>
  );
}
