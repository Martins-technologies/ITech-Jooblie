import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { getMyCompanies, getServiceCareCategories, createEmployerJob } from '../lib/jobs.js';
import { useAuth } from '../lib/auth/AuthContext.jsx';
import Card from '../components/common/Card.jsx';
import Button from '../components/common/Button.jsx';
import Checkbox from '../components/common/Checkbox.jsx';

const fieldClass =
  'w-full rounded-lg border border-white/10 bg-[#0c1220] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-brand-muted focus:border-brand-accent transition-colors';

const PROVINCE_OPTIONS = [
  { value: 'ON', label: 'Ontario' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'QC', label: 'Quebec' },
  { value: 'AB', label: 'Alberta' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
];

export default function CreateJobPostPage() {
  const { token, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // Form State
  const [form, setForm] = useState({
    company_id: '',
    category_id: '',
    title: '',
    description: '',
    city: '',
    province: 'ON',
    is_remote: false,
    employment_type: 'full-time',
    salary_currency: 'CAD',
    salary_min: '',
    salary_max: '',
    salary_period: 'yearly',
  });

  // Redirect to Sign In if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Load companies & categories
  useEffect(() => {
    async function loadOptions() {
      if (!isAuthenticated || !token) return;
      try {
        setLoading(true);
        const [rawCompanies, rawCategories] = await Promise.all([
          getMyCompanies(token).catch(() => []),
          getServiceCareCategories(),
        ]);

        const resolvedCompanies = rawCompanies && rawCompanies.length > 0
          ? rawCompanies
          : [{ id: 'mock-co-123', name: 'My IT Consulting Firm' }];

        setCompanies(resolvedCompanies);
        setCategories(rawCategories || []);
        
        // Default select choices
        setForm((prev) => ({
          ...prev,
          company_id: resolvedCompanies[0]?.id || '',
          category_id: rawCategories[0]?.id || '',
        }));
      } catch (err) {
        setError(err.message || 'Failed to load form dependencies.');
      } finally {
        setLoading(false);
      }
    }
    loadOptions();
  }, [token, isAuthenticated]);

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isAuthenticated || !token) {
      alert('Please sign in to post.');
      return;
    }

    if (!form.title.trim()) {
      setError('Please enter a job title.');
      return;
    }
    if (!form.description.trim()) {
      setError('Please enter a job description.');
      return;
    }
    if (!form.city.trim()) {
      setError('Please enter a city.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    const payload = {
      ...form,
      category_id: Number(form.category_id),
      salary_min: Number(form.salary_min) || 0,
      salary_max: Number(form.salary_max) || 0,
    };

    try {
      const res = await createEmployerJob(payload, token);
      setSuccessMessage(
        `Job submitted successfully. Status: ${res?.status || 'pending review'}.`
      );
      // Reset form
      setForm((prev) => ({
        ...prev,
        title: '',
        description: '',
        city: '',
        salary_min: '',
        salary_max: '',
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'Failed to submit job posting. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-brand-bg px-4 py-24 text-brand-white">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-accent border-t-transparent mx-auto"></div>
          <p className="mt-4 text-brand-muted">Loading posting form...</p>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-brand-bg py-8 min-h-[calc(100vh-72px)] text-brand-white">
      <div className="container-page max-w-2xl">
        <Link
          to="/recruiter"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-brand-accentHover mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Recruiter Dashboard
        </Link>

        <h1 className="text-3xl font-extrabold text-brand-white mb-2 tracking-tight">Post an IT Job</h1>
        <p className="text-sm text-brand-muted mb-8">
          Fill in the details below to submit a new job posting for review.
        </p>

        {successMessage && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-400">
            <CheckCircle className="h-5 w-5 shrink-0" />
            <p>{successMessage}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <Card hover={false} className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Company selection */}
              <div className="flex flex-col">
                <label htmlFor="company_id" className="mb-1.5 text-sm font-medium text-white/90">
                  Select Company
                </label>
                <select
                  id="company_id"
                  value={form.company_id}
                  onChange={handleChange('company_id')}
                  className={fieldClass}
                >
                  {companies.map((co) => (
                    <option key={co.id} value={co.id}>
                      {co.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category selection */}
              <div className="flex flex-col">
                <label htmlFor="category_id" className="mb-1.5 text-sm font-medium text-white/90">
                  Category
                </label>
                <select
                  id="category_id"
                  value={form.category_id}
                  onChange={handleChange('category_id')}
                  className={fieldClass}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Title */}
            <div className="flex flex-col">
              <label htmlFor="title" className="mb-1.5 text-sm font-medium text-white/90">
                Job Title
              </label>
              <input
                id="title"
                type="text"
                value={form.title}
                onChange={handleChange('title')}
                placeholder="e.g. Senior Full-Stack React Developer"
                className={fieldClass}
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-1.5 text-sm font-medium text-white/90">
                Job Description
              </label>
              <textarea
                id="description"
                rows={8}
                value={form.description}
                onChange={handleChange('description')}
                placeholder="Provide details about requirements, skills, responsibilities, and benefits..."
                className={`${fieldClass} resize-none`}
                required
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* City */}
              <div className="flex flex-col">
                <label htmlFor="city" className="mb-1.5 text-sm font-medium text-white/90">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  value={form.city}
                  onChange={handleChange('city')}
                  placeholder="e.g. Toronto"
                  className={fieldClass}
                  required
                />
              </div>

              {/* Province selection */}
              <div className="flex flex-col">
                <label htmlFor="province" className="mb-1.5 text-sm font-medium text-white/90">
                  Province
                </label>
                <select
                  id="province"
                  value={form.province}
                  onChange={handleChange('province')}
                  className={fieldClass}
                >
                  {PROVINCE_OPTIONS.map((prov) => (
                    <option key={prov.value} value={prov.value}>
                      {prov.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Employment type */}
              <div className="flex flex-col">
                <label htmlFor="employment_type" className="mb-1.5 text-sm font-medium text-white/90">
                  Employment Type
                </label>
                <select
                  id="employment_type"
                  value={form.employment_type}
                  onChange={handleChange('employment_type')}
                  className={fieldClass}
                >
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              {/* Remote option */}
              <div className="flex items-center pt-8">
                <Checkbox
                  id="is_remote"
                  label="This is a fully remote position"
                  checked={form.is_remote}
                  onChange={handleChange('is_remote')}
                />
              </div>
            </div>

            {/* Salary details */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-base font-bold text-white mb-4">Salary and Compensation</h3>
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col">
                  <label htmlFor="salary_min" className="mb-1.5 text-sm font-medium text-white/90">
                    Minimum Salary
                  </label>
                  <input
                    id="salary_min"
                    type="number"
                    value={form.salary_min}
                    onChange={handleChange('salary_min')}
                    placeholder="e.g. 90000"
                    className={fieldClass}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="salary_max" className="mb-1.5 text-sm font-medium text-white/90">
                    Maximum Salary
                  </label>
                  <input
                    id="salary_max"
                    type="number"
                    value={form.salary_max}
                    onChange={handleChange('salary_max')}
                    placeholder="e.g. 120000"
                    className={fieldClass}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="salary_period" className="mb-1.5 text-sm font-medium text-white/90">
                    Frequency
                  </label>
                  <select
                    id="salary_period"
                    value={form.salary_period}
                    onChange={handleChange('salary_period')}
                    className={fieldClass}
                  >
                    <option value="yearly">Per Year</option>
                    <option value="hourly">Per Hour</option>
                    <option value="monthly">Per Month</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-accent text-sm font-bold text-white transition-colors hover:bg-brand-accentHover disabled:opacity-50"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              {submitting ? 'Submitting...' : 'Submit Job Post'}
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
