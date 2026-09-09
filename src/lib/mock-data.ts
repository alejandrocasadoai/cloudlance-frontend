import type {
  Invoice,
  Expense,
  Client,
  Product,
  TaxPeriod,
  CalendarEvent,
} from '@/types';

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    number: 'F-2026-0042',
    client: 'Acme Studios S.L.',
    clientEmail: 'finance@acmestudios.es',
    issueDate: '2026-08-28',
    dueDate: '2026-09-12',
    amount: 4800,
    status: 'sent',
    items: [
      { description: 'Diseño de identidad de marca', qty: 1, unitPrice: 3200 },
      { description: 'Sistema de componentes UI', qty: 1, unitPrice: 1600 },
    ],
  },
  {
    id: 'inv-2',
    number: 'F-2026-0041',
    client: 'Nordwind Labs',
    clientEmail: 'ap@nordwind.io',
    issueDate: '2026-08-15',
    dueDate: '2026-08-30',
    amount: 2250,
    status: 'paid',
    items: [{ description: 'Consultoría frontend (15h)', qty: 15, unitPrice: 150 }],
  },
  {
    id: 'inv-3',
    number: 'F-2026-0040',
    client: 'Café del Puerto',
    clientEmail: 'hola@cafedelpuerto.es',
    issueDate: '2026-08-02',
    dueDate: '2026-08-17',
    amount: 980,
    status: 'overdue',
    items: [{ description: 'Desarrollo web + hosting', qty: 1, unitPrice: 980 }],
  },
  {
    id: 'inv-4',
    number: 'F-2026-0039',
    client: 'Maison Verte',
    clientEmail: 'contact@maisonverte.fr',
    issueDate: '2026-07-20',
    dueDate: '2026-08-04',
    amount: 3600,
    status: 'paid',
    items: [
      { description: 'Rediseño de tienda online', qty: 1, unitPrice: 2400 },
      { description: 'Integración pasarela de pago', qty: 1, unitPrice: 1200 },
    ],
  },
  {
    id: 'inv-5',
    number: 'F-2026-0038',
    client: 'Sol y Mar Viajes',
    clientEmail: 'admin@solymarviajes.es',
    issueDate: '2026-07-10',
    dueDate: '2026-07-25',
    amount: 1500,
    status: 'paid',
    items: [{ description: 'Landing de campaña', qty: 1, unitPrice: 1500 }],
  },
  {
    id: 'inv-6',
    number: 'F-2026-0043',
    client: 'Bistró Noé',
    clientEmail: 'hola@bistronoe.es',
    issueDate: '2026-09-01',
    dueDate: '2026-09-16',
    amount: 720,
    status: 'draft',
    items: [{ description: 'Carta digital + QR', qty: 1, unitPrice: 720 }],
  },
];

export const MOCK_EXPENSES: Expense[] = [
  { id: 'exp-1', date: '2026-09-02', vendor: 'Figma', category: 'Software', amount: 15, status: 'deductible' },
  { id: 'exp-2', date: '2026-08-28', vendor: 'Vodafone', category: 'Software', amount: 39.95, status: 'deductible' },
  { id: 'exp-3', date: '2026-08-20', vendor: 'Renfe', category: 'Viajes', amount: 87.30, status: 'pending' },
  { id: 'exp-4', date: '2026-08-18', vendor: 'WeWork', category: 'Oficina', amount: 220, status: 'deductible' },
  { id: 'exp-5', date: '2026-08-12', vendor: 'Google Ads', category: 'Marketing', amount: 300, status: 'deductible' },
  { id: 'exp-6', date: '2026-08-05', vendor: 'El Corte Inglés', category: 'Otros', amount: 45.60, status: 'non-deductible' },
  { id: 'exp-7', date: '2026-07-30', vendor: 'Cafetería Central', category: 'Comidas', amount: 28, status: 'pending' },
];

