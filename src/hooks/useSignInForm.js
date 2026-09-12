import { useState } from 'react';
import { useAuth } from '../lib/auth/AuthContext.jsx';
import { formatApiError, isValidEmail } from '../lib/formValidation.js';

const initialValues = {
  mode: 'signin',
  role: 'seeker',
  email: '',
  password: '',
  name: '',
  company_name: '',
  company_website: '',
  company_registration_number: '',
  remember: false,
};

export default function useSignInForm(onSubmit) {
  const { signIn, signUp } = useAuth();
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    setError('');
    setNotice('');
  };

  const setRole = (role) => {
    setValues((current) => ({ ...current, role }));
    setError('');
  };

  const setMode = (mode) => {
    setValues((current) => ({ ...current, mode }));
    setError('');
    setNotice('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setNotice('');

    try {
      if (values.mode === 'signin' && !isValidEmail(values.email)) {
        throw new Error('Enter a valid email address.');
      }
      if (values.mode === 'signin' && !values.password) {
        throw new Error('Enter your password.');
      }

      if (values.mode === 'signup') {
        if (!isValidEmail(values.email)) {
          throw new Error('Enter a valid email address.');
        }
        if (values.password.length < 8) {
          throw new Error('Password must be at least 8 characters.');
        }
        if (!values.name.trim() || values.name.trim().length < 2) {
          throw new Error('Please enter your full name.');
        }
        if (values.role === 'employer') {
          if (!values.company_name.trim()) throw new Error('Company name is required.');
          if (!values.company_website.trim()) throw new Error('Company website is required.');
          if (!values.company_registration_number.trim()) {
            throw new Error('Company registration number is required.');
          }
        }
        const res = await signUp({
          email: values.email.trim(),
          password: values.password,
          name: values.name.trim(),
          role: values.role,
          company_name: values.company_name.trim(),
          company_website: values.company_website.trim(),
          company_registration_number: values.company_registration_number.trim(),
        });
        if (res.confirmationRequired || !res.session) {
          setNotice('Account created. Check your email to confirm before signing in.');
          setValues((current) => ({ ...current, mode: 'signin', password: '' }));
          return;
        }
        onSubmit?.(res.session.user.role);
        return;
      }

      const session = await signIn(values.email.trim(), values.password);
      onSubmit?.(session.user.role);
    } catch (err) {
      setError(formatApiError(err, 'Unable to complete that request.'));
    } finally {
      setLoading(false);
    }
  };

  return { values, loading, error, notice, update, setRole, setMode, handleSubmit };
}
