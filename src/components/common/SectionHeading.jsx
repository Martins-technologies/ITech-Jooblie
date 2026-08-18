/**
 * Shared section heading: white title, cyan accent keyword, optional trailing text + subtitle.
 */
export default function SectionHeading({
  title,
  accent,
  after,
  subtitle,
  align = 'center',
  as: Tag = 'h2',
  className = '',
  compact = false,
}) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center';
  const headingSize = compact
    ? 'text-[1.75rem] font-bold tracking-tight text-brand-white md:text-[1.875rem] lg:text-[2rem]'
    : 'text-2xl font-bold tracking-tight text-brand-white md:text-3xl lg:text-4xl';

  return (
    <div className={`${compact ? 'mb-4' : 'mb-6'} ${alignClass} ${className}`}>
      <Tag className={headingSize}>
        {title ? <>{title} </> : null}
        {accent ? <span className="text-brand-accent">{accent}</span> : null}
        {after ? <> {after}</> : null}
      </Tag>
      {subtitle ? (
        <p
          className={`${compact ? 'mt-2' : 'mt-3'} max-w-2xl text-sm text-brand-muted md:text-base ${
            align === 'left' ? '' : 'mx-auto'
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
