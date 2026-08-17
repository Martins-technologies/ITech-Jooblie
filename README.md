# iTech Jobline

iTech Jobline is a Canadian IT job board frontend built with React. The Home page and Post a Job landing page are fully designed. Remaining routes render placeholder pages until those modules are built.

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
  components/      Reusable UI for layout, common, home, and post-job sections
  data/            Nav links, jobs, testimonials, image paths, and other content
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
```

## How to add a new page

1. Create a component in src/pages/ (for example PricingPage.jsx).
2. Register the route in src/routes/AppRoutes.jsx.
3. If it belongs in the navbar or footer, add it to src/data/navLinks.js. Footer Quick Links reuse this same list.
4. Nested routes (for example /post-job/create) are registered in AppRoutes.jsx only. Do not add them to the navbar unless they should appear in the main menu. Nested paths stay active on the parent nav link because NavLink matches the prefix unless end is set (Home uses end so only / is active).

Completed pages: Home (/) and Post a Job (/post-job). Create Job Post (/post-job/create) is a placeholder reached from Post a Job CTAs.

## Environment variables

None required yet. These will be added when backend and API integration begins.

## Notes on assets

Homepage hero uses public/img1.jfif. Post a Job hero uses public/img2.jfif. Paths are stored in src/data/images.js so swapping a file later is a one line change.

The navbar and footer use the two-line iTech Jobline lockup in src/components/layout/Logo.jsx.

Testimonial and resource images still use temporary Unsplash URLs in src/data/images.js.

Brand colors are defined once in tailwind.config.js under theme.extend.colors.brand (bg, accent, card, border, muted). Do not scatter hex values across components.

## License

Private / Unlicensed
