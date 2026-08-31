import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import JobPostingForm from '../../components/employerDashboard/JobPostingForm.jsx';
import Card from '../../components/common/Card.jsx';
import useJobPostingForm from '../../hooks/useJobPostingForm.js';
import { useEmployerData } from '../../context/EmployerDataContext.jsx';

export default function PostJobDashboardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const { getJobPosting, createJobPosting, updateJobPosting, companyProfile } = useEmployerData();

  const existingPosting = editId ? getJobPosting(editId) : null;
  const isEditing = Boolean(existingPosting);

  const { values, errors, update, setFormValues, handleSubmit, handleSaveDraft } = useJobPostingForm({
    initialValues: existingPosting || { company: companyProfile.name },
    onSubmit: (formValues) => {
      if (isEditing) {
        updateJobPosting(editId, { ...formValues, status: 'Active' });
      } else {
        createJobPosting(formValues, 'Active');
      }
      navigate('/employer-dashboard/job-postings', {
        state: {
          message: isEditing
            ? 'Job posting updated successfully.'
            : 'Job posting published successfully.',
        },
      });
    },
    onSaveDraft: (formValues) => {
      if (isEditing) {
        updateJobPosting(editId, { ...formValues, status: 'Draft' });
      } else {
        createJobPosting(formValues, 'Draft');
      }
      navigate('/employer-dashboard/job-postings', {
        state: { message: 'Draft saved successfully.' },
      });
    },
  });

  useEffect(() => {
    if (existingPosting) {
      setFormValues(existingPosting);
    } else if (companyProfile.name) {
      setFormValues({ company: companyProfile.name });
    }
  }, [existingPosting, companyProfile.name, setFormValues]);

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title={isEditing ? 'Edit Job Posting' : 'Post a New Job'}
        subtitle={
          isEditing
            ? 'Update your job posting details below.'
            : 'Fill in the details to publish a new job posting.'
        }
      />

      <Card hover={false} className="p-6 md:p-8">
        <JobPostingForm
          values={values}
          errors={errors}
          update={update}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
          heading={isEditing ? 'Edit Job Posting' : 'Post a New Job'}
          showCard={false}
        />
      </Card>
    </>
  );
}
