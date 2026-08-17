import { Briefcase, Search } from 'lucide-react';
import Button from '../common/Button.jsx';

export default function CTABanner() {
  return (
    <section className="bg-brand-bg py-16 md:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl border border-brand-border/40 bg-brand-card px-6 py-12 text-center md:px-12">
          <div
            className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30"
            style={{ backgroundSize: '20px 20px' }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-brand-accent/20 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent/15">
              <Briefcase className="h-7 w-7 text-brand-accent" />
            </div>
            <h2 className="text-2xl font-bold text-brand-white md:text-3xl lg:text-4xl">
              Ready to Find Your Next{' '}
              <span className="text-brand-accent">Tech Job in Canada?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-muted">
              Browse thousands of IT roles or post an opening and connect with
              Canada&apos;s top tech talent today.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to="/jobs" icon={Search}>
                Browse Jobs
              </Button>
              <Button to="/post-job" variant="outline" icon={Briefcase}>
                Post a Job
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
