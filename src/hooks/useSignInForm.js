import { useState } from 'react';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^[a-zA-Z0-9._-]{3,30}$/;

const initialValues = {
  role: 'seeker',
  username: '',
  email: '',
  password: '',
  remember: false,
};

export default function useSignInForm(onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const setRole = (role) => {
    setValues((current) => ({ ...current, role }));
  };

  const validate = () => {
    const next = {};
    const username = values.username.trim();
    const email = values.email.trim();

    if (!username) next.username = 'Please enter your username.';
    else if (!USERNAME_PATTERN.test(username)) {
      next.username =
        'Username must be 3–30 characters and can include letters, numbers, dots, hyphens, and underscores.';
    }

    if (!email) next.email = 'Please enter your email address.';
    else if (!EMAIL_PATTERN.test(email)) {
      next.email = 'Please enter a valid email address.';
    }

    if (!values.password) next.password = 'Please enter your password.';
    else if (values.password.length < 8) {
      next.password = 'Password must be at least 8 characters.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    const payload = {
      role: values.role,
      username: values.username.trim(),
      email: values.email.trim(),
      remember: values.remember,
    };
    console.log(payload);
    onSubmit?.(payload);
  };

  return { values, errors, update, setRole, handleSubmit };
}
