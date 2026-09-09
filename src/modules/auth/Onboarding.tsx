import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Briefcase, Receipt, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

const BUSINESS_TYPES = [
  { id: 'freelance', label: 'Autónomo / Freelance', desc: 'Trabajas por tu cuenta' },
  { id: 'small', label: 'Pequeña empresa', desc: '2–10 personas' },
  { id: 'medium', label: 'Mediana empresa', desc: '11–50 personas' },
  { id: 'agency', label: 'Agencia / Estudio', desc: 'Servicios a clientes' },
];

const TAX_MODES = [
  { id: 'iva', label: 'IVA (Régimen general)', desc: 'Liquidaciones trimestrales de IVA' },
  { id: 'irpf', label: 'IRPF (Estimación directa)', desc: 'Retenciones e ingresos a cuenta' },
  { id: 'is', label: 'Impuesto de Sociedades', desc: 'Para empresas constituidas' },
  { id: 'simplified', label: 'Régimen simplificado', desc: 'Módulos y coeficientes' },
];

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [businessType, setBusinessType] = useState('');
  const [taxMode, setTaxMode] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [nif, setNif] = useState('');
  const [currency, setCurrency] = useState('EUR');

  const steps = [
    {
      title: 'Cuéntanos sobre tu negocio',
      subtitle: 'Esto nos ayuda a personalizar tu experiencia.',
      icon: Briefcase,
      content: (
        <div className="space-y-3">
          {BUSINESS_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setBusinessType(t.id)}
              className={cn(
                'w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-150',
                businessType === t.id ? 'border-orange bg-orange/5' : 'border-line bg-white hover:border-brown',
              )}
            >
              <div className={cn(
                'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0',
                businessType === t.id ? 'border-orange bg-orange' : 'border-line',
              )}>
                {businessType === t.id && <Check size={12} className="text-white" />}
              </div>
              <div>
                <p className="font-semibold text-ink">{t.label}</p>
                <p className="text-sm text-muted">{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: 'Configuración fiscal',
      subtitle: 'Selecciona los regímenes que aplican a tu actividad.',
      icon: Receipt,
      content: (
        <div className="space-y-6">
          <div className="space-y-3">
            {TAX_MODES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTaxMode(t.id)}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-150',
                  taxMode === t.id ? 'border-orange bg-orange/5' : 'border-line bg-white hover:border-brown',
                )}
              >
                <div className={cn(
                  'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0',
                  taxMode === t.id ? 'border-orange bg-orange' : 'border-line',
                )}>
                  {taxMode === t.id && <Check size={12} className="text-white" />}
                </div>
                <div>
                  <p className="font-semibold text-ink">{t.label}</p>
                  <p className="text-sm text-muted">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Nombre comercial"
              name="companyName"
              placeholder="Estudio Marina"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <Input
              label="NIF / CIF"
              name="nif"
              placeholder="12345678X"
              value={nif}
              onChange={(e) => setNif(e.target.value)}
            />
          </div>
          <Select
            label="Moneda principal"
            name="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="EUR">Euro (€)</option>
            <option value="USD">Dólar ($)</option>
            <option value="GBP">Libra (£)</option>
          </Select>
        </div>
      ),
    },
    {
      title: '¡Todo listo!',
      subtitle: 'Tu cuenta está configurada y lista para usar.',
      icon: Sparkles,
      content: (
        <div className="text-center py-6">
          <div className="h-16 w-16 rounded-full bg-success-bg flex items-center justify-center mx-auto mb-5">
            <Check size={32} className="text-success" />
          </div>
          <h3 className="text-xl font-semibold text-ink">Bienvenida a Cloudlance</h3>
          <p className="text-muted mt-2 max-w-sm mx-auto">
            Ya puedes empezar a crear facturas, registrar gastos y llevar el control de tu negocio.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-left max-w-md mx-auto">
            {[
              { label: 'Tipo de negocio', value: BUSINESS_TYPES.find((b) => b.id === businessType)?.label ?? '—' },
              { label: 'Régimen fiscal', value: TAX_MODES.find((t) => t.id === taxMode)?.label ?? '—' },
              { label: 'Moneda', value: currency === 'EUR' ? 'Euro (€)' : currency },
            ].map((item) => (
              <div key={item.label} className="cl-card p-3">
                <p className="text-xs text-muted">{item.label}</p>
                <p className="text-sm font-medium text-ink mt-0.5 truncate">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const current = steps[step];
  const StepIcon = current.icon;
  const isLast = step === steps.length - 1;
  const canProceed = step === 0 ? !!businessType : step === 1 ? !!taxMode : true;

  const handleNext = () => {
    if (isLast) {
      navigate('/app/dashboard');
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="h-16 border-b border-line flex items-center justify-between px-5">
        <Logo size="md" />
        <button onClick={() => navigate('/app/dashboard')} className="text-sm text-muted hover:text-ink transition-colors">
          Saltar por ahora
        </button>
      </header>

      <div className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-lg">
          <div className="flex items-center gap-2 mb-8">
            {steps.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300 flex-1',
                  i === step ? 'bg-orange' : i < step ? 'bg-orange/40' : 'bg-line',
                )}
              />
            ))}
          </div>

          <div className="cl-card p-6 sm:p-8 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange-dark">
                <StepIcon size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-ink">{current.title}</h2>
                <p className="text-sm text-muted">{current.subtitle}</p>
              </div>
            </div>

            <div className="cl-animate-in" key={step}>
              {current.content}
            </div>

            <div className="flex items-center justify-between mt-8 pt-5 border-t border-line">
              {step > 0 ? (
                <Button variant="ghost" onClick={() => setStep(step - 1)}>
                  <ArrowLeft size={16} /> Atrás
                </Button>
              ) : <div />}
              <Button onClick={handleNext} disabled={!canProceed}>
                {isLast ? 'Ir al dashboard' : 'Continuar'} <ArrowRight size={16} />
              </Button>
            </div>
          </div>

          <p className="text-center text-xs text-muted mt-5">Paso {step + 1} de {steps.length}</p>
        </div>
      </div>
    </div>
  );
}
