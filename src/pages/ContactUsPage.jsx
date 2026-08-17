import ContactHero from '../components/contact/ContactHero.jsx';
import HowCanWeHelp from '../components/contact/HowCanWeHelp.jsx';
import OfficeDetails from '../components/contact/OfficeDetails.jsx';
import LetsConnectBanner from '../components/contact/LetsConnectBanner.jsx';

export default function ContactUsPage() {
  return (
    <div className="bg-brand-bg">
      <ContactHero />
      <HowCanWeHelp />
      <OfficeDetails />
      <LetsConnectBanner />
    </div>
  );
}
