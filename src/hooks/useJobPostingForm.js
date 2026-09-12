import { useCallback, useState } from 'react';
import { formatApiError } from '../lib/formValidation.js';
import { jobTypeOptions, salaryRangeOptions } from '../data/jobFilterOptions.js';

export const jobPostingInitialValues = {
  title: '',
  company: '',
  location: '',
  category: '',
  categoryId: '',
  jobType: '',
  salaryRange: '',
  description: '',
};

export default function useJobPostingForm({ initialValues, onSubmit, onSaveDraft }) {
  const [values, setValues] = useState(initialValues || jobPostingInitialValues);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFormError('');
  };

  const setFormValues = useCallback((nextValues) => {
    setValues({ ...jobPostingInitialValues, ...nextValues });
    setErrors({});
    setFormError('');
  }, []);

  const validate = () => {
    const next = {};
    if (!values.title.trim() || values.title.trim().length < 3) {
      next.title = 'Please enter a job title (at least 3 characters).';
    }
    if (!values.location.trim()) next.location = 'Please enter a location.';
    if (!values.categoryId && !values.category) next.category = 'Please select a job category.';
    if (!values.jobType) next.jobType = 'Please select an employment type.';
    if (!values.salaryRange) next.salaryRange = 'Please select a salary range.';
    if (!values.description.trim() || values.description.trim().length < 20) {
      next.description = 'Please enter a job description (at least 20 characters).';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setFormError('');
    try {
      await onSubmit?.(values);
    } catch (err) {
      setFormError(formatApiError(err, 'Unable to publish this job.'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveDraft = (event) => {
    event.preventDefault();
    setFormError(
      'Drafts are not supported by the shared API. Jobs are published immediately when you submit.',
    );
    onSaveDraft?.(values);
  };

  return {
    values,
    errors,
    formError,
    submitting,
    update,
    setFormValues,
    handleSubmit,
    handleSaveDraft,
    jobTypeOptions,
    salaryRangeOptions,
  };
}
