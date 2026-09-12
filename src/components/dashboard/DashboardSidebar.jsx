import { useNavigate } from 'react-router-dom';
import {
  Bookmark,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  Users,
  X,
} from 'lucide-react';
import { useAuth } from '../../lib/auth/AuthContext.jsx';
import Logo from '../layout/Logo.jsx';
import DashboardUserCard from './DashboardUserCard.jsx';
import SidebarNavItem from './SidebarNavItem.jsx';

const seekerWorkspaceLinks = [
  { to: '/dashboard/overview', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/find-jobs', label: 'Find Jobs', icon: Search },
  { to: '/dashboard/applications', label: 'My Applications', icon: FileText },
  { to: '/dashboard/saved-jobs', label: 'Saved Jobs', icon: Bookmark },
  { to: '/dashboard/profile', label: 'My Profile', icon: Users },
];

export default function DashboardSidebar({
  open,
  onClose,
  workspaceLinks = seekerWorkspaceLinks,
  settingsPath = '/dashboard/settings',
  roleLabel = 'Job Seeker',
}) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 p-4">
        <Logo size="sm" />
        <div className="mt-4">
          <DashboardUserCard roleLabel={roleLabel} />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4" aria-label="Dashboard">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-brand-muted">
          Workspace
        </p>
        <div className="space-y-1">
          {workspaceLinks.map((link) => (
            <SidebarNavItem key={link.to} {...link} onNavigate={onClose} />
          ))}
        </div>
      </nav>

      <div className="border-t border-white/10 p-4 space-y-1">
        <SidebarNavItem
          to={settingsPath}
          label="Settings"
          icon={Settings}
          onNavigate={onClose}
        />
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-brand-muted transition-colors hover:bg-white/5 hover:text-brand-white focus-visible:ring-2 focus-visible:ring-brand-accent"
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden h-screen w-64 shrink-0 border-r border-white/10 bg-brand-bg lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:flex-col">
        {sidebarContent}
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[min(100%,18rem)] flex-col bg-brand-bg shadow-card">
            <div className="flex justify-end p-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-brand-white focus-visible:ring-2 focus-visible:ring-brand-accent"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      ) : null}
    </>
  );
}

export function DashboardMobileHeader({ onMenuOpen }) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-brand-bg px-4 lg:hidden">
      <Logo size="sm" />
      <button
        type="button"
        onClick={onMenuOpen}
        className="rounded-lg border border-white/10 p-2 text-brand-white focus-visible:ring-2 focus-visible:ring-brand-accent"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>
    </header>
  );
}
