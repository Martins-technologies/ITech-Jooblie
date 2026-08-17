import { Link } from 'react-router-dom';
import {
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Mail,
  Phone,
  Clock,
} from 'lucide-react';
import {
  footerQuickLinks,
  popularJobLinks,
  socialLinks,
  contactInfo,
  legalLinks,
} from '../../data/footerLinks.js';
import Logo from './Logo.jsx';
import MapleLeafIcon from '../common/MapleLeafIcon.jsx';

const socialIcons = {
  linkedin: Linkedin,
  twitter: TwitterIcon,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
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
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-muted">
            Canada&apos;s trusted IT job board connecting job seekers with top tech
            employers across the country.
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
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border/50 text-brand-accent transition-colors hover:border-brand-accent hover:bg-brand-accent/10"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <FooterColumn title="Quick Links">
          {footerQuickLinks.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-brand-accent">
              {link.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Popular Job Links">
          {popularJobLinks.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-brand-accent">
              {link.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Contact Us">
          <span className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
            {contactInfo.address}
          </span>
          <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-brand-accent">
            <Mail className="h-4 w-4 shrink-0 text-brand-accent" />
            {contactInfo.email}
          </a>
          <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-2 hover:text-brand-accent">
            <Phone className="h-4 w-4 shrink-0 text-brand-accent" />
            {contactInfo.phone}
          </a>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-brand-accent" />
            {contactInfo.hours}
          </span>
        </FooterColumn>
      </div>

      <div className="border-t border-brand-border/30">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-brand-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 iTech Jobline. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            {legalLinks.map((link) => (
              <Link key={link.label} to={link.to} className="hover:text-brand-accent">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="inline-flex items-center gap-1.5">
            <MapleLeafIcon className="h-3.5 w-3.5 text-brand-accent" />
            Proudly Canadian. Jobs from coast to coast.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-brand-white">{title}</h3>
      <div className="flex flex-col gap-2.5 text-sm text-brand-muted">{children}</div>
    </div>
  );
}
