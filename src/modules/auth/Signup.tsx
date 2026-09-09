import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate('/onboarding'), 700);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-1/2 bg-ink text-white p-12 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange/20 rounded-full blur-3xl -ml-32 -mb-32" />
        <Link to="/"><Logo size="md" className="[&_*]:text-white" /></Link>
        <div className="flex-1 flex flex-col justify-center max-w-md relative z-10">
          <h2 className="text-3xl font-bold leading-tight">Empieza gratis hoy.</h2>
          <p className="text-white/70 mt-3 text-lg">Sin tarjeta de crédito. Cancela cuando quieras. Configura tu cuenta en menos de 2 minutos.</p>
          <div className="mt-10 space-y-4">
            {[
              'Facturación ilimitada en el plan Pro',
              'Asistente IA para tus dudas fiscales',
              'Cumplimiento con normativa española',
            ].map((item) => (
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
          <h1 className="text-2xl font-bold text-ink">Crear cuenta</h1>
          <p className="text-muted mt-1.5 text-sm">Pruébalo gratis durante 14 días. Sin compromisos.</p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <Input
              label="Nombre completo"
              type="text"
              name="name"
              placeholder="Marina Costa"
              leftIcon={<User size={16} />}
              required
            />
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
              placeholder="Mínimo 8 caracteres"
              leftIcon={<Lock size={16} />}
              hint="Usa al menos 8 caracteres con letras y números."
              required
            />
            <label className="flex items-start gap-2.5 text-sm text-muted cursor-pointer">
              <input type="checkbox" className="rounded border-line mt-0.5" required />
              <span>Acepto los <a href="#" className="text-orange-dark hover:underline">Términos</a> y la <a href="#" className="text-orange-dark hover:underline">Política de Privacidad</a>.</span>
            </label>
            <Button type="submit" size="lg" className="w-full" loading={loading}>
              {!loading && <>Crear cuenta <ArrowRight size={18} /></>}
            </Button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-orange-dark font-medium hover:underline">Iniciar sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
