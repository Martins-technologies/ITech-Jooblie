import { useEffect, useState } from 'react';
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import ProfileCompletenessBar from '../../components/dashboard/ProfileCompletenessBar.jsx';
import Card from '../../components/common/Card.jsx';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import InlineNotice from '../../components/common/InlineNotice.jsx';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { useDashboardData } from '../../context/DashboardDataContext.jsx';
import { useAuth } from '../../lib/auth/AuthContext.jsx';
import { registerResume, updateAuthProfile } from '../../lib/jobs.js';
import { uploadResumeToStorage } from '../../lib/storage.js';
import { formatApiError, validateResumeFile, validateSeekerProfileForm } from '../../lib/formValidation.js';

export default function MyProfilePage() {
  const { profile, profileCompleteness, updateProfile, resumes, refreshDashboard, error, notice } =
    useDashboardData();
  const { token, user } = useAuth();
  const [form, setForm] = useState({ ...profile });
  const [skillInput, setSkillInput] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [resumeError, setResumeError] = useState('');
  const [resumeNotice, setResumeNotice] = useState('');
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    setForm({ ...profile });
  }, [profile]);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setSaved(false);
  };

  const addSkill = (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const skill = skillInput.trim();
    if (!skill || form.skills.includes(skill)) return;
    setForm((current) => ({ ...current, skills: [...current.skills, skill] }));
    setSkillInput('');
    setSaved(false);
  };

  const removeSkill = (skill) => {
    setForm((current) => ({
      ...current,
      skills: current.skills.filter((item) => item !== skill),
    }));
    setSaved(false);
  };

  const addExperience = () => {
    setForm((current) => ({
      ...current,
      experience: [
        ...current.experience,
        { id: `exp-${Date.now()}`, title: '', company: '', dates: '', description: '' },
      ],
    }));
    setSaved(false);
  };

  const updateExperience = (id, field, value) => {
    setForm((current) => ({
      ...current,
      experience: current.experience.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
    setSaved(false);
  };

  const removeExperience = (id) => {
    setForm((current) => ({
      ...current,
      experience: current.experience.filter((item) => item.id !== id),
    }));
    setSaved(false);
  };

  const addEducation = () => {
    setForm((current) => ({
      ...current,
      education: [
        ...current.education,
        { id: `edu-${Date.now()}`, school: '', field: '', dates: '' },
      ],
    }));
    setSaved(false);
  };

  const updateEducation = (id, field, value) => {
    setForm((current) => ({
      ...current,
      education: current.education.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
    setSaved(false);
  };

  const removeEducation = (id) => {
    setForm((current) => ({
      ...current,
      education: current.education.filter((item) => item.id !== id),
    }));
    setSaved(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFormError('');
    setFieldErrors({});
    setSaved(false);
    const nextErrors = validateSeekerProfileForm(form);
    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      setFormError('Fix the highlighted fields before saving.');
      setSaving(false);
      return;
    }
    try {
      await updateProfile(form);
      setSaved(true);
    } catch (err) {
      setFormError(formatApiError(err, 'Unable to save profile.'));
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const fileError = validateResumeFile(file);
    if (fileError) {
      setResumeError(fileError);
      return;
    }
    setResumeError('');
    setResumeNotice('');
    setUploadingResume(true);
    try {
      const uploaded = await uploadResumeToStorage({
        accessToken: token,
        userId: user.id,
        file,
      });
      const registered = await registerResume(token, {
        path: uploaded.path,
        original_name: uploaded.originalName,
        size_bytes: uploaded.sizeBytes,
        content_type: 'application/pdf',
      });
      await updateAuthProfile(token, { default_resume_path: registered.resume.storage_path });
      await refreshDashboard();
      setResumeNotice('Resume uploaded and set as your default.');
    } catch (err) {
      setResumeError(formatApiError(err, 'Resume upload failed.'));
    } finally {
      setUploadingResume(false);
    }
  };

  return (
    <>
      <DashboardTopBanner
        eyebrow="IT Jobs Jobline Dashboard"
        title="My Profile"
        subtitle="Tell us a bit about yourself so employers can get to know you."
      />
      <ProfileCompletenessBar percent={profileCompleteness} />

      <Card hover={false} className="p-6 md:p-8">
        <h2 className="text-lg font-bold text-brand-white">Personal Details</h2>
        <p className="mt-1 text-sm text-brand-muted">
          Fill in the basics below. You can always come back and update this later.
        </p>

        <form onSubmit={handleSave} className="mt-6 space-y-5">
          <Input
            id="profile-name"
            name="fullName"
            label="Full Name"
            icon={User}
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={updateField('fullName')}
            error={fieldErrors.fullName}
          />
          <Input
            id="profile-email"
            name="email"
            type="email"
            label="Email Address"
            icon={Mail}
            placeholder="Enter your email address"
            value={form.email}
            onChange={updateField('email')}
            disabled
          />
          <Input
            id="profile-phone"
            name="phone"
            type="tel"
            label="Phone Number"
            icon={Phone}
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={updateField('phone')}
            error={fieldErrors.phone}
          />
          <Input
            id="profile-location"
            name="location"
            label="City / Location"
            icon={MapPin}
            placeholder="e.g., Toronto, ON"
            value={form.location}
            onChange={updateField('location')}
            error={fieldErrors.location}
          />

          <div>
            <label htmlFor="profile-skills" className="mb-1.5 block text-sm font-semibold text-brand-white">
              Skills
            </label>
            <p className="mb-2 text-xs text-brand-muted">
              Add a few skills that describe what you&apos;re good at — press Enter after each one.
            </p>
            <div className="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-brand-bg px-3 py-2">
              {form.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-2.5 py-1 text-xs font-medium text-brand-accent"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="rounded-full hover:text-brand-white"
                    aria-label={`Remove ${skill}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                id="profile-skills"
                type="text"
                value={skillInput}
                onChange={(event) => setSkillInput(event.target.value)}
                onKeyDown={addSkill}
                placeholder="Type a skill and press Enter"
                className="min-w-[10rem] flex-1 bg-transparent text-sm text-brand-white outline-none placeholder:text-brand-muted"
              />
            </div>
          </div>

          <fieldset className="space-y-4 rounded-xl border border-white/10 p-4">
            <legend className="px-1 text-sm font-semibold text-brand-white">
              Work Experience <span className="font-normal text-brand-muted">(Optional)</span>
            </legend>
            {form.experience.map((entry) => (
              <div key={entry.id} className="space-y-3 rounded-lg border border-white/5 bg-brand-bg/50 p-4">
                <Input
                  id={`exp-title-${entry.id}`}
                  label="What was your job title?"
                  placeholder="e.g., Sales Associate"
                  value={entry.title}
                  onChange={(event) => updateExperience(entry.id, 'title', event.target.value)}
                />
                <Input
                  id={`exp-company-${entry.id}`}
                  label="Where did you work?"
                  placeholder="Company name"
                  value={entry.company}
                  onChange={(event) => updateExperience(entry.id, 'company', event.target.value)}
                />
                <Input
                  id={`exp-dates-${entry.id}`}
                  label="When did you work there?"
                  placeholder="e.g., 2022 – 2024"
                  value={entry.dates}
                  onChange={(event) => updateExperience(entry.id, 'dates', event.target.value)}
                />
                <Input
                  id={`exp-desc-${entry.id}`}
                  label="Short description"
                  placeholder="One line about what you did"
                  value={entry.description}
                  onChange={(event) => updateExperience(entry.id, 'description', event.target.value)}
                />
                <Button type="button" variant="outline" className="px-3 py-2 text-xs" onClick={() => removeExperience(entry.id)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addExperience}>
              Add Work Experience
            </Button>
          </fieldset>

          <fieldset className="space-y-4 rounded-xl border border-white/10 p-4">
            <legend className="px-1 text-sm font-semibold text-brand-white">
              Education <span className="font-normal text-brand-muted">(Optional)</span>
            </legend>
            {form.education.map((entry) => (
              <div key={entry.id} className="space-y-3 rounded-lg border border-white/5 bg-brand-bg/50 p-4">
                <Input
                  id={`edu-school-${entry.id}`}
                  label="School or institution"
                  placeholder="e.g., Toronto Community College"
                  value={entry.school}
                  onChange={(event) => updateEducation(entry.id, 'school', event.target.value)}
                />
                <Input
                  id={`edu-field-${entry.id}`}
                  label="What did you study?"
                  placeholder="e.g., Business Administration"
                  value={entry.field}
                  onChange={(event) => updateEducation(entry.id, 'field', event.target.value)}
                />
                <Input
                  id={`edu-dates-${entry.id}`}
                  label="When did you attend?"
                  placeholder="e.g., 2020 – 2022"
                  value={entry.dates}
                  onChange={(event) => updateEducation(entry.id, 'dates', event.target.value)}
                />
                <Button type="button" variant="outline" className="px-3 py-2 text-xs" onClick={() => removeEducation(entry.id)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addEducation}>
              Add Education
            </Button>
          </fieldset>

          <fieldset id="profile-resume" className="space-y-3 rounded-xl border border-white/10 p-4">
            <legend className="px-1 text-sm font-semibold text-brand-white">Resume (PDF)</legend>
            <p className="text-xs text-brand-muted">
              Applications require a registered PDF resume. Upload to your account, then apply from a job page.
            </p>
            {resumes?.length ? (
              <ul className="space-y-1 text-sm text-brand-white">
                {resumes.map((item) => (
                  <li key={item.id}>
                    {item.original_name} {item.storage_path === profile.defaultResumePath ? '(default)' : ''}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-brand-muted">No resume uploaded yet.</p>
            )}
            <input
              type="file"
              accept="application/pdf"
              onChange={handleResumeUpload}
              disabled={uploadingResume}
              className="w-full rounded-lg border border-white/10 bg-brand-bg px-3 py-2 text-sm text-brand-muted file:mr-4 file:rounded-md file:border-0 file:bg-brand-accent/20 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-brand-accent"
            />
            {uploadingResume ? <p className="text-sm text-brand-muted">Uploading resume...</p> : null}
            <InlineNotice tone="error">{resumeError}</InlineNotice>
            <InlineNotice tone="success">{resumeNotice}</InlineNotice>
          </fieldset>

          <InlineNotice tone="error">{formError || error}</InlineNotice>
          {saved || notice ? (
            <p className="text-sm font-medium text-status-success">{notice || 'Your changes have been saved.'}</p>
          ) : null}

          <Button type="submit" variant="gradient" className="w-full sm:w-auto" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </Card>
    </>
  );
}
