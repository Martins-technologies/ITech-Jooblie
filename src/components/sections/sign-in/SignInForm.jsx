import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { signInRoles } from '../../../data/signInContent.js';
import useSignInForm from '../../../hooks/useSignInForm.js';
import Button from '../../common/Button.jsx';
import Checkbox from '../../common/Checkbox.jsx';
import Input from '../../common/Input.jsx';

export default function SignInForm({ onSuccess }) {
  const { values, errors, loading, submitError, update, setRole, handleSubmit } =
    useSignInForm(onSuccess);
  const [showPassword, setShowPassword] = useState(false);
  const activeRole = signInRoles.find((role) => role.id === values.role) ?? signInRoles[0];

  return (
    <div className="w-full max-w-[440px]">
      <h2 className="text-3xl font-extrabold tracking-tight text-brand-white">Welcome back</h2>
      <p className="mt-2 text-sm leading-relaxed text-brand-muted md:text-base">
        {activeRole.description}
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
        <Input
          id="sign-in-email"
          name="email"
          type="email"
          label="Email address"
          required
          icon={Mail}
          placeholder="you@example.com"
          autoComplete="email"
          value={values.email}
          onChange={update('email')}
          error={errors.email}
        />
        <Input
          id="sign-in-username"
          name="username"
          type="text"
          label="Username"
          required
          icon={User}
          placeholder="your.username"
          autoComplete="username"
          value={values.username}
          onChange={update('username')}
          error={errors.username}
        />
        <Input
          id="sign-in-password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          required
          icon={Lock}
          placeholder="Enter your password"
          autoComplete="current-password"
          value={values.password}
          onChange={update('password')}
          error={errors.password}
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

        <div className="flex items-center justify-between gap-3">
          <Checkbox
            id="sign-in-remember"
            label="Remember me"
            checked={values.remember}
            onChange={update('remember')}
          />
          <Link
            to="/contact"
            className="text-sm font-semibold text-brand-accent hover:text-brand-accentHover focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            Forgot password?
          </Link>
        </div>

        {submitError && (
          <div className="text-sm text-red-400 border border-red-500/20 bg-red-500/5 rounded-lg p-3">
            {submitError}
          </div>
        )}

        <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
          {loading ? 'Logging In...' : 'Log In'}
          {!loading && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </Button>
      </form>


      <p className="mt-7 text-center text-sm text-brand-muted">
        Don&apos;t have an account?{' '}
        <Link
          to="/contact"
          className="font-semibold text-brand-accent hover:text-brand-accentHover focus-visible:ring-2 focus-visible:ring-brand-accent"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
