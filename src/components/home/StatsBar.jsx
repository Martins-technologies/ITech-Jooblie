import Card from '../common/Card.jsx';

/**
 * Reusable stats row.
 * variant="cards" (default) — icon badges in a padded grid.
 * variant="divided" — one container split by vertical dividers.
 */
export default function StatsBar({ stats = [], variant = 'cards' }) {
  const isDivided = variant === 'divided';

  return (
    <Card
      hover={false}
      className={
        isDivided
          ? 'grid sm:grid-cols-2 lg:grid-cols-4'
          : 'grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4'
      }
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className={`flex items-start gap-3 ${
              isDivided ? 'p-6' : ''
            } ${
              index > 0
                ? isDivided
                  ? 'border-brand-border/40 sm:border-l lg:border-l'
                  : 'lg:border-l lg:border-brand-border/40 lg:pl-6'
                : ''
            }`}
          >
            {isDivided ? (
              <Icon className="mt-0.5 h-7 w-7 shrink-0 text-brand-accent" aria-hidden="true" />
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-accent/10">
                <Icon className="h-5 w-5 text-brand-accent" aria-hidden="true" />
              </div>
            )}
            <div>
              <p className="font-bold">
                <span className={isDivided ? 'text-brand-accent' : 'text-brand-white'}>
                  {stat.value}
                </span>
                {stat.label ? (
                  <span className="text-brand-white"> {stat.label}</span>
                ) : null}
              </p>
              {stat.subtext ? (
                <p className="mt-1 text-sm text-brand-muted">{stat.subtext}</p>
              ) : null}
            </div>
          </div>
        );
      })}
    </Card>
  );
}
