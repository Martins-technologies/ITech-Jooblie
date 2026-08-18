import { postingSteps } from '../../data/postJobPage.js';
import SectionHeading from '../common/SectionHeading.jsx';
import PostingStep from './PostingStep.jsx';

export default function HowPostingWorksSection() {
  return (
    <section className="bg-brand-bg pb-8">
      <div className="container-page">
        <SectionHeading
          title="How Posting Works"
          subtitle="Get your job in front of top tech talent across Canada in minutes."
        />

        <div className="relative">
          <div
            className="pointer-events-none absolute left-[10%] right-[10%] top-[72px] hidden border-t border-dashed border-brand-accent/40 md:block"
            aria-hidden="true"
          />
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {postingSteps.map((step, index) => (
              <PostingStep key={step.id} number={index + 1} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
