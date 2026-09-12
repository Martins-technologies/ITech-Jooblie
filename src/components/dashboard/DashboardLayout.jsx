import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar, { DashboardMobileHeader } from './DashboardSidebar.jsx';
import { employerSidebarConfig } from '../../data/employerDashboardConfig.js';

export default function DashboardLayout({ variant = 'seeker' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isEmployer = variant === 'employer';
  const sidebarProps = isEmployer ? employerSidebarConfig : {};

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-white">
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        {...sidebarProps}
      />
      <div className="lg:pl-64">
        <DashboardMobileHeader onMenuOpen={() => setSidebarOpen(true)} />
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
