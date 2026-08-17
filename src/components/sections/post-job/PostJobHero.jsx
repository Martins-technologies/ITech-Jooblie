import { FileText, Send } from 'lucide-react';
import { images } from '../../../data/images.js';
import { postJobTrustBadges } from '../../../data/postJobTrustBadges.js';
import Button from '../../common/Button.jsx';
import SectionEyebrow from '../../common/SectionEyebrow.jsx';
import PostJobForm from './PostJobForm.jsx';

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function PostJobHero() {
  return (
    <section id="post-job-hero" className="relative overflow-hidden bg-brand-bg pt-6 pb-16">
      <img
        src={images.postJobHero}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/92 to-brand-bg/75"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-brand-bg/40"
        aria-hidden="true"
      />

      <div className="container-page relative grid items-start gap-10 lg:grid-cols-2">
        <div>
          <SectionEyebrow label="Post a Job" />
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-brand-white md:text-5xl lg:text-[3.4rem]">
            Post IT Jobs Across Canada
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-muted md:text-lg">
            Connect with qualified tech professionals across Canada. Post your job and find the
            right talent for roles like software developers, cloud engineers, cybersecurity
            analysts, data analysts, DevOps engineers, and IT support specialists.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="gradient"
              icon={Send}
              onClick={() => scrollToId('post-job-form')}
            >
              Start Posting
            </Button>
            <Button
              type="button"
              variant="outline"
              icon={FileText}
              onClick={() => scrollToId('pricing-plans')}
            >
              View Plans
            </Button>
          </div>

          <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
            {postJobTrustBadges.map((badge) => (
              <li key={badge.id} className="flex items-center gap-2">
                <badge.icon className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
                <span className="text-sm text-brand-muted">{badge.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 scroll-mt-24 lg:pt-2">
          <PostJobForm />
        </div>
      </div>
    </section>
  );
}
