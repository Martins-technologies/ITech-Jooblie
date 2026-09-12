export default function DashboardTopBanner({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-8 rounded-2xl border border-brand-border/30 bg-gradient-to-r from-brand-card via-brand-bgAlt to-brand-card p-6 md:p-8">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-white md:text-3xl">
        {title}
      </h1>
      {subtitle ? <p className="mt-2 max-w-2xl text-sm text-brand-muted md:text-base">{subtitle}</p> : null}
    </div>
  );
}
