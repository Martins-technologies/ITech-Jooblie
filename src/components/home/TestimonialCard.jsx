import Card from '../common/Card.jsx';

export default function TestimonialCard({ name, role, quote, avatar }) {
  return (
    <Card hover className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start">
      <img
        src={avatar}
        alt={name}
        className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-brand-accent/40"
      />
      <div>
        <p className="text-sm leading-relaxed text-brand-white md:text-base">
          &ldquo;{quote}&rdquo;
        </p>
        <p className="mt-4 font-semibold text-brand-white">{name}</p>
        <p className="text-sm text-brand-muted">{role}</p>
      </div>
    </Card>
  );
}
