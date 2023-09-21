/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: '#00005A',
        accent: '#95C23E',
        white: '#fafafa',
      },

      fontSize: {
        'h1': '2rem',
        'h2': '1.5rem',
        'h3': '1.25rem',
        'h4': '1.125rem'
      },

      backgroundImage: {
        'desktopBackground': "url('/desktopImage.jpg')",
      },

      leftAligned: {
        left: '0',
        transform: 'translateX(0)',
      },

      spacing: {
        '100': '100px',
        '250': '250px',
        '300': '300px',
        '500': '500px',
        '600': '600px',
      },
    },

    screens: {
      tablet: '640px',
      laptop: '1024px',
    },
  },

  plugins: [],
};
