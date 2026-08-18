import Card from '../common/Card.jsx';

export default function PostingStep({ number, title, description, icon: Icon }) {
  return (
    <div className="relative pt-4">
      <span className="absolute left-4 top-0 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-brand-white">
        {number}
      </span>
      <Card hover className="flex h-full flex-col items-center px-5 pb-6 pt-10 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-accent/10">
          <Icon className="h-7 w-7 text-brand-accent" aria-hidden="true" />
        </div>
        <h3 className="mb-2 font-semibold text-brand-white">{title}</h3>
        <p className="text-sm leading-relaxed text-brand-muted">{description}</p>
      </Card>
    </div>
  );
}
