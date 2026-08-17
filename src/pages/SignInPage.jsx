import { useNavigate } from 'react-router-dom';
import SignInForm from '../components/sections/sign-in/SignInForm.jsx';
import SignInPanel from '../components/sections/sign-in/SignInPanel.jsx';

export default function SignInPage() {
  const navigate = useNavigate();

  return (
    <section className="grid min-h-[calc(100vh-72px)] bg-brand-bg lg:grid-cols-2">
      <SignInPanel />
      <div className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
        <SignInForm onSuccess={() => navigate('/')} />
      </div>
    </section>
  );
}
