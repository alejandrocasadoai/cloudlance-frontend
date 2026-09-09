import { useState } from 'react';
import { Plus, Search, Download, Receipt } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/Input';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import { MOCK_EXPENSES } from '@/lib/mock-data';
import type { ExpenseCategory } from '@/types';

const CATEGORIES: ExpenseCategory[] = ['Software', 'Oficina', 'Viajes', 'Comidas', 'Marketing', 'Otros'];

const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Software: 'bg-info-bg text-info',
  Oficina: 'bg-success-bg text-success',
  Viajes: 'bg-warning-bg text-warning',
  Comidas: 'bg-orange/10 text-orange-dark',
  Marketing: 'bg-error-bg text-error',
  Otros: 'bg-surface text-muted',
};

const STATUS_TONE = {
  deductible: 'success',
  pending: 'warning',
  'non-deductible': 'neutral',
} as const;

const STATUS_LABEL = {
  deductible: 'Deducible',
  pending: 'Pendiente',
  'non-deductible': 'No deducible',
} as const;

export function Expenses() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ExpenseCategory | 'all'>('all');
  const [showNew, setShowNew] = useState(false);

  const filtered = MOCK_EXPENSES.filter((e) => {
    const matchesSearch = e.vendor.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || e.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const total = MOCK_EXPENSES.reduce((s, e) => s + e.amount, 0);
  const deductible = MOCK_EXPENSES.filter((e) => e.status === 'deductible').reduce((s, e) => s + e.amount, 0);

  const byCategory = CATEGORIES.map((cat) => ({
    cat,
    total: MOCK_EXPENSES.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0),
  })).filter((c) => c.total > 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-sm text-muted">Gastos totales</p>
          <p className="text-2xl font-bold text-ink mt-1">{formatCurrency(total)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Deducible</p>
          <p className="text-2xl font-bold text-success mt-1">{formatCurrency(deductible)}</p>
        </Card>
        <Card className="p-5 col-span-2 lg:col-span-1">
          <p className="text-sm text-muted">Ahorro fiscal est.</p>
          <p className="text-2xl font-bold text-info mt-1">{formatCurrency(deductible * 0.21)}</p>
        </Card>
      </div>

      {/* Category breakdown */}
      <Card className="p-5">
        <p className="text-sm font-semibold text-ink mb-4">Gastos por categoría</p>
        <div className="space-y-3">
          {byCategory.map((c) => {
            const pct = (c.total / total) * 100;
            return (
              <div key={c.cat} className="flex items-center gap-3">
                <span className={cn('text-xs font-medium px-2 py-1 rounded-lg w-20 text-center', CATEGORY_COLORS[c.cat])}>{c.cat}</span>
                <div className="flex-1 h-2 rounded-full bg-surface overflow-hidden">
                  <div className="h-full rounded-full bg-orange" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-sm font-medium text-ink w-20 text-right">{formatCurrency(c.total)}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="flex items-center gap-2 overflow-x-auto cl-scrollbar pb-1">
          <button
            onClick={() => setCategoryFilter('all')}
            className={cn(
              'px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
              categoryFilter === 'all' ? 'bg-ink text-white' : 'bg-white border border-line text-muted hover:text-ink',
            )}
          >
            Todas
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                'px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                categoryFilter === cat ? 'bg-ink text-white' : 'bg-white border border-line text-muted hover:text-ink',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brown" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar…"
              className="cl-input w-full sm:w-56 pl-9 h-9 text-sm"
            />
          </div>
          <Button variant="outline" size="icon" title="Exportar"><Download size={16} /></Button>
          <Button onClick={() => setShowNew(true)}><Plus size={16} /> Nuevo</Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Receipt size={20} />}
            title="No hay gastos"
            description="Registra un gasto para empezar a controlar tus deducciones."
            action={<Button onClick={() => setShowNew(true)}><Plus size={16} /> Añadir gasto</Button>}
          />
        ) : (
          <div className="overflow-x-auto cl-scrollbar">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs text-muted uppercase tracking-wide">
                  <th className="px-5 py-3 font-medium">Fecha</th>
                  <th className="px-5 py-3 font-medium">Proveedor</th>
                  <th className="px-5 py-3 font-medium hidden sm:table-cell">Categoría</th>
                  <th className="px-5 py-3 font-medium text-right">Importe</th>
                  <th className="px-5 py-3 font-medium text-center">Estado</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((exp) => (
                  <tr key={exp.id} className="border-b border-line last:border-0 hover:bg-surface/50 transition-colors cursor-pointer">
                    <td className="px-5 py-3.5 text-muted">{formatDate(exp.date)}</td>
                    <td className="px-5 py-3.5 font-medium text-ink">{exp.vendor}</td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <span className={cn('text-xs font-medium px-2 py-1 rounded-lg', CATEGORY_COLORS[exp.category])}>{exp.category}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-semibold text-ink">{formatCurrency(exp.amount)}</td>
                    <td className="px-5 py-3.5 text-center">
                      <Badge tone={STATUS_TONE[exp.status]}>{STATUS_LABEL[exp.status]}</Badge>
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
        title="Nuevo gasto"
        description="Registra un gasto para tu negocio."
        footer={
          <>
            <Button variant="outline" onClick={() => setShowNew(false)}>Cancelar</Button>
            <Button onClick={() => setShowNew(false)}>Guardar gasto</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Proveedor" placeholder="Ej. Figma" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Importe" type="number" placeholder="0,00" />
            <Input label="Fecha" type="date" />
          </div>
          <Select label="Categoría">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
          <Select label="Estado fiscal">
            <option value="deductible">Deducible</option>
            <option value="pending">Pendiente de revisión</option>
            <option value="non-deductible">No deducible</option>
          </Select>
          <Input label="Notas (opcional)" placeholder="Detalle adicional…" />
        </div>
      </Modal>
    </div>
  );
}
