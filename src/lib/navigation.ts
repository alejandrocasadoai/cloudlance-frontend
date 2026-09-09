import {
  LayoutDashboard,
  FileText,
  Receipt,
  Users,
  Package,
  Calendar,
  BarChart3,
  Sparkles,
  Settings,
  Percent,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  badge?: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: '/app/dashboard', icon: LayoutDashboard },
  { label: 'Facturas', to: '/app/invoices', icon: FileText },
  { label: 'Gastos', to: '/app/expenses', icon: Receipt },
  { label: 'Clientes', to: '/app/clients', icon: Users },
  { label: 'Productos', to: '/app/products', icon: Package },
  { label: 'Impuestos', to: '/app/taxes', icon: Percent },
  { label: 'Calendario', to: '/app/calendar', icon: Calendar },
  { label: 'Analíticas', to: '/app/analytics', icon: BarChart3 },
  { label: 'Asistente IA', to: '/app/ai', icon: Sparkles },
];

export const BOTTOM_NAV: NavItem[] = [
  { label: 'Ajustes', to: '/app/settings', icon: Settings },
];
