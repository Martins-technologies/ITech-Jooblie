import { useEffect, useState } from 'react';
import { FileText, Mail, MapPin, Phone, X } from 'lucide-react';
import { EMPLOYER_PIPELINE_STAGES } from '../../data/pipelineStages.js';
import Button from '../common/Button.jsx';
import Select from '../common/Select.jsx';
import ApplicantStageBadge from './ApplicantStageBadge.jsx';

const stageOptions = EMPLOYER_PIPELINE_STAGES.map((stage) => ({ value: stage, label: stage }));

export default function ApplicantProfileDrawer({ applicant, onClose, onStageChange, onNotesChange }) {
  const [notes, setNotes] = useState(applicant?.notes || '');

  useEffect(() => {
    setNotes(applicant?.notes || '');
  }, [applicant]);

  if (!applicant) return null;

  const handleNotesBlur = () => {
    if (notes !== applicant.notes) {
      onNotesChange?.(applicant.id, notes);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close profile"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <aside className="relative flex h-full w-full max-w-lg flex-col bg-brand-bg shadow-card sm:max-w-md lg:max-w-lg">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div>
            <h2 className="text-lg font-bold text-brand-white">{applicant.name}</h2>
            <ApplicantStageBadge stage={applicant.stage} />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-brand-white hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-brand-accent"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-muted">
              Contact
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-brand-white">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-accent" />
                {applicant.email}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-accent" />
                {applicant.phone}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-accent" />
                {applicant.location}
              </li>
            </ul>
          </section>

          {applicant.resumeFilename ? (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-muted">
                Resume
              </h3>
              <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-brand-card/50 p-3">
                <span className="flex items-center gap-2 text-sm text-brand-white">
                  <FileText className="h-4 w-4 text-brand-accent" />
                  {applicant.resumeFilename}
                </span>
                <Button variant="outline" className="px-3 py-1.5 text-xs">
                  View Resume
                </Button>
              </div>
            </section>
          ) : null}

          {applicant.skills?.length > 0 ? (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-muted">
                Skills
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {applicant.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-xs font-medium text-brand-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {applicant.experience?.length > 0 ? (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-muted">
                Work Experience
              </h3>
              <div className="mt-3 space-y-4">
                {applicant.experience.map((exp) => (
                  <div key={exp.id} className="rounded-lg border border-white/10 bg-brand-card/30 p-3">
                    <p className="font-semibold text-brand-white">{exp.title}</p>
                    <p className="text-sm text-brand-muted">
                      {exp.company} · {exp.dates}
                    </p>
                    {exp.description ? (
                      <p className="mt-1 text-sm text-brand-muted">{exp.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {applicant.education?.length > 0 ? (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-muted">
                Education
              </h3>
              <div className="mt-3 space-y-3">
                {applicant.education.map((edu) => (
                  <div key={edu.id} className="rounded-lg border border-white/10 bg-brand-card/30 p-3">
                    <p className="font-semibold text-brand-white">{edu.school}</p>
                    <p className="text-sm text-brand-muted">
                      {edu.field} · {edu.dates}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-muted">
              Pipeline Stage
            </h3>
            <div className="mt-3">
              <Select
                id="applicant-stage"
                name="stage"
                label="Change stage"
                value={applicant.stage}
                onChange={(event) => onStageChange?.(applicant.id, event.target.value)}
                options={stageOptions}
              />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-muted">
              Recruiter Notes
            </h3>
            <textarea
              id="applicant-notes"
              rows={4}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              onBlur={handleNotesBlur}
              placeholder="Private notes about this candidate..."
              className="mt-3 w-full rounded-lg border border-white/10 bg-brand-card/50 px-4 py-2.5 text-sm text-brand-white placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </section>
        </div>
      </aside>
    </div>
  );
}
