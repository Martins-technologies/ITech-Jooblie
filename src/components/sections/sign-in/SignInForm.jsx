import { useState } from 'react';
import { ArrowRight, Briefcase, Eye, EyeOff, Lock, Mail, User, Building2, Globe } from 'lucide-react';
import { signInRoles } from '../../../data/signInContent.js';
import useSignInForm from '../../../hooks/useSignInForm.js';
import Button from '../../common/Button.jsx';
import Checkbox from '../../common/Checkbox.jsx';
import Input from '../../common/Input.jsx';
import InlineNotice from '../../common/InlineNotice.jsx';

export default function SignInForm({ onSuccess }) {
  const { values, loading, error, notice, update, setRole, setMode, handleSubmit } = useSignInForm(onSuccess);
  const [showPassword, setShowPassword] = useState(false);
  const isSignup = values.mode === 'signup';
  const activeRole = signInRoles.find((role) => role.id === values.role) ?? signInRoles[0];

  return (
    <div className="w-full max-w-[440px]">
      <h2 className="text-3xl font-extrabold tracking-tight text-brand-white">
        {isSignup ? 'Create an account' : 'Welcome back'}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-brand-muted md:text-base">
        {isSignup
          ? values.role === 'employer'
            ? 'Register your company to post IT roles and review applicants.'
            : 'Create a job seeker account to apply and save IT jobs.'
          : activeRole.description}
      </p>

      <div
        role="radiogroup"
        aria-label="Sign in as"
        className="mt-7 grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-transparent p-1"
      >
        {signInRoles.map((role) => {
          const selected = values.role === role.id;
          const Icon = role.id === 'employer' ? Briefcase : User;
          return (
            <button
              key={role.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setRole(role.id)}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-accent ${
                selected
                  ? 'border border-brand-accent/50 bg-brand-accent/10 text-brand-accent'
                  : 'border border-transparent text-brand-muted hover:text-brand-white'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {role.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
        {isSignup ? (
          <Input
            id="sign-up-name"
            name="name"
            type="text"
            label="Full name"
            required
            icon={User}
            placeholder="Jane Doe"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
          />
        ) : null}

        <Input
          id="sign-in-email"
          name="email"
          type="email"
          label="Email"
          required
          icon={Mail}
          placeholder="you@example.com"
          autoComplete="email"
          value={values.email}
          onChange={update('email')}
        />
        <Input
          id="sign-in-password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          required
          icon={Lock}
          placeholder="At least 8 characters"
          autoComplete={isSignup ? 'new-password' : 'current-password'}
          value={values.password}
          onChange={update('password')}
          suffix={
            <button
              type="button"
              className="rounded-md p-1 text-brand-muted hover:text-brand-white focus-visible:ring-2 focus-visible:ring-brand-accent"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          }
        />

        {isSignup && values.role === 'employer' ? (
          <>
            <Input
              id="sign-up-company"
              name="company_name"
              label="Company name"
              required
              icon={Building2}
              placeholder="Acme Inc"
              value={values.company_name}
              onChange={update('company_name')}
            />
            <Input
              id="sign-up-website"
              name="company_website"
              type="url"
              label="Company website"
              required
              icon={Globe}
              placeholder="https://company.example"
              value={values.company_website}
              onChange={update('company_website')}
            />
            <Input
              id="sign-up-registration"
              name="company_registration_number"
              label="Registration number"
              required
              placeholder="Business registration number"
              value={values.company_registration_number}
              onChange={update('company_registration_number')}
            />
          </>
        ) : null}

        {!isSignup ? (
          <div className="flex items-center justify-between gap-3">
            <Checkbox
              id="sign-in-remember"
              label="Remember me"
              checked={values.remember}
              onChange={update('remember')}
            />
            <a
              href="https://www.jooblie.com/forgot-password"
              className="text-sm font-semibold text-brand-accent hover:text-brand-accentHover focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              Forgot password?
            </a>
          </div>
        ) : null}

        <InlineNotice tone="error">{error}</InlineNotice>
        <InlineNotice tone="success">{notice}</InlineNotice>

        <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
          {loading ? (isSignup ? 'Creating account...' : 'Logging In...') : isSignup ? 'Create account' : 'Log In'}
          {!loading && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-brand-muted">
        {isSignup ? (
          <>
            Already have an account?{' '}
            <button
              type="button"
              className="font-semibold text-brand-accent hover:text-brand-accentHover"
              onClick={() => setMode('signin')}
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className="font-semibold text-brand-accent hover:text-brand-accentHover"
              onClick={() => setMode('signup')}
            >
              Sign up
            </button>
          </>
        )}
      </p>
    </div>
  );
}
