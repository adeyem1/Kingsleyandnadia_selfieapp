/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mobile-bg': "url('/images/home.jpg')", // Use absolute path from the public directory
        'desktop-bg': "url('/images/home1.jpg')", // Same here
      },
    },
  },
  plugins: [],
};
