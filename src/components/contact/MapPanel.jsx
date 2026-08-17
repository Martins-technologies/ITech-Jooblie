import { images } from '../../data/images.js';
import { officeAddress } from '../../data/officeInfo.js';
import { MapPin } from 'lucide-react';
import Card from '../common/Card.jsx';

export default function MapPanel() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-brand-border/40">
      <img
        src={images.contactOffice}
        alt="Toronto office location for iTech Jobline"
        className="h-72 w-full object-cover md:h-80"
      />
      <Card hover={false} className="absolute bottom-4 left-4 right-4 p-4 md:right-auto md:max-w-sm">
        <p className="inline-flex items-center gap-2 font-semibold text-brand-white">
          <MapPin className="h-4 w-4 text-brand-accent" />
          {officeAddress.name}
        </p>
        <p className="mt-1 text-sm text-brand-muted">{officeAddress.line}</p>
      </Card>
    </div>
  );
}
