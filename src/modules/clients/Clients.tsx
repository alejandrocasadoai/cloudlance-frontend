import { useState } from 'react';
import { Plus, Search, Mail, Phone, MapPin, Users } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { formatCurrency, cn } from '@/lib/utils';
import { MOCK_CLIENTS } from '@/lib/mock-data';

export function Clients() {
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);

  const filtered = MOCK_CLIENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  const activeCount = MOCK_CLIENTS.filter((c) => c.status === 'active').length;
  const totalBilled = MOCK_CLIENTS.reduce((s, c) => s + c.totalBilled, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-sm text-muted">Clientes activos</p>
          <p className="text-2xl font-bold text-ink mt-1">{activeCount}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Total facturado</p>
          <p className="text-2xl font-bold text-ink mt-1">{formatCurrency(totalBilled)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Facturas abiertas</p>
          <p className="text-2xl font-bold text-warning mt-1">{MOCK_CLIENTS.reduce((s, c) => s + c.openInvoices, 0)}</p>
        </Card>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brown" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar clientes…"
            className="cl-input pl-9 h-9 text-sm"
          />
        </div>
        <Button onClick={() => setShowNew(true)}><Plus size={16} /> Nuevo cliente</Button>
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Users size={20} />}
            title="No hay clientes"
            description="Añade tu primer cliente para empezar a facturar."
            action={<Button onClick={() => setShowNew(true)}><Plus size={16} /> Añadir cliente</Button>}
          />
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((client) => (
            <Card key={client.id} className="p-5 hover:shadow-pop transition-shadow cursor-pointer">
              <div className="flex items-start gap-3">
                <Avatar name={client.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-ink truncate">{client.name}</h3>
                    <Badge tone={client.status === 'active' ? 'success' : 'neutral'} dot>
                      {client.status === 'active' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted truncate">{client.email}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted">
                  <Phone size={14} /> <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted">
                  <MapPin size={14} /> <span className="truncate">{client.address}</span>
                </div>
                <div className="flex items-center gap-2 text-muted">
                  <Mail size={14} /> <span>NIF: {client.taxId}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">Total facturado</p>
                  <p className="text-sm font-semibold text-ink">{formatCurrency(client.totalBilled)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted">Facturas abiertas</p>
                  <p className={cn('text-sm font-semibold', client.openInvoices > 0 ? 'text-warning' : 'text-muted')}>
                    {client.openInvoices}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={showNew}
        onClose={() => setShowNew(false)}
        title="Nuevo cliente"
        description="Añade un cliente a tu cartera."
        footer={
          <>
            <Button variant="outline" onClick={() => setShowNew(false)}>Cancelar</Button>
            <Button onClick={() => setShowNew(false)}>Guardar cliente</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Nombre / Razón social" placeholder="Acme Studios S.L." />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Email" type="email" placeholder="finance@acme.es" />
            <Input label="Teléfono" placeholder="+34 600 000 000" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="NIF / CIF" placeholder="B12345678" />
            <Input label="Dirección" placeholder="Calle…" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
