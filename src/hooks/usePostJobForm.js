import { useState } from 'react';

const initialValues = {
  title: '',
  location: '',
  jobType: '',
  salaryRange: '',
  company: '',
};

export default function usePostJobForm(onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.title.trim()) next.title = 'Please enter a job title.';
    if (!values.location.trim()) next.location = 'Please enter a location.';
    if (!values.jobType) next.jobType = 'Please select a job type.';
    if (!values.salaryRange) next.salaryRange = 'Please select a salary range.';
    if (!values.company.trim()) next.company = 'Please enter your company name.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    console.log(values);
    onSubmit?.(values);
    setSubmitted(true);
    setValues(initialValues);
  };

  const resetSubmitted = () => setSubmitted(false);

  return { values, errors, submitted, update, handleSubmit, resetSubmitted };
}
