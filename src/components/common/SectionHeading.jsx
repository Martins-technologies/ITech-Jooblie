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
}) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center';

  return (
    <div className={`mb-6 ${alignClass} ${className}`}>
      <Tag className="text-2xl font-bold tracking-tight text-brand-white md:text-3xl lg:text-4xl">
        {title ? <>{title} </> : null}
        {accent ? <span className="text-brand-accent">{accent}</span> : null}
        {after ? <> {after}</> : null}
      </Tag>
      {subtitle ? (
        <p className="mx-auto mt-3 max-w-2xl text-sm text-brand-muted md:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
