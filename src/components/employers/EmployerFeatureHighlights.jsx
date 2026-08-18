import Card from '../common/Card.jsx';
import StatsBar from '../home/StatsBar.jsx';
import { heroFeatureCards, heroStats } from '../../data/employersPage.js';

export default function EmployerFeatureHighlights() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {heroFeatureCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.id} className="flex h-full items-start gap-3 p-4">
              <Icon
                className="h-8 w-8 shrink-0 text-brand-accent"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-brand-white">{item.title}</h3>
                <p className="mt-0.5 text-sm leading-snug text-brand-muted">{item.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
      <StatsBar stats={heroStats} variant="divided" />
    </div>
  );
}
