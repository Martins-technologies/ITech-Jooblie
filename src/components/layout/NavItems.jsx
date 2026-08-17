import { NavLink, Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { navLinks } from '../../data/navLinks.js';

const linkClass = (isActive) =>
  `relative inline-flex items-center gap-1 px-1 py-1 text-sm font-medium transition-colors ${
    isActive ? 'text-brand-accent' : 'text-brand-white hover:text-brand-accent'
  }`;

function Underline({ active }) {
  if (!active) return null;
  return (
    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-brand-accent" />
  );
}

function MenuItems({ items, onNavigate, stacked }) {
  return items.map((item) => {
    const classes = stacked
      ? 'text-sm text-brand-muted hover:text-brand-accent'
      : 'block px-4 py-2 text-sm text-brand-white hover:bg-brand-accent/10 hover:text-brand-accent';

    if (item.to === '#') {
      return (
        <a key={item.label} href="#" onClick={onNavigate} className={classes}>
          {item.label}
        </a>
      );
    }

    return (
      <Link key={item.label} to={item.to} onClick={onNavigate} className={classes}>
        {item.label}
      </Link>
    );
  });
}

export default function NavItems({ onNavigate, stacked = false }) {
  return navLinks.map((link) => {
    if (link.dropdown) {
      return (
        <div key={link.to} className={`relative ${stacked ? '' : 'group'}`}>
          <NavLink
            to={link.to}
            end={link.to === '/'}
            onClick={onNavigate}
            className={({ isActive }) => linkClass(isActive)}
          >
            {({ isActive }) => (
              <>
                {link.label}
                <ChevronDown className="h-3.5 w-3.5" />
                <Underline active={isActive} />
              </>
            )}
          </NavLink>
          {stacked ? (
            <div className="ml-3 mt-2 flex flex-col gap-2 border-l border-brand-border/40 pl-3">
              <MenuItems items={link.dropdown} onNavigate={onNavigate} stacked />
            </div>
          ) : (
            <div className="invisible absolute left-0 top-full z-50 min-w-[200px] pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="rounded-xl border border-brand-border/40 bg-brand-card py-2 shadow-card">
                <MenuItems items={link.dropdown} onNavigate={onNavigate} />
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        key={link.to}
        to={link.to}
        end={link.to === '/'}
        onClick={onNavigate}
        className={({ isActive }) => linkClass(isActive)}
      >
        {({ isActive }) => (
          <>
            {link.label}
            <Underline active={isActive} />
          </>
        )}
      </NavLink>
    );
  });
}
