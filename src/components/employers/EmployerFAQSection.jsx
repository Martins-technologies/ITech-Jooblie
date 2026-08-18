import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { employerFaqs } from '../../data/employersPage.js';
import SectionHeading from '../common/SectionHeading.jsx';
import Card from '../common/Card.jsx';

export default function EmployerFAQSection() {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="bg-brand-bg pb-8">
      <div className="container-page">
        <SectionHeading title="Frequently Asked Questions" />
        <div className="grid gap-4 md:grid-cols-2">
          {employerFaqs.map((item) => {
            const Icon = item.icon;
            const isOpen = openId === item.id;
            return (
              <Card key={item.id} hover={false} className="overflow-hidden">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 p-5 text-left"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                >
                  <Icon className="h-5 w-5 shrink-0 text-brand-accent" />
                  <span className="flex-1 font-semibold text-brand-white">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-brand-accent transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen ? (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-brand-muted">
                    {item.answer}
                  </p>
                ) : null}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
