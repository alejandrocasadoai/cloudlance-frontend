export type InvoiceStatus = 'paid' | 'sent' | 'overdue' | 'draft';

export type Invoice = {
  id: string;
  number: string;
  client: string;
  clientEmail: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  items: { description: string; qty: number; unitPrice: number }[];
};

export type ExpenseCategory =
  | 'Software'
  | 'Oficina'
  | 'Viajes'
  | 'Comidas'
  | 'Marketing'
  | 'Otros';

export type Expense = {
  id: string;
  date: string;
  vendor: string;
  category: ExpenseCategory;
  amount: number;
  status: 'deductible' | 'pending' | 'non-deductible';
  note?: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  taxId: string;
  address: string;
  totalBilled: number;
  openInvoices: number;
  status: 'active' | 'inactive';
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  taxRate: number;
  unit: string;
  stock: number;
};

export type TaxPeriod = {
  id: string;
  name: string;
  period: string;
  dueDate: string;
  amount: number;
  status: 'filed' | 'pending' | 'overdue';
  type: 'IVA' | 'IRPF' | 'IS';
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'invoice' | 'tax' | 'meeting' | 'reminder';
  description?: string;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};
