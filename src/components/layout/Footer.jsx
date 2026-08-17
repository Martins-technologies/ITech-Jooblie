import { Link } from 'react-router-dom';
import { ChevronRight, Facebook, Globe, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import {
  footerBrandLine,
  footerColumns,
  footerLegalLinks,
  footerTagline,
  socialLinks,
} from '../../data/footerLinks.js';
import Logo from './Logo.jsx';

const socialIcons = {
  linkedin: Linkedin,
  twitter: TwitterIcon,
  facebook: Facebook,
  email: Mail,
};

const contactIcons = {
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  globe: Globe,
};

function TwitterIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.59l-5.16-6.74L5.2 22H1.93l8.02-9.16L1.5 2h6.75l4.66 6.16L18.244 2Zm-1.16 18.06h1.81L6.99 3.86H5.05l12.034 16.2Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-brand-border/30 bg-brand-bg">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-brand-border/30">
        <div className="lg:pr-8">
          <Logo size="lg" />
          <p className="mt-3 text-sm font-semibold text-brand-white">{footerBrandLine}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-brand-muted">{footerTagline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {socialLinks.map((item) => {
              const Icon = socialIcons[item.id];
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={item.label}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-brand-accent ${
                    item.filled
                      ? 'bg-brand-accent text-brand-white hover:bg-brand-accentHover'
                      : 'border border-brand-accent/60 text-brand-accent hover:bg-brand-accent/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {Object.entries(footerColumns).map(([key, column]) => (
          <FooterColumn key={key} title={column.title}>
            {column.items.map((item) => (
              <FooterItem key={item.label} item={item} />
            ))}
          </FooterColumn>
        ))}
      </div>

      <div className="border-t border-brand-border/30">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-brand-muted sm:flex-row">
          <p>© 2025 iTech Jobline. All rights reserved.</p>
          <p className="flex flex-wrap items-center justify-center gap-x-2">
            {footerLegalLinks.map((item, index) => (
              <span key={item.label} className="inline-flex items-center gap-x-2">
                {index > 0 ? <span aria-hidden="true">|</span> : null}
                <Link to={item.to} className="hover:text-brand-accent">
                  {item.label}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterItem({ item }) {
  const Icon = item.icon ? contactIcons[item.icon] : null;
  const isContact = Boolean(Icon);
  const className = isContact
    ? 'inline-flex items-start gap-2 hover:text-brand-accent'
    : 'inline-flex items-center gap-2 hover:text-brand-accent';

  const content = (
    <>
      {Icon ? (
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
      ) : (
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-brand-accent" aria-hidden="true" />
      )}
      {item.label}
    </>
  );

  if (item.to) {
    return (
      <Link to={item.to} className={className}>
        {content}
      </Link>
    );
  }

  if (item.href) {
    return (
      <a href={item.href} className={className}>
        {content}
      </a>
    );
  }

  return <span className={className}>{content}</span>;
}

function FooterColumn({ title, children }) {
  return (
    <div className="lg:px-8">
      <h3 className="mb-4 text-sm font-semibold text-brand-white">{title}</h3>
      <div className="flex flex-col gap-2.5 text-sm text-brand-muted">{children}</div>
    </div>
  );
}
