import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../lib/auth/AuthContext.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';

export default function RequireAuth({ role = 'seeker' }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-bg text-brand-white">
        <LoadingSpinner label="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  const isEmployer = user?.role === 'employer' || user?.role === 'recruiter' || user?.apiRole === 'admin';

  if (role === 'seeker' && isEmployer) {
    return <Navigate to="/employer-dashboard/overview" replace />;
  }

  if (role === 'employer' && !isEmployer) {
    return <Navigate to="/dashboard/overview" replace />;
  }

  return <Outlet />;
}
