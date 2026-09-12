import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner.jsx';
import JobPostingForm from '../../components/employerDashboard/JobPostingForm.jsx';
import Card from '../../components/common/Card.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import InlineNotice from '../../components/common/InlineNotice.jsx';
import useJobPostingForm from '../../hooks/useJobPostingForm.js';
import { useEmployerData } from '../../context/EmployerDataContext.jsx';

export default function PostJobDashboardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const {
    getJobPosting,
    createJobPosting,
    updateJobPosting,
    companyProfile,
    categories,
    loading,
    error,
  } = useEmployerData();

  const existingPosting = editId ? getJobPosting(editId) : null;
  const isEditing = Boolean(existingPosting);

  const { values, errors, formError, submitting, update, setFormValues, handleSubmit } =
    useJobPostingForm({
      initialValues: existingPosting
        ? {
            ...existingPosting,
            categoryId: String(existingPosting.categoryId || ''),
            company: companyProfile.name,
          }
        : { company: companyProfile.name },
      onSubmit: async (formValues) => {
        if (isEditing) {
          await updateJobPosting(editId, formValues);
        } else {
          await createJobPosting(formValues);
        }
        navigate('/employer-dashboard/job-postings', {
          state: {
            message: isEditing
              ? 'Job posting updated successfully.'
              : 'Job posting published successfully.',
          },
        });
      },
    });

  useEffect(() => {
    if (existingPosting) {
      setFormValues({
        ...existingPosting,
        categoryId: String(existingPosting.categoryId || ''),
        company: companyProfile.name,
      });
    } else if (companyProfile.name) {
      setFormValues({ company: companyProfile.name });
    }
  }, [existingPosting, companyProfile.name, setFormValues]);

  if (loading) {
    return <LoadingSpinner className="min-h-[40vh]" label="Loading job form..." />;
  }

  return (
    <>
      <DashboardTopBanner
        eyebrow="IT Jobs Jobline Dashboard"
        title={isEditing ? 'Edit Job Posting' : 'Post a New Job'}
        subtitle={
          isEditing
            ? 'Update your job posting details below.'
            : 'Fill in the details to publish a new job posting.'
        }
      />
      <InlineNotice tone="error" className="mb-6">
        {error}
      </InlineNotice>

      <Card hover={false} className="p-6 md:p-8">
        <JobPostingForm
          values={values}
          errors={errors}
          update={update}
          onSubmit={handleSubmit}
          heading={isEditing ? 'Edit Job Posting' : 'Post a New Job'}
          showCard={false}
          categoryOptions={categories}
          formError={formError}
          submitting={submitting}
        />
      </Card>
    </>
  );
}
