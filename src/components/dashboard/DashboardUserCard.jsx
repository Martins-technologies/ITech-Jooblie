import { useAuth } from '../../lib/auth/AuthContext.jsx';

const avatarColors = [
  'bg-brand-accent/20 text-brand-accent',
  'bg-accent-orange/20 text-accent-orange',
  'bg-status-success/20 text-status-success',
];

function getInitial(name) {
  const trimmed = (name || '').trim();
  if (!trimmed) return 'J';
  return trimmed.charAt(0).toUpperCase();
}

export default function DashboardUserCard({ roleLabel = 'Job Seeker' }) {
  const { user } = useAuth();
  const displayName = user?.full_name || user?.username || roleLabel;
  const initial = getInitial(displayName);
  const colorClass = avatarColors[initial.charCodeAt(0) % avatarColors.length];

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-brand-card/50 p-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${colorClass}`}
        aria-hidden="true"
      >
        {initial}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-brand-white">{displayName}</p>
        <p className="text-xs text-brand-muted">{roleLabel}</p>
      </div>
    </div>
  );
}
