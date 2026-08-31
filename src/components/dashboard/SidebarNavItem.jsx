import { NavLink } from 'react-router-dom';

export default function SidebarNavItem({ to, icon: Icon, label, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-brand-accent ${
          isActive
            ? 'bg-brand-accent/10 font-bold text-brand-accent'
            : 'text-brand-muted hover:bg-white/5 hover:text-brand-white'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand-accent" />
          ) : null}
          <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          {label}
        </>
      )}
    </NavLink>
  );
}
