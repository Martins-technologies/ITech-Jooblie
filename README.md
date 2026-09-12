# iTech Jobline

iTech Jobline is a Canadian IT job board frontend built with React. Home, Post a Job, Employers, Contact Us, Browse Jobs, About Us, and Sign In are fully designed. Remaining routes render placeholder pages until those modules are built.

## Tech stack

The project is built with these tools.

1. React 18
2. Vite
3. React Router v6
4. Tailwind CSS
5. lucide react

## Prerequisites

You need Node.js 18 or later (LTS recommended) and npm or yarn.

## Setup instructions

```bash
git clone <repo-url>
cd itech-jobline
npm install
npm run dev
```

The app starts at http://localhost:5173.

## Available scripts

1. npm run dev
   Starts the Vite development server.

2. npm run build
   Creates a production build.

3. npm run preview
   Previews the production build locally.

4. npm run lint
   Runs ESLint.

## Folder structure

```
src/
  assets/          Static images and SVGs
  components/      Reusable UI for layout, common, home, jobs, contact, about, and post-job sections
  data/            Nav links, jobs, testimonials, image paths, and other content
  hooks/           Form and job-search hooks
  pages/           Route level page components
  routes/          Central React Router table
  App.jsx          Root app shell
  main.jsx         BrowserRouter and React mount
  index.css        Tailwind layers and global styles
```

Brand files in public/

```
public/
  logo.png         Optional brand PNG
  img1.jfif        Homepage hero image
  img2.jfif        Post a Job hero image
  img3.jfif        Employers hero image
  img4.jfif        Contact Us hero image
  img5.jfif        Contact help image
  img6.jfif        Contact connect image
  img7.jfif        Contact office image
  img8.jfif        Browse Jobs hero image
  img9.jfif        About Us hero image
  img10.jfif       About Us mission / vision image
  img11.jfif       About Us team commitment image
```

## How to add a new page

1. Create a component in src/pages/ (for example PricingPage.jsx).
2. Register the route in src/routes/AppRoutes.jsx.
3. If it belongs in the navbar or footer, add it to src/data/navLinks.js or src/data/footerLinks.js.
4. Nested routes (for example /jobs/:jobId or /post-job/create) are registered in AppRoutes.jsx only. Do not add them to the navbar unless they should appear in the main menu. Nested paths stay active on the parent nav link because NavLink matches the prefix unless end is set (Home uses end so only / is active).

## Roadmap

Completed modules

1. Home (/)
2. Post a Job (/post-job) — Module 4: hero form, how posting works, pricing plans, employer testimonials, and FAQ
3. Employers (/employers)
4. Contact Us (/contact)
5. Browse Jobs (/jobs)
6. About Us (/about)
7. Sign In (/sign-in) — mock auth accepts any username/password; Job Seeker / Employer role toggle redirects to the appropriate dashboard
8. Job Seeker Dashboard (/dashboard/*) — authenticated workspace with overview, find jobs, applications, saved jobs, profile, and settings
9. Employer Dashboard (/employer-dashboard/*) — authenticated employer workspace with job postings, applicants, company profile, and settings

## Job Seeker Dashboard

The job seeker dashboard is a private route group at `/dashboard/*`, separate from the public marketing layout (no public navbar or footer). It is gated by `RequireAuth`: logged-out users are redirected to `/sign-in`, and employer/recruiter accounts are redirected to `/recruiter`.

| Route | Page |
|-------|------|
| `/dashboard/overview` | Overview with stats, profile completeness, and recommended jobs |
| `/dashboard/find-jobs` | Browse Jobs components reused with apply/save wired to dashboard state |
| `/dashboard/applications` | Application tracking with status badges and withdraw |
| `/dashboard/saved-jobs` | Bookmarked jobs with remove and apply actions |
| `/dashboard/profile` | Simplified personal details form (no resume upload, no headline field; email shown prominently under full name) |
| `/dashboard/settings` | Account and notification preferences only (no delete account action) |

State is managed by `DashboardDataContext` (`src/context/DashboardDataContext.jsx`) with seeded mock data for applications, saved jobs, and profile. Actions (`applyToJob`, `toggleSaveJob`, `withdrawApplication`, `updateProfile`) are structured for a future API swap.

## Employer Dashboard

The employer dashboard is a private route group at `/employer-dashboard/*`, using the same `DashboardLayout` shell as the job seeker dashboard with employer-specific sidebar navigation. It is gated by `RequireAuth role="employer"`: logged-out users redirect to `/sign-in`, and job seeker accounts redirect to `/dashboard/overview`.

| Route | Page |
|-------|------|
| `/employer-dashboard/overview` | Overview with hiring stats, recent applicants, and active postings |
| `/employer-dashboard/job-postings` | List/manage all postings with filter, search, edit, close, and delete |
| `/employer-dashboard/post-a-job` | Create or edit a posting via the shared `JobPostingForm` |
| `/employer-dashboard/job-postings/:jobId/applicants` | Applicants for a single posting |
| `/employer-dashboard/applicants` | All applicants across postings, filterable by posting, stage, and name |
| `/employer-dashboard/company-profile` | Company info form persisted to context |
| `/employer-dashboard/settings` | Account, notifications, sign out, and delete company account |

State is managed by `EmployerDataContext` (`src/context/EmployerDataContext.jsx`) with seeded mock data for job postings, applicants, and company profile. All actions (`createJobPosting`, `advanceApplicantStage`, `updateCompanyProfile`, etc.) are structured for a future API swap.

**Pipeline stage mapping** (for future backend integration):

| Job Seeker (applicant-facing) | Employer (recruiter-facing) |
|-------------------------------|----------------------------|
| Applied | New |
| In Review | Reviewed / Shortlisted |
| Interview | Interview |
| Offer | Offer |
| Not Selected | Rejected |

Defined in `src/data/pipelineStages.js`.

Still to come

1. Job details enhancements and full application flow
2. Backend persistence for dashboard actions (applications, saved jobs, profile)
3. Real API integration for remaining marketing forms

Canonical logo and footer: Logo.jsx renders public/logo.png in the navbar, footer, and sign-in panel. Footer.jsx is a shared 4-column layout (brand, Quick Links, For Employers, Contact Info) plus a copyright / legal bar on every page.

## Mock data

Browse Jobs filters a static list in src/data/mockJobs.js through useJobFilters and useJobSearch. Those hooks isolate client-side filtering, sorting, and query-param search so a later API swap is a one-line change in the hook. Related content files include src/data/quickSearches.js, src/data/heroStats.js, src/data/jobCategories.js, src/data/hiringTrends.js, src/data/whyUseFeatures.js, and src/data/footerLinks.js. The results header still shows a simulated 312-job market count until live data exists.

## Environment variables

None required yet. These will be added when backend and API integration begins.

## Notes on assets

Homepage hero uses public/img1.jfif (also used on the Sign In left panel). Post a Job hero uses public/img2.jfif. Employers hero uses public/img3.jfif. Contact Us uses public/img4.jfif through img7.jfif. Browse Jobs hero uses public/img8.jfif. About Us uses public/img9.jfif (hero), img10.jfif (mission), and img11.jfif (team). Paths are stored in src/data/images.js so swapping a file later is a one line change.

The navbar and footer use public/logo.png through src/components/layout/Logo.jsx.

Testimonial and resource images still use temporary Unsplash URLs in src/data/images.js.

Brand colors are defined once in tailwind.config.js under theme.extend.colors.brand (bg, accent, card, border, muted), plus accent.orange and status tokens used on Browse Jobs. Do not scatter hex values across components.

## License

Private / Unlicensed
