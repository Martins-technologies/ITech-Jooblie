import { useState } from 'react';
import { Briefcase, User, Menu, X } from 'lucide-react';
import Button from '../common/Button.jsx';
import Logo from './Logo.jsx';
import NavItems from './NavItems.jsx';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-bg">
      <div className="container-page grid h-[72px] grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <Logo size="md" className="justify-self-start" />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          <NavItems />
        </nav>

        <div className="hidden items-center justify-self-end gap-3 md:flex">
          <Button to="/post-job" icon={Briefcase}>
            Post a Job
          </Button>
          <Button to="/sign-in" variant="outline" icon={User}>
            Sign In
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex justify-self-end rounded-lg border border-brand-border/50 p-2 text-brand-white md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-brand-border/30 bg-brand-bg px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            <NavItems onNavigate={() => setOpen(false)} />
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <Button to="/post-job" icon={Briefcase} onClick={() => setOpen(false)}>
              Post a Job
            </Button>
            <Button
              to="/sign-in"
              variant="outline"
              icon={User}
              onClick={() => setOpen(false)}
            >
              Sign In
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
