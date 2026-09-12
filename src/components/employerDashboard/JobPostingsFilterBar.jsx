import { Search } from 'lucide-react';
import Input from '../common/Input.jsx';
import Select from '../common/Select.jsx';

const statusOptions = [
  { value: 'All', label: 'All Statuses' },
  { value: 'Active', label: 'Active' },
  { value: 'Pending Review', label: 'Pending Review' },
  { value: 'Closed', label: 'Closed' },
];

export default function JobPostingsFilterBar({ status, search, onStatusChange, onSearchChange }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex-1">
        <Input
          id="postings-search"
          name="search"
          label="Search by title"
          icon={Search}
          placeholder="Search job postings..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
      <div className="w-full sm:w-48">
        <Select
          id="postings-status"
          name="status"
          label="Status"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          options={statusOptions}
        />
      </div>
    </div>
  );
}
