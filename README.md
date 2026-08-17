# iTech Jobline

iTech Jobline is a Canadian IT job board frontend built with React. This is the first module of a multi page app. The Home page is fully designed. Remaining routes render placeholder pages until those modules are built.

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
  components/      Reusable UI for layout, common, and home sections
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
  logo.png         Navbar and footer logo
  img1.jfif        Homepage hero image
```

## How to add a new page

1. Create a component in src/pages/ (for example PricingPage.jsx).
2. Register the route in src/routes/AppRoutes.jsx.
3. If it belongs in the navbar or footer, add it to src/data/navLinks.js. Footer Quick Links reuse this same list.

Placeholder pages already exist for Browse Jobs, Employers, About Us, Contact Us, Sign In, and Post a Job so navigation never 404s while those modules are built.

## Environment variables

None required yet. These will be added when backend and API integration begins.

## Notes on assets

Homepage hero uses public/img1.jfif. The navbar and footer logo uses public/logo.png. Both paths are stored in src/data/images.js so swapping a file later is a one line change.

Testimonial and resource images still use temporary Unsplash URLs in src/data/images.js.

Brand colors are defined once in tailwind.config.js under theme.extend.colors.brand (bg, accent, card, border, muted). Do not scatter hex values across components.

## License

Private / Unlicensed
