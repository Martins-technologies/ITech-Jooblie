export default function LoadingSpinner({ label = 'Loading...', className = '' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div
          className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-brand-accent border-t-transparent"
          aria-hidden="true"
        />
        {label ? <p className="mt-4 text-sm text-brand-muted">{label}</p> : null}
      </div>
    </div>
  );
}
