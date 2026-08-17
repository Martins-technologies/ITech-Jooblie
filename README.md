# iTech Jobline

iTech Jobline is a Canadian IT job board frontend built with React. Home, Post a Job, Employers, Contact Us, and Browse Jobs are fully designed. Remaining routes render placeholder pages until those modules are built.

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
  components/      Reusable UI for layout, common, home, jobs, contact, and post-job sections
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
```

## How to add a new page

1. Create a component in src/pages/ (for example PricingPage.jsx).
2. Register the route in src/routes/AppRoutes.jsx.
3. If it belongs in the navbar or footer, add it to src/data/navLinks.js or src/data/footerLinks.js.
4. Nested routes (for example /jobs/:jobId or /post-job/create) are registered in AppRoutes.jsx only. Do not add them to the navbar unless they should appear in the main menu. Nested paths stay active on the parent nav link because NavLink matches the prefix unless end is set (Home uses end so only / is active).

## Roadmap

Completed modules

1. Home (/)
2. Post a Job (/post-job)
3. Employers (/employers)
4. Contact Us (/contact)
5. Browse Jobs (/jobs)

Still to come

1. Job details (/jobs/:jobId currently shows a placeholder)
2. About Us
3. Sign In / authentication
4. Create Job Post form
5. Real API integration

## Mock data

Browse Jobs filters a static list in src/data/mockJobs.js through useJobFilters and useJobSearch. Those hooks isolate client-side filtering, sorting, and query-param search so a later API swap is a one-line change in the hook. Related content files include src/data/quickSearches.js, src/data/heroStats.js, src/data/jobCategories.js, src/data/hiringTrends.js, src/data/whyUseFeatures.js, and src/data/footerLinks.js. The results header still shows a simulated 312-job market count until live data exists.

## Environment variables

None required yet. These will be added when backend and API integration begins.

## Notes on assets

Homepage hero uses public/img1.jfif. Post a Job hero uses public/img2.jfif. Employers hero uses public/img3.jfif. Contact Us uses public/img4.jfif through img7.jfif. Browse Jobs hero uses public/img8.jfif. Paths are stored in src/data/images.js so swapping a file later is a one line change.

The navbar and footer use the brand PNG in src/components/layout/Logo.jsx.

Testimonial and resource images still use temporary Unsplash URLs in src/data/images.js.

Brand colors are defined once in tailwind.config.js under theme.extend.colors.brand (bg, accent, card, border, muted), plus accent.orange and status tokens used on Browse Jobs. Do not scatter hex values across components.

## License

Private / Unlicensed
