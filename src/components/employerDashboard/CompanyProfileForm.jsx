import { useState } from 'react';
import { Building2, Globe, MapPin } from 'lucide-react';
import { jobCategories } from '../../data/jobCategories.js';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';
import Select from '../common/Select.jsx';

const industryOptions = [
  { value: '', label: 'Select industry' },
  ...jobCategories.map((item) => ({ value: item.id, label: item.title })),
];

const sizeOptions = [
  { value: '', label: 'Select company size' },
  { value: '1-10', label: '1–10 employees' },
  { value: '11-50', label: '11–50 employees' },
  { value: '51-200', label: '51–200 employees' },
  { value: '201-500', label: '201–500 employees' },
  { value: '500+', label: '500+ employees' },
];

export default function CompanyProfileForm({ profile, onSave }) {
  const [form, setForm] = useState({ ...profile });
  const [saved, setSaved] = useState(false);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setSaved(false);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setForm((current) => ({ ...current, logoFilename: file.name }));
      setSaved(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave?.(form);
    setSaved(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="company-name"
        name="name"
        label="Company Name"
        required
        icon={Building2}
        value={form.name}
        onChange={updateField('name')}
      />
      <div>
        <label htmlFor="company-logo" className="mb-1.5 block text-sm font-medium text-brand-white">
          Company Logo
        </label>
        <input
          id="company-logo"
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="w-full rounded-lg border border-white/10 bg-brand-card/50 px-4 py-2.5 text-sm text-brand-muted file:mr-4 file:rounded-md file:border-0 file:bg-brand-accent/20 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-brand-accent"
        />
        {form.logoFilename ? (
          <p className="mt-1 text-xs text-brand-muted">Selected: {form.logoFilename}</p>
        ) : null}
      </div>
      <Select
        id="company-industry"
        name="industry"
        label="Industry"
        value={form.industry}
        onChange={updateField('industry')}
        options={industryOptions}
      />
      <Select
        id="company-size"
        name="size"
        label="Company Size"
        value={form.size}
        onChange={updateField('size')}
        options={sizeOptions}
      />
      <Input
        id="company-website"
        name="website"
        label="Website"
        icon={Globe}
        placeholder="https://yourcompany.com"
        value={form.website}
        onChange={updateField('website')}
      />
      <Input
        id="company-location"
        name="location"
        label="Headquarters Location"
        icon={MapPin}
        placeholder="City, province"
        value={form.location}
        onChange={updateField('location')}
      />
      <div>
        <label
          htmlFor="company-description"
          className="mb-1.5 block text-sm font-medium text-brand-white"
        >
          Company Description
        </label>
        <textarea
          id="company-description"
          rows={5}
          value={form.description}
          onChange={updateField('description')}
          placeholder="Tell candidates about your company..."
          className="w-full rounded-lg border border-white/10 bg-brand-card/50 px-4 py-2.5 text-sm text-brand-white placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent"
        />
      </div>
      {saved ? (
        <p className="text-sm text-status-success">Company profile saved successfully.</p>
      ) : null}
      <Button type="submit" variant="accent">
        Save Changes
      </Button>
    </form>
  );
}
