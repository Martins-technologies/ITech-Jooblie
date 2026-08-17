import { Send } from 'lucide-react';
import { subjectOptions } from '../../data/officeInfo.js';
import useContactForm from '../../hooks/useContactForm.js';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';
import TextArea from '../common/TextArea.jsx';
import Select from '../common/Select.jsx';
import Card from '../common/Card.jsx';

export default function ContactForm() {
  const { values, errors, submitted, update, handleSubmit } = useContactForm();

  return (
    <Card
      hover={false}
      className="relative border-white/10 bg-[#111827]/90 p-6 shadow-[0_0_48px_-10px_rgba(47,143,255,0.45)] backdrop-blur-md md:p-8"
      id="contact-form"
    >
      <h2 className="mb-6 text-xl font-bold text-brand-white">Send us a Message</h2>
      {submitted ? (
        <p className="rounded-lg border border-brand-accent/40 bg-brand-accent/10 p-4 text-sm text-brand-white">
          Thanks for reaching out. We received your message and will reply within one business day.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            id="contact-name"
            label="Full Name"
            placeholder="Enter your full name"
            value={values.name}
            onChange={update('name')}
            error={errors.name}
            autoComplete="name"
          />
          <Input
            id="contact-email"
            type="email"
            label="Email"
            placeholder="Enter your email address"
            value={values.email}
            onChange={update('email')}
            error={errors.email}
            autoComplete="email"
          />
          <Select
            id="contact-subject"
            label="Subject"
            value={values.subject}
            onChange={update('subject')}
            error={errors.subject}
            options={subjectOptions}
          />
          <TextArea
            id="contact-message"
            label="Message"
            placeholder="How can we help you?"
            value={values.message}
            onChange={update('message')}
            error={errors.message}
          />
          <Button type="submit" variant="primary" icon={Send} className="w-full">
            Send Message
          </Button>
        </form>
      )}
    </Card>
  );
}
