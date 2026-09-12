import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import ProfileCompletenessBar from '../../components/dashboard/ProfileCompletenessBar.jsx';
import RecommendedJobsSection from '../../components/dashboard/RecommendedJobsSection.jsx';
import StatCardRow from '../../components/dashboard/StatCardRow.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import InlineNotice from '../../components/common/InlineNotice.jsx';
import { useDashboardData } from '../../context/DashboardDataContext.jsx';

export default function OverviewPage() {
  const { stats, profileCompleteness, recommendedJobs, loading, error } = useDashboardData();

  if (loading) {
    return <LoadingSpinner className="min-h-[40vh]" label="Loading your dashboard..." />;
  }

  return (
    <>
      <DashboardTopBanner
        eyebrow="IT Jobs Jobline Dashboard"
        title="Overview"
        subtitle="Your job search at a glance."
      />
      <InlineNotice tone="error" className="mb-6">
        {error}
      </InlineNotice>
      <StatCardRow stats={stats} />
      <ProfileCompletenessBar percent={profileCompleteness} />
      {recommendedJobs.length ? (
        <RecommendedJobsSection jobs={recommendedJobs} />
      ) : (
        <p className="text-sm text-brand-muted">No recommended jobs yet. Complete your profile to improve matches.</p>
      )}
    </>
  );
}
