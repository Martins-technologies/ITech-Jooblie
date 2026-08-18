import { Briefcase, Globe, Search } from 'lucide-react';
import Button from '../common/Button.jsx';

const defaultActions = [
  { label: 'Browse Jobs', to: '/jobs', icon: Search, variant: 'primary' },
  { label: 'Post a Job', to: '/post-job', icon: Briefcase, variant: 'outline' },
];

/**
 * Shared CTA banner. Pass icon, title, accent, subtitle, actions, and align.
 */
export default function CTABanner({
  icon: Icon = Briefcase,
  title = 'Ready to Find Your Next',
  accent = 'Tech Job in Canada?',
  subtitle = 'Explore thousands of IT jobs from top Canadian employers or post a job to connect with skilled tech talent.',
  actions = defaultActions,
  align = 'center',
}) {
  const isSplit = align === 'split';

  return (
    <section className="bg-brand-bg pb-8">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl border border-brand-accent/40 bg-brand-card px-6 py-10 shadow-card md:px-10">
          <div
            className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30"
            style={{ backgroundSize: '20px 20px' }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute -right-8 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-brand-accent/20 blur-3xl" />
          <Globe
            className="pointer-events-none absolute -right-6 bottom-[-20px] h-44 w-44 text-brand-accent/15"
            strokeWidth={0.75}
            aria-hidden="true"
          />

          <div
            className={`relative flex flex-col gap-6 ${
              isSplit
                ? 'lg:flex-row lg:items-center lg:justify-between'
                : 'items-center text-center'
            }`}
          >
            <div className={`flex gap-5 ${isSplit ? 'items-center' : 'flex-col items-center'}`}>
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-brand-accent/70">
                <Icon className="h-7 w-7 text-brand-accent" strokeWidth={1.5} />
              </div>
              <div className={isSplit ? 'text-left' : ''}>
                <h2 className="text-2xl font-bold text-brand-white md:text-3xl">
                  {title} <span className="text-brand-accent">{accent}</span>
                </h2>
                <p className={`mt-2 max-w-xl text-sm text-brand-muted md:text-base ${isSplit ? '' : 'mx-auto'}`}>
                  {subtitle}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  to={action.to}
                  href={action.href}
                  variant={action.variant}
                  icon={action.icon}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
