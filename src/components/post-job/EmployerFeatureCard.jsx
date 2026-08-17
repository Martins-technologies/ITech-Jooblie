import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Card from '../common/Card.jsx';

/** Feature card used on the Post a Job hero row and the hire-smarter grid. */
export default function EmployerFeatureCard({
  title,
  description,
  icon: Icon,
  footerLink,
}) {
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10">
        <Icon className="h-6 w-6 text-brand-accent" aria-hidden="true" />
      </div>
      <h3 className="mb-2 font-semibold text-brand-white">{title}</h3>
      <p className="flex-1 text-sm leading-relaxed text-brand-muted">{description}</p>
      {footerLink ? <FooterLink link={footerLink} /> : null}
    </Card>
  );
}

function FooterLink({ link }) {
  const classes =
    'mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-accent hover:text-brand-accentHover';

  if (link.to === '#') {
    return (
      <a href="#" className={classes}>
        {link.label}
        <ChevronRight className="h-4 w-4" />
      </a>
    );
  }

  return (
    <Link to={link.to} className={classes}>
      {link.label}
      <ChevronRight className="h-4 w-4" />
    </Link>
  );
}
