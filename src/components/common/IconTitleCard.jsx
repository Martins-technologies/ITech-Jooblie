import Card from './Card.jsx';
import IconBadge from './IconBadge.jsx';

export default function IconTitleCard({
  icon,
  title,
  description,
  underline = true,
  layout = 'inline',
}) {
  const isInline = layout === 'inline';

  return (
    <Card className="flex h-full flex-col p-4" hover>
      <div className={isInline ? 'flex items-center gap-2.5' : ''}>
        <IconBadge
          icon={icon}
          className={`rounded-full border border-brand-accent/40 ${
            isInline ? 'h-9 w-9 shrink-0' : ''
          }`}
        />
        <h3 className={`font-semibold text-brand-white ${isInline ? 'min-w-0 text-[15px] leading-snug' : 'mt-4'}`}>
          {title}
        </h3>
      </div>
      {underline ? (
        <span className="mt-2 block h-0.5 w-10 bg-brand-accent" aria-hidden="true" />
      ) : null}
      <p className={`${underline ? 'mt-2' : 'mt-2'} text-[13px] leading-snug text-brand-muted`}>
        {description}
      </p>
    </Card>
  );
}
