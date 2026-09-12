import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import CompanyProfileForm from '../../components/employerDashboard/CompanyProfileForm.jsx';
import Card from '../../components/common/Card.jsx';
import InlineNotice from '../../components/common/InlineNotice.jsx';
import { useEmployerData } from '../../context/EmployerDataContext.jsx';

export default function CompanyProfilePage() {
  const { companyProfile, updateCompanyProfile, error, notice, loading } = useEmployerData();

  return (
    <>
      <DashboardTopBanner
        eyebrow="IT Jobs Jobline Dashboard"
        title="Company Profile"
        subtitle="Manage how your company appears to job seekers."
      />

      <InlineNotice tone="error" className="mb-6">
        {error}
      </InlineNotice>
      <InlineNotice tone="success" className="mb-6">
        {notice}
      </InlineNotice>

      <Card hover={false} className="p-6 md:p-8 max-w-2xl">
        <CompanyProfileForm profile={companyProfile} onSave={updateCompanyProfile} loading={loading} />
      </Card>
    </>
  );
}
