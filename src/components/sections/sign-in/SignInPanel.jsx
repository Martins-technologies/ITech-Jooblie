import { Star } from 'lucide-react';
import { images } from '../../../data/images.js';
import { signInTestimonial } from '../../../data/signInContent.js';
import Card from '../../common/Card.jsx';
import Logo from '../../layout/Logo.jsx';
import CodeBracketGraphic from '../../graphics/CodeBracketGraphic.jsx';

export default function SignInPanel() {
  return (
    <div className="relative isolate flex min-h-[420px] flex-col justify-between overflow-hidden px-6 py-10 sm:px-10 lg:min-h-full lg:px-12 lg:py-12">
      <img
        src={images.signInHero}
        alt="IT professionals collaborating in a modern Canadian office"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-bg via-brand-bg/88 to-brand-bg/55"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-brand-accent/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <Logo size="lg" />
        <h1 className="mt-10 max-w-lg text-3xl font-extrabold leading-tight tracking-tight text-brand-white sm:text-4xl lg:text-[2.75rem]">
          Welcome back to{' '}
          <span className="text-brand-accent">Canada&apos;s</span>{' '}
          <span className="bg-gradient-to-r from-brand-accent to-cyan-300 bg-clip-text text-transparent">
            IT &amp; tech
          </span>{' '}
          hiring platform.
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-muted md:text-base">
          Log in to manage your applications, saved jobs, or job postings — all in one place.
        </p>
      </div>

      <Card hover={false} className="relative z-10 mt-10 overflow-hidden p-5 shadow-card md:p-6">
        <CodeBracketGraphic className="pointer-events-none absolute -right-4 bottom-0 h-24 w-36 opacity-70" />
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
        <p className="relative mt-4 text-sm font-semibold text-brand-accent">
          {signInTestimonial.name}
        </p>
        <p className="relative text-xs text-brand-muted md:text-sm">{signInTestimonial.role}</p>
      </Card>
    </div>
  );
}
