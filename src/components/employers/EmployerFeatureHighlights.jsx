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
            <Card key={item.id} className="flex h-full flex-col p-6">
              <Icon
                className="mb-4 h-11 w-11 text-brand-accent"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="mb-2 font-semibold text-brand-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-brand-muted">{item.description}</p>
            </Card>
          );
        })}
      </div>
      <StatsBar stats={heroStats} variant="divided" />
    </div>
  );
}
