import {
  TrendingUp,
  TrendingDown,
  FileText,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  AlertCircle,
} from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import {
  MOCK_INVOICES,
  MOCK_EXPENSES,
  MONTHLY_REVENUE,
  MOCK_EVENTS,
} from '@/lib/mock-data';
import type { InvoiceStatus } from '@/types';

const STATUS_TONE: Record<InvoiceStatus, 'success' | 'info' | 'error' | 'neutral'> = {
  paid: 'success',
  sent: 'info',
  overdue: 'error',
  draft: 'neutral',
};

const STATUS_LABEL: Record<InvoiceStatus, string> = {
  paid: 'Pagada',
  sent: 'Enviada',
  overdue: 'Vencida',
  draft: 'Borrador',
};

export function Dashboard() {
  const totalRevenue = MOCK_INVOICES.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const pendingRevenue = MOCK_INVOICES.filter((i) => i.status === 'sent' || i.status === 'overdue').reduce((s, i) => s + i.amount, 0);
  const totalExpenses = MOCK_EXPENSES.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  const kpis = [
    {
      label: 'Ingresos del mes',
      value: formatCurrency(5520),
      delta: '+12.3%',
      up: true,
      icon: TrendingUp,
      tone: 'text-success',
      bg: 'bg-success-bg',
    },
    {
      label: 'Gastos del mes',
      value: formatCurrency(totalExpenses),
      delta: '+4.1%',
      up: false,
      icon: TrendingDown,
      tone: 'text-error',
      bg: 'bg-error-bg',
    },
    {
      label: 'Beneficio neto',
      value: formatCurrency(netProfit),
      delta: '+18.7%',
      up: true,
      icon: ArrowUpRight,
      tone: 'text-info',
      bg: 'bg-info-bg',
    },
    {
      label: 'Pendiente de cobro',
      value: formatCurrency(pendingRevenue),
      delta: '3 facturas',
      up: false,
      icon: Clock,
      tone: 'text-warning',
      bg: 'bg-warning-bg',
    },
  ];

  const maxRevenue = Math.max(...MONTHLY_REVENUE.map((m) => m.value));
  const recentInvoices = MOCK_INVOICES.slice(0, 5);
  const upcomingEvents = MOCK_EVENTS
    .filter((e) => new Date(e.date) >= new Date('2026-09-05'))
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Ingresos mensuales</CardTitle>
              <p className="text-sm text-muted mt-0.5">Últimos 6 meses</p>
            </div>
            <Badge tone="success" dot>+18.7%</Badge>
          </CardHeader>
          <CardBody>
            <div className="flex items-end justify-between gap-3 h-48 pt-4">
              {MONTHLY_REVENUE.map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="relative w-full flex-1 flex items-end">
                    <div
                      className="w-full rounded-t-lg bg-orange/80 group-hover:bg-orange transition-all duration-300 relative overflow-hidden"
                      style={{ height: `${(m.value / maxRevenue) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-orange/50 to-transparent" />
                    </div>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-ink opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {formatCurrency(m.value)}
                    </span>
                  </div>
                  <span className="text-xs text-muted">{m.month}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Upcoming events */}
        <Card>
          <CardHeader>
            <CardTitle>Próximos vencimientos</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="flex items-start gap-3">
                <div className={cn(
                  'h-9 w-9 rounded-xl flex items-center justify-center shrink-0',
                  evt.type === 'invoice' ? 'bg-warning-bg text-warning' :
                  evt.type === 'tax' ? 'bg-error-bg text-error' :
                  evt.type === 'meeting' ? 'bg-info-bg text-info' :
                  'bg-surface text-muted',
                )}>
                  {evt.type === 'invoice' ? <FileText size={16} /> : evt.type === 'tax' ? <AlertCircle size={16} /> : <Clock size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{evt.title}</p>
                  <p className="text-xs text-muted">{formatDate(evt.date)}{evt.time ? ` · ${evt.time}` : ''}</p>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Recent invoices */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Facturas recientes</CardTitle>
          <Button variant="outline" size="sm"><Plus size={14} /> Nueva factura</Button>
        </CardHeader>
        <div className="overflow-x-auto cl-scrollbar">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs text-muted uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">Nº</th>
                <th className="px-5 py-3 font-medium">Cliente</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">Emisión</th>
                <th className="px-5 py-3 font-medium hidden md:table-cell">Vencimiento</th>
                <th className="px-5 py-3 font-medium text-right">Importe</th>
                <th className="px-5 py-3 font-medium text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {recentInvoices.map((inv) => (
                <tr key={inv.id} className="border-b border-line last:border-0 hover:bg-surface/50 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5 font-medium text-ink">{inv.number}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={inv.client} size="sm" />
                      <span className="text-ink truncate">{inv.client}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted hidden sm:table-cell">{formatDate(inv.issueDate)}</td>
                  <td className="px-5 py-3.5 text-muted hidden md:table-cell">{formatDate(inv.dueDate)}</td>
                  <td className="px-5 py-3.5 text-right font-semibold text-ink">{formatCurrency(inv.amount)}</td>
                  <td className="px-5 py-3.5 text-center">
                    <Badge tone={STATUS_TONE[inv.status]}>{STATUS_LABEL[inv.status]}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
