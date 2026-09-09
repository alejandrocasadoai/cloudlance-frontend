import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Dashboard } from '@/modules/dashboard/Dashboard';
import { Invoices } from '@/modules/billing/Invoices';
import { Expenses } from '@/modules/billing/Expenses';
import { Clients } from '@/modules/clients/Clients';
import { Products } from '@/modules/catalog/Products';
import { Taxes } from '@/modules/taxes/Taxes';
import { CalendarPage } from '@/modules/calendar/CalendarPage';
import { Analytics } from '@/modules/analytics/Analytics';
import { AIAssistant } from '@/modules/ai-assistant/AIAssistant';
import { Settings } from '@/modules/settings/Settings';
import { Login } from '@/modules/auth/Login';
import { Signup } from '@/modules/auth/Signup';
import { Onboarding } from '@/modules/auth/Onboarding';
import { Landing } from '@/modules/marketing/Landing';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="clients" element={<Clients />} />
          <Route path="products" element={<Products />} />
          <Route path="taxes" element={<Taxes />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="ai" element={<AIAssistant />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
