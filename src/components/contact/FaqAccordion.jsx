import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { faqItems } from '../../data/faqItems.js';
import Accordion from '../common/Accordion.jsx';
import Card from '../common/Card.jsx';

export default function FaqAccordion() {
  const [openId, setOpenId] = useState(faqItems[0]?.id ?? null);

  return (
    <Card hover={false} className="mt-5 p-5">
      <h3 className="mb-4 font-semibold text-brand-white">Frequently asked questions</h3>
      <Accordion
        items={faqItems}
        openId={openId}
        onToggle={(id) => setOpenId((current) => (current === id ? null : id))}
      />
      <p className="mt-4 text-sm text-brand-muted">
        Have more questions? We&apos;re happy to help.{' '}
        <Link to="/contact" className="font-semibold text-brand-accent">
          Contact us <ArrowRight className="inline h-3.5 w-3.5" />
        </Link>
      </p>
    </Card>
  );
}
