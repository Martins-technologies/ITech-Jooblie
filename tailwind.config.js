/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0a1128',
          bgAlt: '#080f22',
          card: '#0d1633',
          cardHover: '#111c3d',
          accent: '#2f8fff',
          accentHover: '#3b9dff',
          border: '#1e3a8a',
          muted: '#94a3b8',
          white: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(47, 143, 255, 0.25)',
      },
      backgroundImage: {
        'dot-grid':
          'radial-gradient(circle, rgba(47, 143, 255, 0.18) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
