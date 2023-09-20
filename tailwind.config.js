/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: '#00005A',
        accent: '#95C23E',
      },
    },

    screens: {
      tablet: '640px',
      laptop: '1024px',
    },
  },

  plugins: [],
};
