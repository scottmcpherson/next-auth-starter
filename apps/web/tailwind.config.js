const { violet, blackA, mauve, green } = require('@radix-ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './common/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tablechat/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'theme-gray': {
          50: '#e9e9e9',
          100: '#d3d3d4',
          200: '#bdbdbe',
          300: '#a7a7a9',
          400: '#919193',
          500: '#7a7b7d',
          600: '#646568',
          700: '#4e4f52',
          800: '#38393d',
          900: '#222327',
          950: '#131314',
        },
        ...mauve,
        ...violet,
        ...green,
        ...blackA,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
