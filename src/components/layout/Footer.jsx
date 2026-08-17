import { Link } from 'react-router-dom';
import { Linkedin, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { footerTagline, socialLinks, footerColumns } from '../../data/footerLinks.js';
import Logo from './Logo.jsx';

const socialIcons = {
  linkedin: Linkedin,
  twitter: TwitterIcon,
  facebook: Facebook,
};

const contactIcons = {
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
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
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <Logo size="lg" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-muted">
            {footerTagline}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {socialLinks.map((item) => {
              const Icon = socialIcons[item.id];
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-accent/60 text-brand-accent transition-colors hover:bg-brand-accent/10 focus-visible:ring-2 focus-visible:ring-brand-accent"
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
        <div className="container-page py-5 text-center text-xs text-brand-muted">
          <p>© 2025 iTech Jobline. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterItem({ item }) {
  const Icon = item.icon ? contactIcons[item.icon] : null;
  const className = 'inline-flex items-start gap-2 hover:text-brand-accent';

  const content = (
    <>
      {Icon ? <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" /> : null}
      {item.label}
    </>
  );

  if (item.to) {
    return (
      <Link to={item.to} className="hover:text-brand-accent">
        {item.label}
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

  return <span className="inline-flex items-start gap-2">{content}</span>;
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-brand-white">{title}</h3>
      <div className="flex flex-col gap-2.5 text-sm text-brand-muted">{children}</div>
    </div>
  );
}
