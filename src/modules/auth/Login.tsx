import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate('/app/dashboard'), 700);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-1/2 bg-ink text-white p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange/20 rounded-full blur-3xl -mr-32 -mt-32" />
        <Link to="/"><Logo size="md" className="[&_*]:text-white" /></Link>
        <div className="flex-1 flex flex-col justify-center max-w-md relative z-10">
          <h2 className="text-3xl font-bold leading-tight">Bienvenida de nuevo.</h2>
          <p className="text-white/70 mt-3 text-lg">Tus facturas, gastos y clientes te están esperando — todo a un clic.</p>
          <div className="mt-10 space-y-4">
            {['Facturas pendientes: 3', 'Gastos del mes: 936,85 €', 'Próximo vencimiento: 12 sep'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/80">
                <span className="h-2 w-2 rounded-full bg-orange" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/50 text-sm relative z-10">© 2026 Cloudlance</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12 bg-cream">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8"><Link to="/"><Logo size="md" /></Link></div>
          <h1 className="text-2xl font-bold text-ink">Iniciar sesión</h1>
          <p className="text-muted mt-1.5 text-sm">Introduce tus datos para acceder a tu cuenta.</p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="marina@cloudlance.app"
              leftIcon={<Mail size={16} />}
              required
            />
            <Input
              label="Contraseña"
              type="password"
              name="password"
              placeholder="••••••••"
              leftIcon={<Lock size={16} />}
              required
            />
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted cursor-pointer">
                <input type="checkbox" className="rounded border-line" />
                Recordarme
              </label>
              <a href="#" className="text-orange-dark font-medium hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            <Button type="submit" size="lg" className="w-full" loading={loading}>
              {!loading && <>Entrar <ArrowRight size={18} /></>}
            </Button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            ¿No tienes cuenta?{' '}
            <Link to="/signup" className="text-orange-dark font-medium hover:underline">Crear cuenta</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
