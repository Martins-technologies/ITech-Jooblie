import { Link } from 'react-router-dom';
import InlineNotice from './InlineNotice.jsx';

/**
 * Shows a primary message, optional bullet hints, and optional link action.
 */
export default function ValidationAlert({
  tone = 'error',
  title,
  message,
  hints = [],
  actionHref,
  actionLabel,
  className = '',
}) {
  if (!message && !title && !hints.length) return null;

  return (
    <InlineNotice tone={tone} className={className}>
      {title ? <span className="block font-semibold">{title}</span> : null}
      {message ? <span className={title ? 'mt-1 block' : 'block'}>{message}</span> : null}
      {hints.length ? (
        <ul className={`mt-2 list-disc space-y-1 pl-5 ${title || message ? '' : ''}`}>
          {hints.map((hint) => (
            <li key={hint}>{hint}</li>
          ))}
        </ul>
      ) : null}
      {actionHref && actionLabel ? (
        <Link
          to={actionHref}
          className="mt-3 inline-block font-semibold text-brand-accent underline hover:text-brand-accentHover"
        >
          {actionLabel}
        </Link>
      ) : null}
    </InlineNotice>
  );
}
