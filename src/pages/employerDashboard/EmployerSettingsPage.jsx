import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import Card from '../../components/common/Card.jsx';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import Checkbox from '../../components/common/Checkbox.jsx';
import { useAuth } from '../../lib/auth/AuthContext.jsx';

export default function EmployerSettingsPage() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountSaved, setAccountSaved] = useState(false);
  const [accountError, setAccountError] = useState('');
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [notifications, setNotifications] = useState({
    newApplicants: true,
    weeklySummary: true,
  });

  const handleAccountSave = (event) => {
    event.preventDefault();
    setAccountSaved(false);
    setAccountError(
      'Email and password changes are not available on the shared API.',
    );
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const handleDeleteAccount = () => {
    setAccountError('Deleting a company account is not available on the shared API.');
  };

  return (
    <>
      <DashboardTopBanner
        eyebrow="IT Jobs Jobline Dashboard"
        title="Settings"
        subtitle="Manage your account, notifications, and team preferences."
      />

      <div className="space-y-6">
        <Card hover={false} className="p-6">
          <h2 className="text-lg font-bold text-brand-white">Account</h2>
          <p className="mt-1 text-sm text-brand-muted">Update your email or password.</p>
          <form onSubmit={handleAccountSave} className="mt-5 space-y-4 max-w-md">
            <Input
              id="employer-settings-email"
              name="email"
              type="email"
              label="New email address"
              icon={Mail}
              placeholder="you@company.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setAccountSaved(false);
              }}
            />
            <Input
              id="employer-settings-password"
              name="password"
              type="password"
              label="New password"
              icon={Lock}
              placeholder="At least 8 characters"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setAccountSaved(false);
              }}
            />
            {accountError ? <p className="text-sm text-red-400">{accountError}</p> : null}
            {accountSaved ? (
              <p className="text-sm text-status-success">Account settings updated.</p>
            ) : null}
            <Button type="submit" variant="accent">
              Save Account Changes
            </Button>
          </form>
        </Card>

        <Card hover={false} className="p-6">
          <h2 className="text-lg font-bold text-brand-white">Notifications</h2>
          <p className="mt-1 text-sm text-brand-muted">Choose what we email you about.</p>
          <div className="mt-5 space-y-4">
            <Checkbox
              id="notify-applicants"
              label="Email me when a candidate applies"
              checked={notifications.newApplicants}
              onChange={(event) =>
                setNotifications((current) => ({
                  ...current,
                  newApplicants: event.target.checked,
                }))
              }
            />
            <Checkbox
              id="notify-summary"
              label="Email me a weekly applicant summary"
              checked={notifications.weeklySummary}
              onChange={(event) =>
                setNotifications((current) => ({
                  ...current,
                  weeklySummary: event.target.checked,
                }))
              }
            />
          </div>
        </Card>

        <Card hover={false} className="p-6">
          <h2 className="text-lg font-bold text-brand-white">Sign Out</h2>
          <p className="mt-1 text-sm text-brand-muted">End your current session on this device.</p>
          <Button variant="outline" className="mt-4" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Card>

        <Card hover={false} className="border-red-400/20 p-6">
          <h2 className="text-lg font-bold text-red-400">Danger Zone</h2>
          <p className="mt-1 text-sm text-brand-muted">
            Permanently delete your company account and all associated data.
          </p>
          {confirmingDelete ? (
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => setConfirmingDelete(false)}>
                Cancel
              </Button>
              <Button
                variant="accent"
                className="bg-red-500 hover:bg-red-600"
                onClick={handleDeleteAccount}
              >
                Confirm Delete Company Account
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="mt-4 border-red-400/30 text-red-400 hover:bg-red-400/10"
              onClick={() => setConfirmingDelete(true)}
            >
              Delete Company Account
            </Button>
          )}
        </Card>
      </div>
    </>
  );
}
