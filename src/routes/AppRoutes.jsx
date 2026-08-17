import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import HomePage from '../pages/HomePage.jsx';
import BrowseJobsPage from '../pages/BrowseJobsPage.jsx';
import EmployersPage from '../pages/EmployersPage.jsx';
import AboutUsPage from '../pages/AboutUsPage.jsx';
import ContactUsPage from '../pages/ContactUsPage.jsx';
import SignInPage from '../pages/SignInPage.jsx';
import PostJobPage from '../pages/PostJobPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

/**
 * Central route table. Add new pages here, then (optionally) in data/navLinks.js.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<BrowseJobsPage />} />
        <Route path="/employers" element={<EmployersPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/post-job" element={<PostJobPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