export const MOCK_CLIENTS: Client[] = [
  { id: 'cli-1', name: 'Acme Studios S.L.', email: 'finance@acmestudios.es', phone: '+34 91 234 56 78', taxId: 'B12345678', address: 'Calle Mayor 12, 28013 Madrid', totalBilled: 12400, openInvoices: 1, status: 'active' },
  { id: 'cli-2', name: 'Nordwind Labs', email: 'ap@nordwind.io', phone: '+34 93 100 20 30', taxId: 'B98765432', address: 'Pg. de Gràcia 44, 08007 Barcelona', totalBilled: 8950, openInvoices: 0, status: 'active' },
  { id: 'cli-3', name: 'Café del Puerto', email: 'hola@cafedelpuerto.es', phone: '+34 95 222 33 44', taxId: 'B45612378', address: 'Muelle 3, 11010 Cádiz', totalBilled: 2960, openInvoices: 1, status: 'active' },
  { id: 'cli-4', name: 'Maison Verte', email: 'contact@maisonverte.fr', phone: '+33 1 40 20 30 40', taxId: 'FR55123456789', address: '12 Rue du Bac, 75007 Paris', totalBilled: 7200, openInvoices: 0, status: 'active' },
  { id: 'cli-5', name: 'Sol y Mar Viajes', email: 'admin@solymarviajes.es', phone: '+34 96 555 12 34', taxId: 'B78945612', address: 'Av. del Mar 8, 46023 Valencia', totalBilled: 4500, openInvoices: 0, status: 'inactive' },
  { id: 'cli-6', name: 'Bistró Noé', email: 'hola@bistronoe.es', phone: '+34 91 777 88 99', taxId: 'B32165498', address: 'Calle de la Cruz 5, 28012 Madrid', totalBilled: 720, openInvoices: 1, status: 'active' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'prod-1', name: 'Consultoría frontend', description: 'Hora de consultoría especializada en React y TypeScript', price: 150, taxRate: 21, unit: 'hora', stock: 0 },
  { id: 'prod-2', name: 'Diseño de marca', description: 'Identidad visual completa: logo, paleta y tipografías', price: 3200, taxRate: 21, unit: 'proyecto', stock: 0 },
  { id: 'prod-3', name: 'Desarrollo web', description: 'Sitio web a medida con CMS y responsive', price: 2400, taxRate: 21, unit: 'proyecto', stock: 0 },
  { id: 'prod-4', name: 'Hosting anual', description: 'Alojamiento gestionado con SSL y backups', price: 180, taxRate: 21, unit: 'año', stock: 0 },
  { id: 'prod-5', name: 'Soporte mensual', description: 'Soporte y mantenimiento continuo (4h/mes)', price: 240, taxRate: 21, unit: 'mes', stock: 0 },
];

export const MOCK_TAXES: TaxPeriod[] = [
  { id: 'tax-1', name: 'IVA T3 2026', period: 'Jul–Sep 2026', dueDate: '2026-10-20', amount: 1840, status: 'pending', type: 'IVA' },
  { id: 'tax-2', name: 'IRPF T3 2026', period: 'Jul–Sep 2026', dueDate: '2026-10-20', amount: 920, status: 'pending', type: 'IRPF' },
  { id: 'tax-3', name: 'IVA T2 2026', period: 'Abr–Jun 2026', dueDate: '2026-07-20', amount: 2110, status: 'filed', type: 'IVA' },
  { id: 'tax-4', name: 'IRPF T2 2026', period: 'Abr–Jun 2026', dueDate: '2026-07-20', amount: 1055, status: 'filed', type: 'IRPF' },
  { id: 'tax-5', name: 'IS 2025', period: 'Ejercicio 2025', dueDate: '2026-06-30', amount: 3400, status: 'filed', type: 'IS' },
  { id: 'tax-6', name: 'IVA T1 2026', period: 'Ene–Mar 2026', dueDate: '2026-04-20', amount: 1680, status: 'overdue', type: 'IVA' },
];

export const MOCK_EVENTS: CalendarEvent[] = [
  { id: 'evt-1', title: 'Vence F-2026-0042 (Acme Studios)', date: '2026-09-12', type: 'invoice' },
  { id: 'evt-2', title: 'Reunión con Maison Verte', date: '2026-09-08', time: '11:00', type: 'meeting', description: 'Revisión del nuevo catálogo online' },
  { id: 'evt-3', title: 'Presentación propuesta Nordwind', date: '2026-09-10', time: '16:30', type: 'meeting' },
  { id: 'evt-4', title: 'Vence F-2026-0040 (Café del Puerto)', date: '2026-08-17', type: 'invoice' },
  { id: 'evt-5', title: 'Liquidación IVA T3', date: '2026-10-20', type: 'tax' },
  { id: 'evt-6', title: 'Pago IRPF T3', date: '2026-10-20', type: 'tax' },
  { id: 'evt-7', title: 'Recordatorio: enviar recordatorio a Bistró Noé', date: '2026-09-14', type: 'reminder' },
];

export const MONTHLY_REVENUE = [
  { month: 'Abr', value: 4200 },
  { month: 'May', value: 5100 },
  { month: 'Jun', value: 3600 },
  { month: 'Jul', value: 5100 },
  { month: 'Ago', value: 7050 },
  { month: 'Sep', value: 5520 },
];

export const REVENUE_BY_CLIENT = [
  { name: 'Acme Studios', value: 12400 },
  { name: 'Nordwind Labs', value: 8950 },
  { name: 'Maison Verte', value: 7200 },
  { name: 'Sol y Mar', value: 4500 },
  { name: 'Otros', value: 2960 },
];
