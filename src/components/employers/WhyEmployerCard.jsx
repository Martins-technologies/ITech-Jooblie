import Card from '../common/Card.jsx';

export default function WhyEmployerCard({ title, description, icon: Icon }) {
  return (
    <Card as="a" href="#" className="group relative flex h-full items-start gap-4 p-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10 shadow-[0_0_18px_rgba(47,143,255,0.35)]">
        <Icon className="h-6 w-6 text-brand-accent" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1 pr-5">
        <h3 className="font-semibold text-brand-white">{title}</h3>
        <p className="mt-0.5 text-sm leading-relaxed text-brand-muted">{description}</p>
      </div>
      <span className="absolute bottom-5 right-5 text-brand-accent transition-transform group-hover:translate-x-1">
        ›
      </span>
    </Card>
  );
}
