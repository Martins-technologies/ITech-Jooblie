import {
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  PlusCircle,
  Settings,
} from 'lucide-react';

export const employerWorkspaceLinks = [
  { to: '/employer-dashboard/overview', label: 'Overview', icon: LayoutDashboard },
  { to: '/employer-dashboard/job-postings', label: 'Job Postings', icon: Briefcase },
  { to: '/employer-dashboard/post-a-job', label: 'Post a Job', icon: PlusCircle },
  { to: '/employer-dashboard/applicants', label: 'Applicants', icon: FileText },
  { to: '/employer-dashboard/company-profile', label: 'Company Profile', icon: Building2 },
];

export const employerSidebarConfig = {
  workspaceLinks: employerWorkspaceLinks,
  settingsPath: '/employer-dashboard/settings',
  roleLabel: 'Employer',
  showCommunity: false,
};

export const seekerSidebarConfig = {
  settingsPath: '/dashboard/settings',
  roleLabel: 'Job Seeker',
  showCommunity: true,
};
