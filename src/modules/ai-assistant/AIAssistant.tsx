import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, FileText, AlertCircle, TrendingUp, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn, timeAgo } from '@/lib/utils';
import type { ChatMessage } from '@/types';

const SUGGESTIONS = [
  { icon: FileText, text: '¿Qué facturas están vencidas?' },
  { icon: TrendingUp, text: '¿Cómo va mi margen este trimestre?' },
  { icon: AlertCircle, text: '¿Qué impuestos tengo pendientes?' },
  { icon: Lightbulb, text: 'Dame 3 ideas para mejorar mi flujo de caja' },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: '¡Hola Marina! Soy tu asistente financiero. Puedo ayudarte con facturas, gastos, impuestos y análisis de tu negocio. ¿En qué puedo ayudarte hoy?',
    timestamp: new Date(2026, 8, 5, 9, 0).toISOString(),
  },
];

const RESPONSES: Record<string, string> = {
  vencidas: 'Tienes 1 factura vencida: **F-2026-0040** de Café del Puerto por 980,00 €, con vencimiento el 17 de agosto. Te recomiendo enviar un recordatorio de pago al cliente.',
  margen: 'Tu margen neto este trimestre es del **57.2%**, una mejora de 2.3 puntos porcentuales respecto al trimestre anterior. Tus ingresos han crecido un 18.7% mientras que los gastos solo un 4.1%. ¡Vas por buen camino!',
  impuestos: 'Tienes **2 liquidaciones pendientes**: IVA T3 (1.840 €) e IRPF T3 (920 €), ambas con vencimiento el 20 de octubre. Además, tienes 1 liquidación vencida: IVA T1 (1.680 €). Te recomiendo regularizarla cuanto antes.',
  flujo: 'Aquí van 3 ideas para mejorar tu flujo de caja:\n\n1. **Acorta tus plazos de pago**: Cambia de 30 días a 15 días en tus condiciones. Reducirás el tiempo entre emitir y cobrar.\n2. **Ofrece descuento por pronto pago**: Un 2% por pago en 7 días motiva a tus clientes a pagar antes.\n3. **Automatiza recordatorios**: Configura recordatorios automáticos 3 días antes del vencimiento y 7 días después.',
};

function getResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('vencid') || q.includes('factura')) return RESPONSES.vencidas;
  if (q.includes('margen') || q.includes('trimestre')) return RESPONSES.margen;
  if (q.includes('impuesto') || q.includes('pendiente')) return RESPONSES.impuestos;
  if (q.includes('flujo') || q.includes('caja') || q.includes('idea')) return RESPONSES.flujo;
  return 'Esa es una buena pregunta. Aunque soy una demo, en la versión completa podría analizar tus datos en tiempo real y darte una respuesta precisa. Prueba a preguntarme sobre facturas vencidas, tu margen, impuestos pendientes o ideas para mejorar tu flujo de caja.';
}

export function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = {
      id: `msg-${messages.length + 1}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `msg-${messages.length + 2}`,
        role: 'assistant',
        content: getResponse(text),
        timestamp: new Date().toISOString(),
      };
      setMessages((m) => [...m, aiMsg]);
      setLoading(false);
    }, 900);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 h-[calc(100vh-9rem)]">
        <Card className="flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-line flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange-dark">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-ink">Asistente Cloudlance</h2>
              <p className="text-xs text-success flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> En línea
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto cl-scrollbar px-5 py-6 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn('flex gap-3', msg.role === 'user' && 'flex-row-reverse')}>
                {msg.role === 'assistant' ? (
                  <div className="h-8 w-8 rounded-full bg-orange/10 flex items-center justify-center text-orange-dark shrink-0">
                    <Sparkles size={16} />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-ink flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    MC
                  </div>
                )}
                <div className={cn('max-w-[80%] rounded-2xl px-4 py-2.5', msg.role === 'assistant' ? 'bg-surface text-ink' : 'bg-ink text-white')}>
                  <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
                  <p className={cn('text-[10px] mt-1.5', msg.role === 'assistant' ? 'text-muted' : 'text-white/50')}>
                    {timeAgo(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-orange/10 flex items-center justify-center text-orange-dark shrink-0">
                  <Sparkles size={16} />
                </div>
                <div className="bg-surface rounded-2xl px-4 py-3 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-brown animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 rounded-full bg-brown animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 rounded-full bg-brown animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.text}
                    onClick={() => send(s.text)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-line bg-white text-sm text-ink hover:bg-surface hover:border-brown transition-all"
                  >
                    <Icon size={14} className="text-orange-dark" />
                    {s.text}
                  </button>
                );
              })}
            </div>
          )}

          {/* Input */}
          <div className="px-5 py-4 border-t border-line">
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta…"
                className="cl-input flex-1 h-11"
                disabled={loading}
              />
              <Button type="submit" size="icon" className="h-11 w-11" disabled={!input.trim() || loading}>
                <Send size={18} />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
