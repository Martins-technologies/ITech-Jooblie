import Button from '../components/common/Button.jsx';

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-24">
      <div className="max-w-lg text-center">
        <p className="text-sm font-semibold text-brand-accent">404</p>
        <h1 className="mt-2 text-3xl font-bold text-brand-white md:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-brand-muted">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button to="/" className="mt-8">
          Back to Home
        </Button>
      </div>
    </section>
  );
}
