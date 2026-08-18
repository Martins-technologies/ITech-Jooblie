import { NavLink } from 'react-router-dom';
import { navLinks } from '../../data/navLinks.js';

export default function NavItems({ onNavigate }) {
  return navLinks.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      end={link.to === '/'}
      onClick={onNavigate}
      className={({ isActive }) =>
        `relative px-1 py-1 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-brand-accent ${
          isActive ? 'text-brand-accent' : 'text-brand-white hover:text-brand-accent'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {link.label}
          {isActive ? (
            <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] rounded-full bg-brand-accent" />
          ) : null}
        </>
      )}
    </NavLink>
  ));
}
