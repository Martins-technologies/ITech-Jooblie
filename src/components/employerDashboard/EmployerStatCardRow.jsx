import StatCardRow from '../dashboard/StatCardRow.jsx';

export default function EmployerStatCardRow({ stats }) {
  const items = [
    { key: 'activePostings', label: 'Active Job Postings', value: stats.activePostings },
    { key: 'totalApplicants', label: 'Total Applicants', value: stats.totalApplicants },
    { key: 'interviews', label: 'Interviews Scheduled', value: stats.interviews },
    { key: 'filled', label: 'Positions Filled', value: stats.filled },
  ];

  return <StatCardRow stats={stats} items={items} />;
}
