import { useState } from 'react';

const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function useContactForm(onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFormError('');
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your full name.';
    if (!values.email.trim()) next.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!values.subject) next.subject = 'Please select a subject.';
    if (!values.message.trim()) next.message = 'Please enter a message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setFormError(
      'The shared Jooblie API does not include a contact endpoint, so this message was not sent.',
    );
    setSubmitted(false);
    onSubmit?.(values);
    setLoading(false);
  };

  return { values, errors, submitted, formError, loading, update, handleSubmit };
}
