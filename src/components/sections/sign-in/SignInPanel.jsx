import { Star } from 'lucide-react';
import { signInTestimonial } from '../../../data/signInContent.js';
import Logo from '../../layout/Logo.jsx';
import CodeBracketGraphic from '../../graphics/CodeBracketGraphic.jsx';

export default function SignInPanel() {
  return (
    <div className="relative flex min-h-[420px] flex-col justify-between px-6 py-10 sm:px-10 lg:min-h-full lg:px-12 lg:py-12">
      <div className="max-w-lg">
        <Logo size="lg" />
        <h1 className="mt-10 text-3xl font-extrabold leading-tight tracking-tight text-brand-white sm:text-4xl lg:text-[2.75rem]">
          Welcome back to{' '}
          <span className="text-brand-accent">Canada&apos;s</span>{' '}
          <span className="bg-gradient-to-r from-brand-accent to-cyan-300 bg-clip-text text-transparent">
            IT &amp; tech
          </span>{' '}
          hiring platform.
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
          Log in to manage your applications, saved jobs, or job postings — all in one place.
        </p>
      </div>

      <blockquote className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1633]/70 p-5 shadow-card backdrop-blur-md md:p-6">
        <CodeBracketGraphic className="pointer-events-none absolute -right-4 bottom-0 h-24 w-36 opacity-50" />
        <div className="flex gap-1" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4 fill-brand-accent text-brand-accent"
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="relative mt-4 text-sm leading-relaxed text-brand-white md:text-base">
          “{signInTestimonial.quote}”
        </p>
        <footer className="relative mt-4">
          <p className="text-sm font-semibold text-brand-accent">{signInTestimonial.name}</p>
          <p className="text-xs text-white/55 md:text-sm">{signInTestimonial.role}</p>
        </footer>
      </blockquote>
    </div>
  );
}
