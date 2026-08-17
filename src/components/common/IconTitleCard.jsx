import Card from './Card.jsx';
import IconBadge from './IconBadge.jsx';

export default function IconTitleCard({
  icon,
  title,
  description,
  underline = true,
  layout = 'stacked',
}) {
  const isInline = layout === 'inline';

  return (
    <Card className={`h-full p-5 ${isInline ? 'flex items-start gap-4' : ''}`} hover>
      <IconBadge
        icon={icon}
        className={`rounded-full border border-brand-accent/40 ${
          isInline ? 'h-11 w-11 shrink-0' : ''
        }`}
      />
      <div className={isInline ? 'min-w-0' : 'mt-4'}>
        <h3 className="font-semibold text-brand-white">{title}</h3>
        {underline ? (
          <span className="mt-1.5 block h-0.5 w-10 bg-brand-accent" aria-hidden="true" />
        ) : null}
        <p className="mt-3 text-sm leading-relaxed text-brand-muted">{description}</p>
      </div>
    </Card>
  );
}
