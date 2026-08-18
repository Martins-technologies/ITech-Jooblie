import { UserCircle, Search, Send } from 'lucide-react';
import SectionHeading from '../common/SectionHeading.jsx';
import Card from '../common/Card.jsx';

const steps = [
  {
    number: 1,
    title: 'Create Your Profile',
    description:
      'Build your profile in minutes and showcase your skills, experience, and tech expertise.',
    icon: UserCircle,
  },
  {
    number: 2,
    title: 'Search IT Jobs',
    description:
      'Find top IT jobs in Canada across software development, cloud, data, cybersecurity, and more.',
    icon: Search,
  },
  {
    number: 3,
    title: 'Apply with Confidence',
    description:
      'Apply directly to trusted employers and take the next step in your tech career.',
    icon: Send,
  },
];

export default function HowItWorksSection() {
  return (
    <div>
      <SectionHeading
        title="How"
        accent="iTech Jobline"
        after="Works"
        align="left"
        className="mb-8"
      />

      <ol className="relative space-y-5">
        <span
          className="absolute left-[15px] top-6 bottom-6 border-l border-dashed border-brand-accent/50"
          aria-hidden="true"
        />
        {steps.map((step) => (
          <li key={step.number} className="relative flex gap-4">
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-brand-white">
              {step.number}
            </span>
            <Card hover={false} className="flex flex-1 items-start gap-4 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10">
                <step.icon className="h-5 w-5 text-brand-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-white">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-brand-muted">
                  {step.description}
                </p>
              </div>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
