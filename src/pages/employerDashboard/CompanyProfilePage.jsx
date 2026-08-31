import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import CompanyProfileForm from '../../components/employerDashboard/CompanyProfileForm.jsx';
import Card from '../../components/common/Card.jsx';
import { useEmployerData } from '../../context/EmployerDataContext.jsx';

export default function CompanyProfilePage() {
  const { companyProfile, updateCompanyProfile } = useEmployerData();

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Company Profile"
        subtitle="Manage how your company appears to job seekers."
      />

      <Card hover={false} className="p-6 md:p-8 max-w-2xl">
        <CompanyProfileForm profile={companyProfile} onSave={updateCompanyProfile} />
      </Card>
    </>
  );
}
