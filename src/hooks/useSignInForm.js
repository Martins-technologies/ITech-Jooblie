import { useState } from 'react';
import { useAuth } from '../lib/auth/AuthContext.jsx';

const initialValues = {
  role: 'seeker',
  username: '',
  password: '',
  remember: false,
};

export default function useSignInForm(onSubmit) {
  const { signIn } = useAuth();
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
  };

  const setRole = (role) => {
    setValues((current) => ({ ...current, role }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await signIn(values.username, values.password, values.role);
      onSubmit?.(values.role);
    } finally {
      setLoading(false);
    }
  };

  return { values, loading, update, setRole, handleSubmit };
}
