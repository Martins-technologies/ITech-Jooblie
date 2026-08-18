import { useState } from 'react';
import { Briefcase, CircleHelp, Phone } from 'lucide-react';
import { postJobFaqs } from '../../../data/postJobFaqs.js';
import Accordion from '../../common/Accordion.jsx';
import Button from '../../common/Button.jsx';
import IconBadge from '../../common/IconBadge.jsx';

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function ClosingCtaFaq() {
  const [openId, setOpenId] = useState(postJobFaqs[0]?.id ?? null);

  return (
    <section className="bg-brand-bg pb-12 pt-4">
      <div className="container-page space-y-8">
        <div className="relative overflow-hidden rounded-2xl border border-brand-border/40 bg-brand-card px-6 py-8 shadow-card md:px-10">
          <div
            className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30"
            style={{ backgroundSize: '20px 20px' }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-brand-accent/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-accent/15">
                <Briefcase className="h-7 w-7 text-brand-accent" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-brand-white md:text-3xl">
                  Ready to Post Your Job?
                </h2>
                <p className="mt-2 max-w-xl text-sm text-brand-muted md:text-base">
                  Reach thousands of qualified tech professionals across Canada and find the
                  right talent for your team.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="gradient"
                icon={Briefcase}
                onClick={() => scrollToId('post-job-form')}
              >
                Post a Job
              </Button>
              <Button to="/contact" variant="outline" icon={Phone}>
                Contact Sales
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-brand-border/40 bg-brand-bgAlt p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <IconBadge icon={CircleHelp} className="rounded-full" />
              <h2 className="mt-4 text-2xl font-bold text-brand-white md:text-3xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted md:text-base">
                Get quick answers to common questions about posting IT and tech jobs.
              </p>
            </div>
            <div className="lg:col-span-2">
              <Accordion
                items={postJobFaqs}
                openId={openId}
                onToggle={(id) => setOpenId((current) => (current === id ? null : id))}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
