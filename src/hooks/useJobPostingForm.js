import { useState } from 'react';

export const jobPostingInitialValues = {
  title: '',
  company: '',
  location: '',
  category: '',
  jobType: '',
  salaryRange: '',
  description: '',
};

export default function useJobPostingForm({ initialValues, onSubmit, onSaveDraft }) {
  const [values, setValues] = useState(initialValues || jobPostingInitialValues);
  const [errors, setErrors] = useState({});

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const setFormValues = (nextValues) => {
    setValues({ ...jobPostingInitialValues, ...nextValues });
    setErrors({});
  };

  const validate = () => {
    const next = {};
    if (!values.title.trim()) next.title = 'Please enter a job title.';
    if (!values.company.trim()) next.company = 'Please enter your company name.';
    if (!values.location.trim()) next.location = 'Please enter a location.';
    if (!values.category) next.category = 'Please select a job category.';
    if (!values.jobType) next.jobType = 'Please select an employment type.';
    if (!values.salaryRange) next.salaryRange = 'Please select a salary range.';
    if (!values.description.trim()) next.description = 'Please enter a job description.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit?.(values);
  };

  const handleSaveDraft = (event) => {
    event.preventDefault();
    if (!values.title.trim()) {
      setErrors({ title: 'Please enter a job title to save as draft.' });
      return;
    }
    onSaveDraft?.(values);
  };

  return { values, errors, update, setFormValues, handleSubmit, handleSaveDraft };
}
