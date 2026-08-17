export default function IconBadge({ icon: Icon, className = '' }) {
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent ${className}`}
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
    </div>
  );
}
