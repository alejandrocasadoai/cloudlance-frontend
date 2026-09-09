import { useState } from 'react';
import { Plus, Percent, Download, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/Input';
import { formatCurrency, formatDate } from '@/lib/utils';
import { MOCK_TAXES } from '@/lib/mock-data';
import type { TaxPeriod } from '@/types';

const STATUS_TONE: Record<TaxPeriod['status'], 'success' | 'warning' | 'error'> = {
  filed: 'success',
  pending: 'warning',
  overdue: 'error',
};

const STATUS_LABEL: Record<TaxPeriod['status'], string> = {
  filed: 'Presentada',
  pending: 'Pendiente',
  overdue: 'Vencida',
};

const TYPE_TONE: Record<TaxPeriod['type'], 'info' | 'orange' | 'neutral'> = {
  IVA: 'info',
  IRPF: 'orange',
  IS: 'neutral',
};

export function Taxes() {
  const [showNew, setShowNew] = useState(false);

  const totalPending = MOCK_TAXES.filter((t) => t.status === 'pending').reduce((s, t) => s + t.amount, 0);
  const totalFiled = MOCK_TAXES.filter((t) => t.status === 'filed').reduce((s, t) => s + t.amount, 0);
  const overdueCount = MOCK_TAXES.filter((t) => t.status === 'overdue').length;

  const next = MOCK_TAXES.filter((t) => t.status === 'pending').sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];

  return (
    <div className="space-y-6">
      {/* Alert */}
      {overdueCount > 0 && (
        <div className="cl-card bg-error-bg border-error/20 p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-error shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-error">Tienes {overdueCount} liquidación(es) vencida(s)</p>
            <p className="text-sm text-error/80 mt-0.5">Regulariza tu situación cuanto antes para evitar recargos.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="h-10 w-10 rounded-xl bg-warning-bg flex items-center justify-center text-warning mb-3">
            <Clock size={20} />
          </div>
          <p className="text-sm text-muted">Pendiente de liquidar</p>
          <p className="text-2xl font-bold text-ink mt-1">{formatCurrency(totalPending)}</p>
        </Card>
        <Card className="p-5">
          <div className="h-10 w-10 rounded-xl bg-success-bg flex items-center justify-center text-success mb-3">
            <CheckCircle2 size={20} />
          </div>
          <p className="text-sm text-muted">Ya presentado</p>
          <p className="text-2xl font-bold text-ink mt-1">{formatCurrency(totalFiled)}</p>
        </Card>
        <Card className="p-5">
          <div className="h-10 w-10 rounded-xl bg-info-bg flex items-center justify-center text-info mb-3">
            <Percent size={20} />
          </div>
          <p className="text-sm text-muted">Próxima liquidación</p>
          <p className="text-sm font-bold text-ink mt-1">{next ? formatDate(next.dueDate) : '—'}</p>
        </Card>
        <Card className="p-5">
          <div className="h-10 w-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange-dark mb-3">
            <AlertCircle size={20} />
          </div>
          <p className="text-sm text-muted">Vencidas</p>
          <p className="text-2xl font-bold text-error mt-1">{overdueCount}</p>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">Liquidaciones</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" title="Exportar"><Download size={16} /></Button>
          <Button onClick={() => setShowNew(true)}><Plus size={16} /> Nueva liquidación</Button>
        </div>
      </div>

      <Card>
        {MOCK_TAXES.length === 0 ? (
          <EmptyState icon={<Percent size={20} />} title="No hay liquidaciones" description="Crea tu primera liquidación fiscal." />
        ) : (
          <div className="overflow-x-auto cl-scrollbar">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs text-muted uppercase tracking-wide">
                  <th className="px-5 py-3 font-medium">Nombre</th>
                  <th className="px-5 py-3 font-medium hidden sm:table-cell">Tipo</th>
                  <th className="px-5 py-3 font-medium hidden md:table-cell">Periodo</th>
                  <th className="px-5 py-3 font-medium hidden lg:table-cell">Vencimiento</th>
                  <th className="px-5 py-3 font-medium text-right">Importe</th>
                  <th className="px-5 py-3 font-medium text-center">Estado</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_TAXES.map((tax) => (
                  <tr key={tax.id} className="border-b border-line last:border-0 hover:bg-surface/50 transition-colors cursor-pointer">
                    <td className="px-5 py-3.5 font-medium text-ink">{tax.name}</td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <Badge tone={TYPE_TONE[tax.type]}>{tax.type}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-muted hidden md:table-cell">{tax.period}</td>
                    <td className="px-5 py-3.5 text-muted hidden lg:table-cell">{formatDate(tax.dueDate)}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-ink">{formatCurrency(tax.amount)}</td>
                    <td className="px-5 py-3.5 text-center">
                      <Badge tone={STATUS_TONE[tax.status]} dot>{STATUS_LABEL[tax.status]}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        open={showNew}
        onClose={() => setShowNew(false)}
        title="Nueva liquidación"
        description="Registra una liquidación fiscal."
        footer={
          <>
            <Button variant="outline" onClick={() => setShowNew(false)}>Cancelar</Button>
            <Button onClick={() => setShowNew(false)}>Guardar</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Nombre" placeholder="Ej. IVA T4 2026" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="Tipo">
              <option value="IVA">IVA</option>
              <option value="IRPF">IRPF</option>
              <option value="IS">Impuesto de Sociedades</option>
            </Select>
            <Input label="Periodo" placeholder="Oct–Dic 2026" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Fecha de vencimiento" type="date" />
            <Input label="Importe" type="number" placeholder="0,00" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
