import { useState } from 'react';
import { Bell, LayoutGrid, Puzzle, Target, TrendingUp } from 'lucide-react';
import { jobCategories } from '../../../data/jobCategories.js';
import { hiringTrends } from '../../../data/hiringTrends.js';
import Badge from '../../common/Badge.jsx';
import Button from '../../common/Button.jsx';
import SectionHeading from '../../common/SectionHeading.jsx';
import CodeBracketGraphic from '../../graphics/CodeBracketGraphic.jsx';
import CategoryCard from './CategoryCard.jsx';
import TrendStatCard from './TrendStatCard.jsx';

export default function JobCategories() {
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <section id="job-categories" className="relative scroll-mt-24 overflow-hidden bg-brand-bg py-12">
      <CodeBracketGraphic className="pointer-events-none absolute right-4 top-8 hidden h-32 w-48 md:block" />

      <div className="container-page relative">
        <div className="mb-8">
          <Badge icon={Puzzle}>Find the right role in tech</Badge>
          <SectionHeading
            align="left"
            className="mt-4 mb-0"
            title="Explore"
            accent="IT Job Categories"
            subtitle="Browse software, cloud, cybersecurity, data, and support roles tailored to Canadian IT talent."
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {jobCategories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-brand-white">
            <TrendingUp className="h-5 w-5 text-brand-accent" />
            IT Hiring Trends in Canada
          </h3>
          <p className="text-sm text-brand-muted">
            Real-time insights from the Canadian IT job market
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {hiringTrends.map((trend) => (
            <TrendStatCard key={trend.id} {...trend} />
          ))}
        </div>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-brand-border/40 bg-brand-card px-6 py-8 shadow-card md:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-accent/15">
                <Target className="h-7 w-7 text-brand-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-brand-white">Find the right job, faster.</h3>
                <p className="mt-2 max-w-xl text-sm text-brand-muted">
                  Browse by category or create job alerts and get notified about new opportunities
                  that match your skills.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                icon={LayoutGrid}
                onClick={() =>
                  document
                    .getElementById('job-categories')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              >
                Browse All Categories
              </Button>
              <Button variant="outline" icon={Bell} onClick={() => setAlertOpen(true)}>
                Create Job Alert
              </Button>
            </div>
          </div>
        </div>
      </div>

      {alertOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl border border-brand-border/50 bg-brand-card p-6"
          >
            <h3 className="text-lg font-bold text-brand-white">Job alerts coming soon</h3>
            <p className="mt-2 text-sm text-brand-muted">
              Alert subscriptions will be added in a future module. For now, use search and
              category filters to browse matching roles.
            </p>
            <div className="mt-5 flex justify-end">
              <Button onClick={() => setAlertOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
