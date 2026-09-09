import { Link } from 'react-router-dom';
import {
  Cloud,
  FileText,
  Receipt,
  Sparkles,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';

const FEATURES = [
  { icon: FileText, title: 'Facturación sin esfuerzo', desc: 'Crea facturas profesionales en segundos, con plantillas y numeración automática.' },
  { icon: Receipt, title: 'Gastos bajo control', desc: 'Registra y categoriza cada gasto. Detectamos automáticamente lo que es deducible.' },
  { icon: Sparkles, title: 'Asistente IA', desc: 'Pregunta a tu copiloto financiero: previsiones, alertas y recomendaciones al instante.' },
  { icon: BarChart3, title: 'Analíticas claras', desc: 'Visualiza ingresos, gastos y margen con gráficos que entiendes de un vistazo.' },
  { icon: ShieldCheck, title: 'Seguro y conforme', desc: 'Cumplimiento fiscal español: IVA, IRPF e IS. Todo en un solo lugar.' },
  { icon: Cloud, title: 'En la nube, siempre', desc: 'Accede desde cualquier dispositivo. Tus datos siempre sincronizados y seguros.' },
];

const PLANS = [
  { name: 'Starter', price: '0', period: '/mes', features: ['Hasta 5 facturas/mes', '1 usuario', 'Gastos ilimitados', 'Soporte por email'], cta: 'Empezar gratis', highlight: false },
  { name: 'Pro', price: '19', period: '/mes', features: ['Facturas ilimitadas', 'Hasta 3 usuarios', 'Asistente IA', 'Recordatorios automáticos', 'Soporte prioritario'], cta: 'Probar 14 días', highlight: true },
  { name: 'Business', price: '49', period: '/mes', features: ['Todo de Pro', 'Usuarios ilimitados', 'Multi-empresa', 'API e integraciones', 'Gestor de cuenta'], cta: 'Hablar con ventas', highlight: false },
];

export function Landing() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Nav */}
      <nav className="sticky top-0 z-30 bg-cream/80 backdrop-blur-md border-b border-line">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Logo size="md" />
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-muted">
            <a href="#features" className="hover:text-ink transition-colors">Funciones</a>
            <a href="#pricing" className="hover:text-ink transition-colors">Precios</a>
            <a href="#faq" className="hover:text-ink transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login"><Button variant="ghost" size="sm">Iniciar sesión</Button></Link>
            <Link to="/signup"><Button size="sm">Empezar gratis</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-5 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange/10 text-orange-dark text-sm font-medium mb-6">
            <Sparkles size={14} /> Nuevo: Asistente IA para autónomos
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink max-w-3xl mx-auto leading-[1.1]">
            La gestión financiera que <span className="text-orange">se simplifica</span>
          </h1>
          <p className="text-lg text-muted mt-5 max-w-xl mx-auto">
            Facturas, gastos, impuestos y analíticas en un solo lugar. Diseñado para autónomos y pequeñas empresas que valoran su tiempo.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/signup"><Button size="lg">Empezar gratis <ArrowRight size={18} /></Button></Link>
            <Link to="/login"><Button variant="outline" size="lg">Ver demo</Button></Link>
          </div>
          <p className="text-xs text-muted mt-4">Sin tarjeta de crédito · Cancela cuando quieras</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-5 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ink">Todo lo que necesitas, nada que te estorbe</h2>
          <p className="text-muted mt-3 max-w-xl mx-auto">Una plataforma pensada para que pases menos tiempo con papeleo y más con tu negocio.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="cl-card p-6 shadow-card hover:shadow-pop transition-shadow duration-200">
                <div className="h-11 w-11 rounded-xl bg-orange/10 flex items-center justify-center text-orange-dark mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-ink text-lg">{f.title}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-5 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ink">Precios honestos</h2>
          <p className="text-muted mt-3">Empieza gratis. Mejora cuando lo necesites.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`cl-card p-6 shadow-card ${plan.highlight ? 'ring-2 ring-orange' : ''}`}
            >
              {plan.highlight && (
                <span className="inline-block px-2.5 py-1 rounded-full bg-orange text-white text-xs font-medium mb-4">
                  Más popular
                </span>
              )}
              <h3 className="text-xl font-bold text-ink">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-ink">{plan.price}€</span>
                <span className="text-muted text-sm">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check size={18} className="text-success shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="block mt-6">
                <Button variant={plan.highlight ? 'primary' : 'outline'} className="w-full">{plan.cta}</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="cl-card bg-ink text-white p-10 sm:p-14 text-center shadow-pop">
          <h2 className="text-3xl font-bold">¿Listo para simplificar tu gestión?</h2>
          <p className="text-white/70 mt-3 max-w-lg mx-auto">Únete a miles de autónomos que ya gestionan su negocio con Cloudlance.</p>
          <Link to="/signup" className="inline-block mt-7">
            <Button size="lg" variant="primary">Crear cuenta gratis <ArrowRight size={18} /></Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-sm text-muted">© 2026 Cloudlance. Hecho con cariño para autónomos.</p>
        </div>
      </footer>
    </div>
  );
}
