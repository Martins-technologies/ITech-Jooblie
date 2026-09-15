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
    <div className="min-h-screen overflow-x-clip bg-brand-bg text-brand-white">
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        {...sidebarProps}
      />
      <div className="min-w-0 lg:pl-64">
        <DashboardMobileHeader onMenuOpen={() => setSidebarOpen(true)} />
        <main className="min-w-0 max-w-full p-4 sm:p-5 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
