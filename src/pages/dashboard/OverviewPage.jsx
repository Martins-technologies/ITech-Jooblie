import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import ProfileCompletenessBar from '../../components/dashboard/ProfileCompletenessBar.jsx';
import RecommendedJobsSection from '../../components/dashboard/RecommendedJobsSection.jsx';
import StatCardRow from '../../components/dashboard/StatCardRow.jsx';
import { useDashboardData } from '../../context/DashboardDataContext.jsx';
import { mockRecommendedJobs } from '../../data/mockRecommendedJobs.js';

export default function OverviewPage() {
  const { stats, profileCompleteness } = useDashboardData();

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Overview"
        subtitle="Your job search at a glance."
      />
      <StatCardRow stats={stats} />
      <ProfileCompletenessBar percent={profileCompleteness} />
      <RecommendedJobsSection jobs={mockRecommendedJobs} />
    </>
  );
}
