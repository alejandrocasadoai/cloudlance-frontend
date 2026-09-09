import { useState } from 'react';
import { Plus, Search, Download, Eye, MoreVertical, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { Input } from '@/components/ui/Input';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import { MOCK_INVOICES } from '@/lib/mock-data';
import type { Invoice, InvoiceStatus } from '@/types';

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

const FILTERS: { key: InvoiceStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'sent', label: 'Enviadas' },
  { key: 'paid', label: 'Pagadas' },
  { key: 'overdue', label: 'Vencidas' },
  { key: 'draft', label: 'Borradores' },
];

export function Invoices() {
  const [filter, setFilter] = useState<InvoiceStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Invoice | null>(null);
  const [showNew, setShowNew] = useState(false);

  const filtered = MOCK_INVOICES.filter((inv) => {
    const matchesFilter = filter === 'all' || inv.status === filter;
    const matchesSearch =
      inv.number.toLowerCase().includes(search.toLowerCase()) ||
      inv.client.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const total = filtered.reduce((s, i) => s + i.amount, 0);
  const paid = filtered.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const pending = filtered.filter((i) => i.status === 'sent' || i.status === 'overdue').reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-sm text-muted">Total facturado</p>
          <p className="text-2xl font-bold text-ink mt-1">{formatCurrency(total)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Cobrado</p>
          <p className="text-2xl font-bold text-success mt-1">{formatCurrency(paid)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Pendiente</p>
          <p className="text-2xl font-bold text-warning mt-1">{formatCurrency(pending)}</p>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="flex items-center gap-2 overflow-x-auto cl-scrollbar pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                filter === f.key ? 'bg-ink text-white' : 'bg-white border border-line text-muted hover:text-ink',
              )}
            >
              {f.label}
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
          <Button size="md" onClick={() => setShowNew(true)}><Plus size={16} /> Nueva</Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<FileText size={20} />}
            title="No hay facturas"
            description="Crea tu primera factura para empezar a facturar a tus clientes."
            action={<Button onClick={() => setShowNew(true)}><Plus size={16} /> Crear factura</Button>}
          />
        ) : (
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
                  <th className="px-5 py-3 font-medium w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv) => (
                  <tr
                    key={inv.id}
                    onClick={() => setSelected(inv)}
                    className="border-b border-line last:border-0 hover:bg-surface/50 transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-3.5 font-medium text-ink">{inv.number}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={inv.client} size="sm" />
                        <div className="min-w-0">
                          <p className="text-ink truncate">{inv.client}</p>
                          <p className="text-xs text-muted truncate hidden sm:block">{inv.clientEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-muted hidden sm:table-cell">{formatDate(inv.issueDate)}</td>
                    <td className="px-5 py-3.5 text-muted hidden md:table-cell">{formatDate(inv.dueDate)}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-ink">{formatCurrency(inv.amount)}</td>
                    <td className="px-5 py-3.5 text-center">
                      <Badge tone={STATUS_TONE[inv.status]}>{STATUS_LABEL[inv.status]}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="text-brown hover:text-ink p-1 rounded-lg hover:bg-surface" onClick={(e) => e.stopPropagation()}>
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Detail modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.number}
        description={selected ? `${selected.client} · ${formatDate(selected.issueDate)}` : ''}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setSelected(null)}>Cerrar</Button>
            <Button variant="outline"><Download size={16} /> Descargar PDF</Button>
            <Button><Eye size={16} /> Ver</Button>
          </>
        }
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={selected.client} size="lg" />
                <div>
                  <p className="font-semibold text-ink">{selected.client}</p>
                  <p className="text-sm text-muted">{selected.clientEmail}</p>
                </div>
              </div>
              <Badge tone={STATUS_TONE[selected.status]} dot>{STATUS_LABEL[selected.status]}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="cl-card p-4">
                <p className="text-xs text-muted">Fecha de emisión</p>
                <p className="text-sm font-medium text-ink mt-1">{formatDate(selected.issueDate)}</p>
              </div>
              <div className="cl-card p-4">
                <p className="text-xs text-muted">Vencimiento</p>
                <p className="text-sm font-medium text-ink mt-1">{formatDate(selected.dueDate)}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink mb-3">Conceptos</p>
              <div className="space-y-2">
                {selected.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between cl-card p-3.5">
                    <div>
                      <p className="text-sm font-medium text-ink">{item.description}</p>
                      <p className="text-xs text-muted">{item.qty} × {formatCurrency(item.unitPrice)}</p>
                    </div>
                    <p className="text-sm font-semibold text-ink">{formatCurrency(item.qty * item.unitPrice)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-line">
              <p className="font-semibold text-ink">Total</p>
              <p className="text-xl font-bold text-ink">{formatCurrency(selected.amount)}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* New invoice modal */}
      <Modal
        open={showNew}
        onClose={() => setShowNew(false)}
        title="Nueva factura"
        description="Crea una factura para uno de tus clientes."
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowNew(false)}>Cancelar</Button>
            <Button onClick={() => setShowNew(false)}>Guardar borrador</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Cliente" placeholder="Selecciona un cliente" />
            <Input label="Número" placeholder="F-2026-0044" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Fecha de emisión" type="date" />
            <Input label="Vencimiento" type="date" />
          </div>
          <div>
            <p className="cl-label">Conceptos</p>
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2">
                <input className="cl-input col-span-6" placeholder="Descripción" />
                <input className="cl-input col-span-2" type="number" placeholder="Cant." />
                <input className="cl-input col-span-3" type="number" placeholder="Precio" />
                <button className="col-span-1 h-10 rounded-xl border border-line text-brown hover:text-error hover:border-error transition-colors flex items-center justify-center">✕</button>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="mt-2"><Plus size={14} /> Añadir línea</Button>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-line">
            <p className="font-semibold text-ink">Total</p>
            <p className="text-xl font-bold text-ink">{formatCurrency(0)}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
