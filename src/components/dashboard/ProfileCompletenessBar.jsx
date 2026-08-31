import { Link } from 'react-router-dom';

export default function ProfileCompletenessBar({ percent }) {
  const complete = percent >= 100;

  return (
    <div className="mb-8 rounded-xl border border-white/10 bg-brand-card p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-white">Profile completeness</p>
          <p className="text-xs text-brand-muted">
            {complete
              ? 'Your profile is complete. Great job!'
              : 'A complete profile helps employers find you.'}
          </p>
        </div>
        {!complete ? (
          <Link
            to="/dashboard/profile"
            className="text-sm font-semibold text-brand-accent hover:text-brand-accentHover focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            Complete your profile →
          </Link>
        ) : null}
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-brand-gradient transition-all duration-300"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Profile ${percent}% complete`}
        />
      </div>
      <p className="mt-2 text-right text-xs font-semibold text-brand-accent">{percent}%</p>
    </div>
  );
}
