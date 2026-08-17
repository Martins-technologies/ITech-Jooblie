import Card from '../common/Card.jsx';

/**
 * Reusable stats row. Pass any `stats` array of { id, icon, value, label, subtext }.
 */
export default function StatsBar({ stats = [] }) {
  return (
    <Card hover={false} className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className={`flex items-start gap-3 ${
              index > 0 ? 'lg:border-l lg:border-brand-border/40 lg:pl-6' : ''
            }`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-accent/10">
              <Icon className="h-5 w-5 text-brand-accent" aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold text-brand-white">
                {stat.value} {stat.label}
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
