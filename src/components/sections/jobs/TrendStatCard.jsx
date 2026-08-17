import { TrendingUp } from 'lucide-react';
import Card from '../../common/Card.jsx';

export default function TrendStatCard({ label, value, change, icon: Icon }) {
  return (
    <Card hover={false} className="relative overflow-hidden p-5">
      <Sparkline />
      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-accent/40 bg-brand-accent/10 text-brand-accent">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <p className="mt-3 text-xs text-brand-muted">{label}</p>
        <p className="mt-1 text-2xl font-bold text-brand-accent">{value}</p>
        <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-status-success">
          <TrendingUp className="h-3.5 w-3.5" />
          ↑ {change} from last month
        </p>
      </div>
    </Card>
  );
}

function Sparkline() {
  return (
    <svg
      viewBox="0 0 160 64"
      className="pointer-events-none absolute bottom-6 right-2 h-16 w-28 text-brand-accent/30"
      aria-hidden="true"
    >
      <path
        d="M2 48 C 20 44, 28 36, 42 34 S 70 40, 86 22 S 120 8, 158 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
