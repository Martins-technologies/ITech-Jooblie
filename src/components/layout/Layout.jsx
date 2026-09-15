import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  const { pathname } = useLocation();
  const hideFooter = pathname === '/sign-in';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-brand-bg">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {hideFooter ? null : <Footer />}
    </div>
  );
}
