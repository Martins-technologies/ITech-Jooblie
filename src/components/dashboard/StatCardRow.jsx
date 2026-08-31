import Card from '../common/Card.jsx';

export default function StatCardRow({ stats, items }) {
  const defaultItems = [
    { key: 'applications', label: 'Applications', value: stats.applications },
    { key: 'savedJobs', label: 'Saved Jobs', value: stats.savedJobs },
    { key: 'interviews', label: 'Interviews', value: stats.interviews },
    { key: 'offers', label: 'Offers', value: stats.offers },
  ];
  const displayItems = items || defaultItems;

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {displayItems.map((item, index) => (
        <Card key={item.key} hover={false} className="p-5">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                index % 3 === 0
                  ? 'bg-brand-accent/15 text-brand-accent'
                  : index % 3 === 1
                    ? 'bg-accent-orange/15 text-accent-orange'
                    : 'bg-status-success/15 text-status-success'
              }`}
            >
              <span className="text-lg font-black">{item.value}</span>
            </div>
            <div>
              <p className="text-2xl font-black text-brand-white">{item.value}</p>
              <p className="text-xs font-medium text-brand-muted">{item.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
