const styles = {
  error: 'border-red-500/40 bg-red-500/10 text-red-400',
  success: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
  info: 'border-brand-accent/40 bg-brand-accent/10 text-brand-white',
};

export default function InlineNotice({ tone = 'info', children, className = '' }) {
  if (!children) return null;
  return (
    <p className={`rounded-lg border p-3 text-sm ${styles[tone] || styles.info} ${className}`}>
      {children}
    </p>
  );
}
