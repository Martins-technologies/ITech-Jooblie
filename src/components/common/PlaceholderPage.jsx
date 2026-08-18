import Button from './Button.jsx';

/** Shared "coming soon" layout for pages not yet built. */
export default function PlaceholderPage({ title }) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-24">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl font-bold text-brand-white md:text-4xl">{title}</h1>
        <p className="mt-4 text-brand-muted">This page is coming soon.</p>
        <Button to="/" className="mt-8">
          Back to Home
        </Button>
      </div>
    </section>
  );
}
