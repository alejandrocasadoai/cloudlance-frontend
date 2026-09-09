import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, AlertCircle, Clock, Users } from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn, formatDate } from '@/lib/utils';
import { MOCK_EVENTS } from '@/lib/mock-data';
import type { CalendarEvent } from '@/types';

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const TYPE_STYLES: Record<CalendarEvent['type'], { dot: string; bg: string; icon: typeof FileText }> = {
  invoice: { dot: 'bg-warning', bg: 'bg-warning-bg', icon: FileText },
  tax: { dot: 'bg-error', bg: 'bg-error-bg', icon: AlertCircle },
  meeting: { dot: 'bg-info', bg: 'bg-info-bg', icon: Users },
  reminder: { dot: 'bg-muted', bg: 'bg-surface', icon: Clock },
};

const TYPE_LABEL: Record<CalendarEvent['type'], string> = {
  invoice: 'Vencimiento de factura',
  tax: 'Liquidación fiscal',
  meeting: 'Reunión',
  reminder: 'Recordatorio',
};

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();

  const days: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const eventsByDay = (day: number) =>
    MOCK_EVENTS.filter((e) => {
      const ed = new Date(e.date);
      return ed.getFullYear() === year && ed.getMonth() === month && ed.getDate() === day;
    });

  const monthEvents = MOCK_EVENTS.filter((e) => {
    const ed = new Date(e.date);
    return ed.getFullYear() === year && ed.getMonth() === month;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const today = new Date(2026, 8, 5);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>{MONTHS[month]} {year}</CardTitle>
          <div className="flex items-center gap-1">
            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-surface text-ink transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-surface text-ink transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-muted py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => {
              if (day === null) return <div key={i} className="h-20 sm:h-24" />;
              const events = eventsByDay(day);
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              return (
                <div
                  key={i}
                  className={cn(
                    'h-20 sm:h-24 rounded-lg border p-1.5 flex flex-col gap-1 transition-colors',
                    isToday ? 'border-orange bg-orange/5' : 'border-line hover:bg-surface/50',
                  )}
                >
                  <span className={cn(
                    'text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full',
                    isToday ? 'bg-orange text-white' : 'text-muted',
                  )}>{day}</span>
                  <div className="flex-1 space-y-0.5 overflow-hidden">
                    {events.slice(0, 2).map((evt) => {
                      const style = TYPE_STYLES[evt.type];
                      return (
                        <div key={evt.id} className={cn('text-[10px] px-1.5 py-0.5 rounded truncate', style.bg)} title={evt.title}>
                          {evt.title}
                        </div>
                      );
                    })}
                    {events.length > 2 && (
                      <div className="text-[10px] text-muted px-1.5">+{events.length - 2} más</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Events list */}
      <Card>
        <CardHeader>
          <CardTitle>Eventos de {MONTHS[month]}</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3">
          {monthEvents.length === 0 ? (
            <p className="text-sm text-muted text-center py-8">No hay eventos este mes.</p>
          ) : (
            monthEvents.map((evt) => {
              const style = TYPE_STYLES[evt.type];
              const Icon = style.icon;
              return (
                <div key={evt.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface/50 transition-colors">
                  <div className={cn('h-9 w-9 rounded-xl flex items-center justify-center shrink-0', style.bg)}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink">{evt.title}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {formatDate(evt.date)}{evt.time ? ` · ${evt.time}` : ''}
                    </p>
                    {evt.description && <p className="text-xs text-muted mt-1">{evt.description}</p>}
                  </div>
                  <Badge tone="neutral">{TYPE_LABEL[evt.type]}</Badge>
                </div>
              );
            })
          )}
        </CardBody>
      </Card>
    </div>
  );
}
