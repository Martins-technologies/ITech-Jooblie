import { Send } from 'lucide-react';
import { subjectOptions } from '../../data/officeInfo.js';
import useContactForm from '../../hooks/useContactForm.js';
import LoadingSpinner from '../common/LoadingSpinner.jsx';

const fieldClass =
  'w-full rounded-lg border border-white/15 bg-[#0b111e] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-[#6b7280] focus:border-brand-accent';

export default function ContactForm() {
  const { values, errors, submitted, formError, loading, update, handleSubmit } = useContactForm();

  return (
    <div
      id="contact-form"
      className="w-full rounded-2xl border border-white/10 bg-[#111827]/95 p-6 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)] md:p-7"
    >
      <h2 className="mb-5 text-[22px] font-bold leading-tight text-white">Send us a Message</h2>

      {submitted ? (
        <p className="rounded-lg border border-brand-accent/40 bg-brand-accent/10 p-3 text-sm text-white">
          Thanks for reaching out. We received your message and will reply within one business day.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Field id="contact-name" label="Full Name" error={errors.name}>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              value={values.name}
              onChange={update('name')}
              aria-invalid={errors.name ? true : undefined}
              className={`${fieldClass} ${errors.name ? 'border-red-400' : ''}`}
            />
          </Field>

          <Field id="contact-email" label="Email" error={errors.email}>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              value={values.email}
              onChange={update('email')}
              aria-invalid={errors.email ? true : undefined}
              className={`${fieldClass} ${errors.email ? 'border-red-400' : ''}`}
            />
          </Field>

          <Field id="contact-subject" label="Subject" error={errors.subject}>
            <select
              id="contact-subject"
              value={values.subject}
              onChange={update('subject')}
              aria-invalid={errors.subject ? true : undefined}
              className={`${fieldClass} appearance-none bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-9 ${
                errors.subject ? 'border-red-400' : ''
              }`}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
              }}
            >
              {subjectOptions.map((option) => (
                <option key={option.value || option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>

          <Field id="contact-message" label="Message" error={errors.message}>
            <textarea
              id="contact-message"
              placeholder="How can we help you?"
              value={values.message}
              onChange={update('message')}
              aria-invalid={errors.message ? true : undefined}
              className={`${fieldClass} h-24 resize-none ${errors.message ? 'border-red-400' : ''}`}
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-accent text-sm font-bold text-white transition-colors hover:bg-brand-accentHover disabled:opacity-50"
          >
            {loading ? <LoadingSpinner label="" /> : <Send className="h-4 w-4" aria-hidden="true" />}
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          {formError ? <p className="text-xs text-red-400">{formError}</p> : null}
        </form>
      )}
    </div>
  );
}

function Field({ id, label, error, children }) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-1.5 block text-sm font-medium text-white/90">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
