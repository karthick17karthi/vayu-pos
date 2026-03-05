/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        accent: '#14b8a6',
        darkbg: '#0f2027',
        lightbg: '#f1f5f9',
        secondary: '#1F2937',
      },
      transitionProperty: {
        theme: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      },
      transitionDuration: {
        theme: '300ms',
      },
      transitionTimingFunction: {
        theme: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
