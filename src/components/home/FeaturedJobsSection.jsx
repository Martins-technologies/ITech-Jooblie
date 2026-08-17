import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { featuredJobs } from '../../data/featuredJobs.js';
import SectionHeading from '../common/SectionHeading.jsx';
import JobCard from './JobCard.jsx';

export default function FeaturedJobsSection() {
  return (
    <div>
      <SectionHeading
        title="Featured"
        accent="Tech Opportunities"
        align="left"
        className="mb-8"
      />
      <div className="space-y-3">
        {featuredJobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-accent hover:text-brand-accentHover"
        >
          View All Jobs
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
