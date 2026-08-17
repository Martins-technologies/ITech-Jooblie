import { useState } from 'react';
import { User, Menu, X } from 'lucide-react';
import Button from '../common/Button.jsx';
import Logo from './Logo.jsx';
import NavItems from './NavItems.jsx';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-bg">
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-5 lg:flex lg:gap-7" aria-label="Primary">
          <NavItems />
        </nav>

        <div className="hidden items-center lg:flex">
          <Button to="/sign-in" variant="outline" icon={User}>
            Sign In
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex rounded-lg border border-brand-border/50 p-2 text-brand-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-brand-border/30 bg-brand-bg px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            <NavItems stacked onNavigate={() => setOpen(false)} />
          </nav>
          <div className="mt-5">
            <Button to="/sign-in" variant="outline" icon={User} onClick={() => setOpen(false)}>
              Sign In
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
