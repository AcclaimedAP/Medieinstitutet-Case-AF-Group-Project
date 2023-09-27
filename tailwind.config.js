/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        accent: '#14b8a6',
        white: '#fafafa',
        whiteDark: '#F1F1F1',
      },

      fontSize: {
        h1: '2rem',
        h2: '1.5rem',
        h3: '1.25rem',
        h4: '1.125rem',
      },

      backgroundImage: {
        desktopBackground: "url('/desktopImage.jpg')",
      },

      leftAligned: {
        left: '0',
        transform: 'translateX(0)',
      },

      spacing: {
        100: '100px',
        260: '260px',
        300: '300px',
        500: '500px',
        600: '600px',
      },

      minHeight: {
        custom: 'calc(100vh - 80px)',
      },
    },

    screens: {
      tablet: '640px',
      laptop: '1280px',
    },
  },

  plugins: [],
};
