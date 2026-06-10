import { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  show: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

let seedId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, type: ToastType = 'success') => {
    const id = ++seedId;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2500);
  }, []);

  const remove = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[460px] px-4 pointer-events-none space-y-2">
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onClose={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLeaving(true), 2100);
    return () => clearTimeout(timer);
  }, []);

  const config = {
    success: {
      icon: CheckCircle2,
      bg: 'bg-mint-300 border-mint-400 text-wood-700',
    },
    error: {
      icon: AlertCircle,
      bg: 'bg-retro-pink border-rust-400 text-rust-700',
    },
    info: {
      icon: Info,
      bg: 'bg-warm-200 border-wood-500 text-wood-700',
    },
  }[toast.type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border-2 shadow-vintage transition-all duration-300',
        config.bg,
        leaving ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
      )}
    >
      <Icon size={22} className="flex-shrink-0" />
      <span className="flex-1 text-sm font-handwriting">{toast.message}</span>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-black/5">
        <X size={16} />
      </button>
    </div>
  );
}
