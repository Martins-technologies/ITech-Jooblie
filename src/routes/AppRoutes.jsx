import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx';
import RequireAuth from '../components/dashboard/RequireAuth.jsx';
import { DashboardDataProvider } from '../context/DashboardDataContext.jsx';
import HomePage from '../pages/HomePage.jsx';
import JobsPage from '../pages/JobsPage.jsx';
import JobDetailsPage from '../pages/JobDetailsPage.jsx';
import EmployersPage from '../pages/EmployersPage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import ContactUsPage from '../pages/ContactUsPage.jsx';
import SignInPage from '../pages/SignInPage.jsx';
import PostJobPage from '../pages/PostJobPage.jsx';
import CreateJobPostPage from '../pages/CreateJobPostPage.jsx';
import OverviewPage from '../pages/dashboard/OverviewPage.jsx';
import FindJobsPage from '../pages/dashboard/FindJobsPage.jsx';
import MyApplicationsPage from '../pages/dashboard/MyApplicationsPage.jsx';
import SavedJobsPage from '../pages/dashboard/SavedJobsPage.jsx';
import MyProfilePage from '../pages/dashboard/MyProfilePage.jsx';
import SettingsPage from '../pages/dashboard/SettingsPage.jsx';
import EmployerOverviewPage from '../pages/employerDashboard/EmployerOverviewPage.jsx';
import JobPostingsPage from '../pages/employerDashboard/JobPostingsPage.jsx';
import PostJobDashboardPage from '../pages/employerDashboard/PostJobDashboardPage.jsx';
import JobApplicantsPage from '../pages/employerDashboard/JobApplicantsPage.jsx';
import AllApplicantsPage from '../pages/employerDashboard/AllApplicantsPage.jsx';
import CompanyProfilePage from '../pages/employerDashboard/CompanyProfilePage.jsx';
import EmployerSettingsPage from '../pages/employerDashboard/EmployerSettingsPage.jsx';
import { EmployerDataProvider } from '../context/EmployerDataContext.jsx';
import RecruiterHome from '../pages/recruiter/RecruiterHome.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

/**
 * Central route table. Add new pages here, then (optionally) in data/navLinks.js.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
        <Route path="/employers" element={<EmployersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/post-job" element={<PostJobPage />} />
        <Route path="/post-job/create" element={<CreateJobPostPage />} />
        <Route path="/recruiter" element={<RecruiterHome />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<RequireAuth role="seeker" />}>
        <Route
          element={
            <DashboardDataProvider>
              <DashboardLayout variant="seeker" />
            </DashboardDataProvider>
          }
        >
          <Route path="/dashboard" element={<Navigate to="/dashboard/overview" replace />} />
          <Route path="/dashboard/overview" element={<OverviewPage />} />
          <Route path="/dashboard/find-jobs" element={<FindJobsPage />} />
          <Route path="/dashboard/applications" element={<MyApplicationsPage />} />
          <Route path="/dashboard/saved-jobs" element={<SavedJobsPage />} />
          <Route path="/dashboard/profile" element={<MyProfilePage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route element={<RequireAuth role="employer" />}>
        <Route
          element={
            <EmployerDataProvider>
              <DashboardLayout variant="employer" />
            </EmployerDataProvider>
          }
        >
          <Route
            path="/employer-dashboard"
            element={<Navigate to="/employer-dashboard/overview" replace />}
          />
          <Route path="/employer-dashboard/overview" element={<EmployerOverviewPage />} />
          <Route path="/employer-dashboard/job-postings" element={<JobPostingsPage />} />
          <Route path="/employer-dashboard/post-a-job" element={<PostJobDashboardPage />} />
          <Route
            path="/employer-dashboard/job-postings/:jobId/applicants"
            element={<JobApplicantsPage />}
          />
          <Route path="/employer-dashboard/applicants" element={<AllApplicantsPage />} />
          <Route path="/employer-dashboard/company-profile" element={<CompanyProfilePage />} />
          <Route path="/employer-dashboard/settings" element={<EmployerSettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
