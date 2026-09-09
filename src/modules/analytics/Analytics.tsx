import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, cn } from '@/lib/utils';
import { MONTHLY_REVENUE, REVENUE_BY_CLIENT, MOCK_EXPENSES, MOCK_INVOICES } from '@/lib/mock-data';

const CATEGORIES = ['Software', 'Oficina', 'Viajes', 'Comidas', 'Marketing', 'Otros'] as const;

export function Analytics() {
  const totalRevenue = MOCK_INVOICES.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const totalExpenses = MOCK_EXPENSES.reduce((s, e) => s + e.amount, 0);
  const margin = ((totalRevenue - totalExpenses) / totalRevenue) * 100;

  const maxRevenue = Math.max(...MONTHLY_REVENUE.map((m) => m.value));
  const maxClient = Math.max(...REVENUE_BY_CLIENT.map((c) => c.value));

  const expensesByCategory = CATEGORIES.map((cat) => ({
    cat,
    total: MOCK_EXPENSES.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0),
  })).filter((c) => c.total > 0);
  const maxCat = Math.max(...expensesByCategory.map((c) => c.total));

  const kpis = [
    { label: 'Ingresos totales', value: formatCurrency(totalRevenue), delta: '+18.7%', up: true, icon: TrendingUp, tone: 'text-success', bg: 'bg-success-bg' },
    { label: 'Gastos totales', value: formatCurrency(totalExpenses), delta: '+4.1%', up: false, icon: TrendingDown, tone: 'text-error', bg: 'bg-error-bg' },
    { label: 'Margen neto', value: `${margin.toFixed(1)}%`, delta: '+2.3pp', up: true, icon: ArrowUpRight, tone: 'text-info', bg: 'bg-info-bg' },
    { label: 'Ticket medio', value: formatCurrency(totalRevenue / MOCK_INVOICES.filter((i) => i.status === 'paid').length), delta: '+5.2%', up: true, icon: ArrowDownRight, tone: 'text-orange-dark', bg: 'bg-orange/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">Periodo: Últimos 6 meses</p>
        <Button variant="outline" size="sm"><Download size={14} /> Exportar informe</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="p-5">
              <div className="flex items-start justify-between">
                <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center', kpi.bg, kpi.tone)}>
                  <Icon size={20} />
                </div>
                <span className={cn('text-xs font-medium flex items-center gap-0.5', kpi.up ? 'text-success' : 'text-muted')}>
                  {kpi.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {kpi.delta}
                </span>
              </div>
              <p className="text-sm text-muted mt-4">{kpi.label}</p>
              <p className="text-2xl font-bold text-ink mt-1">{kpi.value}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de ingresos</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex items-end justify-between gap-3 h-48 pt-4">
              {MONTHLY_REVENUE.map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="relative w-full flex-1 flex items-end">
                    <div
                      className="w-full rounded-t-lg bg-orange/80 group-hover:bg-orange transition-all duration-300"
                      style={{ height: `${(m.value / maxRevenue) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted">{m.month}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Revenue by client */}
        <Card>
          <CardHeader>
            <CardTitle>Ingresos por cliente</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            {REVENUE_BY_CLIENT.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-ink">{c.name}</span>
                  <span className="text-sm font-semibold text-ink">{formatCurrency(c.value)}</span>
                </div>
                <div className="h-2 rounded-full bg-surface overflow-hidden">
                  <div className="h-full rounded-full bg-ink" style={{ width: `${(c.value / maxClient) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Expense breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Desglose de gastos</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {expensesByCategory.map((c) => (
              <div key={c.cat} className="cl-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-ink">{c.cat}</span>
                  <Badge tone="neutral">{((c.total / totalExpenses) * 100).toFixed(0)}%</Badge>
                </div>
                <p className="text-xl font-bold text-ink">{formatCurrency(c.total)}</p>
                <div className="h-1.5 rounded-full bg-surface overflow-hidden mt-3">
                  <div className="h-full rounded-full bg-orange" style={{ width: `${(c.total / maxCat) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
