import { useNavigate } from 'react-router-dom';
import { images } from '../data/images.js';
import SignInForm from '../components/sections/sign-in/SignInForm.jsx';
import SignInPanel from '../components/sections/sign-in/SignInPanel.jsx';

export default function SignInPage() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-brand-bg">
      <img
        src={images.signInHero}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[28%_center]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#070b16]/80 via-[#0a1128]/55 to-[#070b16]/95"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-[#070b16] via-[#0a1128]/80 to-transparent lg:w-[58%]"
        aria-hidden="true"
      />

      <div className="relative grid min-h-[calc(100vh-72px)] gap-0 lg:grid-cols-2">
        <SignInPanel />
        <div className="relative flex items-center justify-center px-6 py-10 sm:px-10 lg:justify-end lg:pr-12 lg:pl-8 xl:pr-16">
          <SignInForm onSuccess={() => navigate('/')} />
        </div>
      </div>
    </section>
  );
}
