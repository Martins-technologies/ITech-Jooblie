import { hiringSteps } from '../../data/employersPage.js';
import SectionHeading from '../common/SectionHeading.jsx';
import PostingStep from '../post-job/PostingStep.jsx';
import CanadaMapDecor from './CanadaMapDecor.jsx';

export default function HowHiringWorksSection() {
  return (
    <section className="relative bg-brand-bg pb-8">
      <CanadaMapDecor className="pointer-events-none absolute right-8 top-8 hidden h-36 w-52 opacity-40 lg:block" />
      <div className="container-page relative">
        <SectionHeading
          title="How Hiring on"
          accent="iTech Jobline"
          after="Works"
          subtitle="A simple, efficient process to help you find and hire top IT talent across Canada."
        />
        <div className="relative">
          <div
            className="pointer-events-none absolute left-[10%] right-[10%] top-[72px] hidden border-t border-brand-accent/30 md:block"
            aria-hidden="true"
          />
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {hiringSteps.map((step, index) => (
              <PostingStep key={step.id} number={index + 1} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
