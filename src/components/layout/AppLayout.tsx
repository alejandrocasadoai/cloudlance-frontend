import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

const TITLES: Record<string, { title: string; subtitle?: string }> = {
  '/app/dashboard': { title: 'Dashboard', subtitle: 'Resumen de tu actividad' },
  '/app/invoices': { title: 'Facturas', subtitle: 'Crea y gestiona tus facturas' },
  '/app/expenses': { title: 'Gastos', subtitle: 'Registra y categoriza tus gastos' },
  '/app/clients': { title: 'Clientes', subtitle: 'Tu cartera de clientes' },
  '/app/products': { title: 'Productos', subtitle: 'Catálogo de productos y servicios' },
  '/app/taxes': { title: 'Impuestos', subtitle: 'Liquidaciones y obligaciones fiscales' },
  '/app/calendar': { title: 'Calendario', subtitle: 'Vencimientos y eventos' },
  '/app/analytics': { title: 'Analíticas', subtitle: 'Métricas y tendencias' },
  '/app/ai': { title: 'Asistente IA', subtitle: 'Tu copiloto financiero' },
  '/app/settings': { title: 'Ajustes', subtitle: 'Configura tu cuenta' },
};

export function AppLayout() {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const meta = TITLES[location.pathname] ?? { title: 'Cloudlance' };

  return (
    <div className="min-h-screen flex bg-cream">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((collapsed) => !collapsed)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={meta.title}
        />
        <main className="flex-1 px-5 lg:px-8 py-6 lg:py-8">
          <div className="max-w-6xl mx-auto w-full cl-animate-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
