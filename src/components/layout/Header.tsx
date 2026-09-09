import { ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export function Header({ title }: { title: string }) {
  return (
    <header className="sticky top-0 lg:top-0 z-20 bg-cream/80 backdrop-blur-md border-b border-line rounded-bl-2xl">
      <div className="px-4 lg:px-6 h-16 flex items-center gap-3">
        <ChevronRight size={18} className="text-brown shrink-0" />
        <h1 className="text-base font-medium text-ink truncate">
          {title}
        </h1>
        <div className="flex-1" />
        <Button size="sm" className="hidden sm:inline-flex whitespace-nowrap">
          Cambiar a plan superior
        </Button>
        <button
          type="button"
          className="p-2 rounded-xl hover:bg-surface text-ink transition-colors"
          aria-label="Crear nuevo"
        >
          <Plus size={21} />
        </button>
        <button
          type="button"
          className="p-1 rounded-full hover:bg-surface text-ink transition-colors"
          aria-label="Perfil de usuario"
        >
          <Avatar name="Marina Costa" size="sm" />
        </button>
      </div>
    </header>
  );
}
