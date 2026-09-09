import { useState } from 'react';
import { User, Building2, Bell, CreditCard, Shield, LogOut, Check } from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';

const TABS = [
  { id: 'profile', label: 'Perfil', icon: User },
  { id: 'company', label: 'Empresa', icon: Building2 },
  { id: 'notifications', label: 'Notificaciones', icon: Bell },
  { id: 'billing', label: 'Facturación', icon: CreditCard },
  { id: 'security', label: 'Seguridad', icon: Shield },
] as const;

type TabId = typeof TABS[number]['id'];

export function Settings() {
  const [tab, setTab] = useState<TabId>('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <Card className="p-3 lg:col-span-1 h-fit">
        <nav className="space-y-1">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  tab === t.id ? 'bg-orange/10 text-orange-dark' : 'text-muted hover:text-ink hover:bg-surface',
                )}
              >
                <Icon size={18} />
                {t.label}
              </button>
            );
          })}
          <div className="pt-2 mt-2 border-t border-line">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-error hover:bg-error-bg transition-colors">
              <LogOut size={18} />
              Cerrar sesión
            </button>
          </div>
        </nav>
      </Card>

      {/* Content */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>{TABS.find((t) => t.id === tab)?.label}</CardTitle>
          </CardHeader>
          <CardBody className="space-y-5">
            {tab === 'profile' && (
              <>
                <div className="flex items-center gap-4">
                  <Avatar name="Marina Costa" size="lg" />
                  <div>
                    <Button variant="outline" size="sm">Cambiar foto</Button>
                    <p className="text-xs text-muted mt-1.5">JPG, PNG o GIF. Máx 2MB.</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Nombre" defaultValue="Marina" />
                  <Input label="Apellido" defaultValue="Costa" />
                  <Input label="Email" type="email" defaultValue="marina@cloudlance.app" />
                  <Input label="Teléfono" defaultValue="+34 600 123 456" />
                </div>
              </>
            )}
            {tab === 'company' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Nombre comercial" defaultValue="Estudio Marina" />
                <Input label="NIF / CIF" defaultValue="12345678X" />
                <Input label="Dirección" defaultValue="Calle Mayor 12, Madrid" />
                <Select label="Moneda" defaultValue="EUR">
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">Dólar ($)</option>
                  <option value="GBP">Libra (£)</option>
                </Select>
                <Select label="Régimen fiscal">
                  <option>IVA — Régimen general</option>
                  <option>IRPF — Estimación directa</option>
                  <option>Impuesto de Sociedades</option>
                </Select>
                <Select label="Tipo de IVA por defecto">
                  <option value="21">21% — General</option>
                  <option value="10">10% — Reducido</option>
                  <option value="4">4% — Superreducido</option>
                </Select>
              </div>
            )}
            {tab === 'notifications' && (
              <div className="space-y-4">
                {[
                  { label: 'Vencimientos de facturas', desc: 'Recibe un aviso 3 días antes del vencimiento', on: true },
                  { label: 'Nuevos pagos recibidos', desc: 'Notificación al cobrar una factura', on: true },
                  { label: 'Liquidaciones fiscales', desc: 'Recordatorio antes de cada vencimiento fiscal', on: true },
                  { label: 'Resumen semanal', desc: 'Email con un resumen de tu actividad cada lunes', on: false },
                  { label: 'Consejos del Asistente IA', desc: 'Sugerencias personalizadas para tu negocio', on: true },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between py-3 border-b border-line last:border-0">
                    <div>
                      <p className="text-sm font-medium text-ink">{n.label}</p>
                      <p className="text-xs text-muted mt-0.5">{n.desc}</p>
                    </div>
                    <Toggle defaultOn={n.on} />
                  </div>
                ))}
              </div>
            )}
            {tab === 'billing' && (
              <div className="space-y-5">
                <div className="cl-card bg-orange/5 border-orange/20 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted">Plan actual</p>
                      <p className="text-xl font-bold text-ink mt-1">Pro · 19€/mes</p>
                      <p className="text-xs text-muted mt-1">Próxima renovación: 5 oct 2026</p>
                    </div>
                    <Button variant="outline" size="sm">Cambiar plan</Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink mb-3">Método de pago</p>
                  <div className="cl-card p-4 flex items-center gap-4">
                    <div className="h-8 w-12 rounded bg-ink flex items-center justify-center text-white text-xs font-bold">VISA</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink">•••• •••• •••• 4242</p>
                      <p className="text-xs text-muted">Caduca 12/27</p>
                    </div>
                    <Button variant="ghost" size="sm">Editar</Button>
                  </div>
                </div>
              </div>
            )}
            {tab === 'security' && (
              <div className="space-y-4">
                <Input label="Contraseña actual" type="password" placeholder="••••••••" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Nueva contraseña" type="password" placeholder="••••••••" />
                  <Input label="Confirmar contraseña" type="password" placeholder="••••••••" />
                </div>
                <div className="cl-card p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-ink">Autenticación en dos pasos</p>
                    <p className="text-xs text-muted mt-0.5">Añade una capa extra de seguridad</p>
                  </div>
                  <Toggle defaultOn={false} />
                </div>
              </div>
            )}
          </CardBody>
          {tab !== 'notifications' && tab !== 'billing' && (
            <div className="px-5 py-4 border-t border-line flex items-center justify-end gap-3">
              <Button variant="ghost">Cancelar</Button>
              <Button onClick={handleSave}>
                {saved ? <><Check size={16} /> Guardado</> : 'Guardar cambios'}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function Toggle({ defaultOn }: { defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={cn(
        'relative h-6 w-11 rounded-full transition-colors duration-200',
        on ? 'bg-orange' : 'bg-line',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-transform duration-200',
          on ? 'translate-x-5' : 'translate-x-0.5',
        )}
      />
    </button>
  );
}
