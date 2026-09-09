import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { NAV_ITEMS, BOTTOM_NAV } from '@/lib/navigation';
import { cn } from '@/lib/utils';

function NavList({ onClose, collapsed = false }: { onClose: () => void; collapsed?: boolean }) {
  return (
    <>
      <nav className={cn(
        'flex-1 py-4 space-y-1 overflow-y-auto cl-scrollbar',
        collapsed ? 'px-1' : 'px-3',
      )}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group',
                  collapsed ? 'px-2' : 'px-3',
                  collapsed && 'justify-start',
                  isActive
                    ? 'bg-orange/10 text-orange-dark'
                    : 'text-muted hover:text-ink hover:bg-surface',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    className={cn(isActive ? 'text-orange-dark' : 'text-brown group-hover:text-ink')}
                  />
                  {!collapsed && <span className="flex-1">{item.label}</span>}
                  {item.badge && !collapsed && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-orange text-white">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
      <div className={cn('py-3 border-t border-line', collapsed ? 'px-1' : 'px-3')}>
        {BOTTOM_NAV.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  collapsed ? 'justify-start px-2' : 'px-3',
                  isActive ? 'bg-orange/10 text-orange-dark' : 'text-muted hover:text-ink hover:bg-surface',
                )
              }
            >
              <Icon size={18} className="text-brown" />
              {!collapsed && item.label}
            </NavLink>
          );
        })}
      </div>
    </>
  );
}

export function Sidebar({
  collapsed = false,
  onToggleCollapse,
}: {
  collapsed?: boolean;
  onToggleCollapse: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 bg-cream/80 backdrop-blur-md flex items-center gap-3 px-4 h-14">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-surface text-ink"
        >
          <Menu size={22} />
        </button>
        <Logo size="sm" />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm cl-animate-in" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-cream flex flex-col cl-animate-in">
            <div className="h-14 flex items-center justify-between px-4 border-b border-line">
              <Logo size="sm" />
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-surface text-ink">
                <X size={20} />
              </button>
            </div>
            <NavList onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col shrink-0 h-screen sticky top-0 bg-cream border-r border-line transition-[width] duration-200',
        collapsed ? 'w-20' : 'w-64',
      )}>
        <div className={cn('h-16 flex items-center gap-3', collapsed ? 'px-2' : 'px-5')}>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-2 rounded-xl hover:bg-surface text-ink transition-colors"
            aria-label="Alternar barra lateral"
          >
            <Menu size={21} />
          </button>
          <Logo size={collapsed ? 'sm' : 'md'} withText={!collapsed} />
        </div>
        <NavList onClose={() => setMobileOpen(false)} collapsed={collapsed} />
      </aside>
    </>
  );
}
