/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '120': '13rem',  // Example, assuming 120 means 30rem, adjust as needed
      }
    },
  },
  plugins: [],
}

