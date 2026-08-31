import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import Card from '../../components/common/Card.jsx';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import Checkbox from '../../components/common/Checkbox.jsx';
import { useAuth } from '../../lib/auth/AuthContext.jsx';

export default function SettingsPage() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountSaved, setAccountSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    jobMatches: true,
    statusUpdates: true,
  });

  const handleAccountSave = (event) => {
    event.preventDefault();
    if (!email.trim() && !password) return;
    setAccountSaved(true);
    setPassword('');
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Settings"
        subtitle="Manage your account and notification preferences."
      />

      <div className="space-y-6">
        <Card hover={false} className="p-6">
          <h2 className="text-lg font-bold text-brand-white">Account</h2>
          <p className="mt-1 text-sm text-brand-muted">Update your email or password.</p>
          <form onSubmit={handleAccountSave} className="mt-5 space-y-4 max-w-md">
            <Input
              id="settings-email"
              name="email"
              type="email"
              label="New email address"
              icon={Mail}
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setAccountSaved(false);
              }}
            />
            <Input
              id="settings-password"
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
              id="notify-matches"
              label="Email me about new job matches"
              checked={notifications.jobMatches}
              onChange={(event) =>
                setNotifications((current) => ({ ...current, jobMatches: event.target.checked }))
              }
            />
            <Checkbox
              id="notify-status"
              label="Email me application status updates"
              checked={notifications.statusUpdates}
              onChange={(event) =>
                setNotifications((current) => ({ ...current, statusUpdates: event.target.checked }))
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
      </div>
    </>
  );
}
