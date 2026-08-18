import { postingSteps } from '../../../data/postingSteps.js';
import SectionHeading from '../../common/SectionHeading.jsx';
import StepCard from '../../common/StepCard.jsx';

export default function HowPostingWorks() {
  return (
    <section className="bg-brand-bg py-12 md:py-16">
      <div className="container-page">
        <SectionHeading
          title="How Posting Works"
          subtitle="Post your IT job in minutes and connect with qualified tech professionals across Canada."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {postingSteps.map((step, index) => (
            <StepCard
              key={step.id}
              icon={step.icon}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
              showConnector={index < postingSteps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
