import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../lib/auth/AuthContext.jsx';

export default function RequireAuth({ role = 'seeker' }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-bg text-brand-white">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-brand-accent border-t-transparent" />
          <p className="mt-4 text-brand-muted">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  const isEmployer = user?.role === 'employer' || user?.role === 'recruiter';

  if (role === 'seeker' && isEmployer) {
    return <Navigate to="/employer-dashboard/overview" replace />;
  }

  if (role === 'employer' && !isEmployer) {
    return <Navigate to="/dashboard/overview" replace />;
  }

  return <Outlet />;
}
