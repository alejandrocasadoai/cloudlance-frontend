import { useState } from 'react';
import { Plus, Package, Search } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { formatCurrency } from '@/lib/utils';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

export function Products() {
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);

  const filtered = MOCK_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brown" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos…"
            className="cl-input pl-9 h-9 text-sm"
          />
        </div>
        <Button onClick={() => setShowNew(true)}><Plus size={16} /> Nuevo producto</Button>
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Package size={20} />}
            title="No hay productos"
            description="Crea productos y servicios para incluirlos en tus facturas."
            action={<Button onClick={() => setShowNew(true)}><Plus size={16} /> Crear producto</Button>}
          />
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <Card key={product.id} className="p-5 hover:shadow-pop transition-shadow cursor-pointer">
              <div className="flex items-start justify-between gap-2">
                <div className="h-10 w-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange-dark">
                  <Package size={20} />
                </div>
                <Badge tone="neutral">{product.unit}</Badge>
              </div>
              <h3 className="font-semibold text-ink mt-3">{product.name}</h3>
              <p className="text-sm text-muted mt-1 line-clamp-2">{product.description}</p>
              <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">Precio</p>
                  <p className="text-lg font-bold text-ink">{formatCurrency(product.price)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted">IVA</p>
                  <p className="text-sm font-medium text-ink">{product.taxRate}%</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={showNew}
        onClose={() => setShowNew(false)}
        title="Nuevo producto"
        description="Crea un producto o servicio reutilizable."
        footer={
          <>
            <Button variant="outline" onClick={() => setShowNew(false)}>Cancelar</Button>
            <Button onClick={() => setShowNew(false)}>Guardar producto</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Nombre" placeholder="Ej. Consultoría frontend" />
          <Textarea label="Descripción" placeholder="Describe el producto o servicio…" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Precio" type="number" placeholder="0,00" />
            <Select label="Unidad">
              <option value="hora">hora</option>
              <option value="proyecto">proyecto</option>
              <option value="mes">mes</option>
              <option value="año">año</option>
              <option value="unidad">unidad</option>
            </Select>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="Tipo de IVA">
              <option value="21">21% — General</option>
              <option value="10">10% — Reducido</option>
              <option value="4">4% — Superreducido</option>
              <option value="0">0% — Exento</option>
            </Select>
            <Input label="Stock (opcional)" type="number" placeholder="0" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
